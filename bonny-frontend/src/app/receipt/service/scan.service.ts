import { Injectable } from '@angular/core';
import { ReceiptPhotoService } from './photo.service';
import { ReceiptUploadService } from './upload.service';
import { ToastController } from '@ionic/angular';
import { Haptics } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  constructor(
    private photoService: ReceiptPhotoService,
    private uploadService: ReceiptUploadService,
    private toastCtrl: ToastController
    ) { }

  async scanReceipt(couponId?: number) {

    const file = await this.photoService.takeReceiptPhoto();
    if (!file) return false;

    const result = await this.uploadService.uploadFile(file, couponId ? {couponKey: String(couponId)} : {});

    return true
  }

}
