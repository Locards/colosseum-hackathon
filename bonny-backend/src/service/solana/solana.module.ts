import { Module } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { PdaService } from './pda';
import { SolanaController } from './solana.controller';

@Module({
  controllers: [SolanaController],
  providers: [SolanaService, PdaService],
  imports: [],
  exports: [SolanaService],
})
export class SolanaModule {}
