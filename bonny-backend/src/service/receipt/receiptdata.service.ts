import { Injectable, OnModuleInit } from '@nestjs/common';
import { Message, PubSub } from '@google-cloud/pubsub';
import { TransactionService } from 'src/model/transaction/transaction.service';
import { Transaction } from 'src/model/transaction/transaction.entity';
import { SolanaService } from '../solana/solana.service';
import { ReceiptData } from './model/receiptData';
import { ReceiptAttributes } from './model/receiptAttributes';
import { ProfileService } from 'src/model/profile/profile.service';
import { Receipt } from 'src/model/receipt/receipt.entity';
import { ReceiptService } from 'src/model/receipt/receipt.service';
import { FirebaseProvider } from 'src/firebase/firebase.provider';
import { CouponService } from 'src/model/coupons/coupons.service';
import { Coupon } from 'src/model/coupons/coupons.entity';
import { StatsService } from 'src/model/stats/stats.service';

@Injectable()
export class ReceiptDataService implements OnModuleInit {
  constructor(
    private txService: TransactionService,
    private receiptService: ReceiptService,
    private profileService: ProfileService,
    private firebaseProvider: FirebaseProvider,
    private couponService: CouponService,
    private solana: SolanaService,
    private stats: StatsService
  ) {}

  onModuleInit() {
    const pubsub = new PubSub({ projectId: 'locards-bonny-test' });
    const subscription = pubsub.subscription(
      'projects/locards-bonny-test/subscriptions/bonny-backend',
    );
    subscription.on('message', (message) => this.readReceipts(message));
  }

  private async readReceipts(message: Message) {
    const data: ReceiptData = JSON.parse(message.data.toString());
    const attributes: ReceiptAttributes =
      message.attributes as unknown as ReceiptAttributes;

    if (data.status == 'failed') {
      this.sendMobileNotification(
        attributes,
        'Image Processing Failed',
        'Please try again.',
      );
      message.ack();
      return;
    }

    try {
      const date = data.entities.filter(
        (entity) => entity.type == 'receipt_date',
      );
      const supplier = data.entities.filter(
        (entity) => entity.type == 'supplier_name',
      );
      if (!supplier) {
        throw new Error('Could not extract supplier from image.');
      }
      let totalAmount = data.entities.filter(
        (entity) => entity.type == 'total_amount',
      );
      const netAmount = data.entities.filter(
        (entity) => entity.type == 'net_amount',
      );

      if (totalAmount[0] == undefined) totalAmount = netAmount;

      const parsed = {
        receiptDate: this.getValidDateOrToday(date),
        supplierName: supplier[0]?.normalizedValue
          ? supplier[0].normalizedValue.text
          : supplier[0].mentionText,
        totalAmount: Number(
          totalAmount[0]?.normalizedValue
            ? totalAmount[0].normalizedValue.text
            : totalAmount[0].mentionText,
        ),
      };

      let tokenAmount;
      const cid = Number(attributes.couponKey);
      if (Number.isNaN(cid) || cid == 0) {
        tokenAmount = await this.calculateTokenAmount(parsed.totalAmount);
      } else {
        const coupon = await this.couponService.get(cid);
        tokenAmount = await this.calculateTokenAmount(
          parsed.totalAmount,
          coupon,
        );
        await this.couponService.redeemCoupon(data.userId, coupon);
      }

      console.log(data);

      const profile = await this.profileService.get(attributes.userId);

      const txid = await this.solana.increasePointsForUser(
        data.userId,
        tokenAmount,
        attributes.md5hash,
        'receipt_upload',
      );

      const transaction: Transaction = {
        id: 0,
        type: cid ? 'coupon' : 'receipt_upload',
        status: 'confirmed',
        tokens: tokenAmount,
        blockchainTxId: txid,
        receipt: null,
        questStatus: null,
        profile: profile,
        timestamp: new Date(),
      };

      const tx = await this.txService.add(transaction);

      const receipt: Receipt = {
        id: 0,
        storageUrl: attributes.filePath,
        supplierName: parsed.supplierName,
        totalAmount: parsed.totalAmount,
        receiptDate: parsed.receiptDate,
        hash: attributes.md5hash,
        transactions: tx,
      };

      await this.receiptService.add(receipt);

      await this.profileService.update(profile.id, {
        tokens: profile.tokens + tokenAmount,
      });


      await this.stats.addReceipt(tokenAmount)

      // see also https://firebase.google.com/docs/cloud-messaging/send-message
      // and https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.messaging?hl=de
      this.sendMobileNotification(
        attributes,
        'Image Processing Successful',
        'You gained ' + tokenAmount + ' token!',
      );

      message.ack();
    } catch (e) {
      this.sendMobileNotification(
        attributes,
        'Image Processing Failed',
        'Please try again.',
      );
      console.log(e);
      message.ack();
    }
  }

  private sendMobileNotification(
    attributes: ReceiptAttributes,
    title: string,
    body: string,
  ) {
    if (attributes.fcmToken) {
      this.firebaseProvider
        .getFirebase()
        .messaging()
        .send({
          token: attributes.fcmToken,
          data: {
            hash: attributes.md5hash || '',
          },
          notification: {
            title: title,
            body: body,
          },
        })
        .then((response) => {
          // Response is a message ID string.
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
    }
  }

  async calculateTokenAmount(netAmount: number, coupon?: Coupon) {
    let tokens = Math.floor(netAmount * 100) * 0.0005;
    if (coupon) tokens *= coupon.multiplier;
    return tokens;
  }

  private getValidDateOrToday(extractedDate: any | undefined): Date {
    if (!extractedDate || extractedDate.length === 0) {
      return new Date();
    } else {
      return extractedDate[0]?.normalizedValue
        ? new Date(extractedDate[0].normalizedValue.text)
        : new Date(extractedDate[0].mentionText)
    }
  }
}
