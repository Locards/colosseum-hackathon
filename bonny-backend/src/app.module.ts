import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './model/profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliateModule } from './model/affiliate/affiliate.module';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './controller/home/home.module';
import { typeOrmAsyncConfig } from './config/typeorm-config';
import { CouponModule } from './model/coupons/coupons.module';
import { MarketplaceModule } from './controller/marketplace/marketplace.module';
import { SolanaModule } from './service/solana/solana.module';
import { ReceiptDataModule } from './service/receipt/receiptdata.module';
import { AdminModule } from './controller/admin/admin.module';
import { ReclaimModule } from './controller/reclaim/reclaim.module';
import { AuthModule } from './controller/auth/auth.module';
import { UserModule } from './controller/user/user.module';
import { FirebaseModule } from './firebase/firebase.module';
import { StatisticsModule } from './controller/stats/statistics.module';
import { StatsModule } from './model/stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ProfileModule,
    AffiliateModule,
    CouponModule,
    HomeModule,
    MarketplaceModule,
    // SolanaModule,
    ReceiptDataModule,
    AdminModule,
    ReclaimModule,
    AuthModule,
    UserModule,
    FirebaseModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
