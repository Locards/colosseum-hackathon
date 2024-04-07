import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfileModule } from 'src/model/profile/profile.module';
import { SolanaModule } from 'src/service/solana/solana.module';
import { PdaService } from 'src/service/solana/pda';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PdaService],
  imports: [ProfileModule, SolanaModule],
})
export class AuthModule {}
