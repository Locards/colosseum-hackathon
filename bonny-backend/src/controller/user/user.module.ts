import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProfileModule } from 'src/model/profile/profile.module';
import { SolanaModule } from 'src/service/solana/solana.module';

@Module({
  controllers: [UserController],
  providers: [],
  imports: [
    ProfileModule,
    SolanaModule
  ],
})
export class UserModule {}
