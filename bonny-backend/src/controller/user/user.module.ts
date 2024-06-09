import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProfileModule } from 'src/model/profile/profile.module';
import { SolanaModule } from 'src/service/solana/solana.module';
import { StatsService } from 'src/model/stats/stats.service';
import { StatsModule } from 'src/model/stats/stats.module';

@Module({
  controllers: [UserController],
  providers: [],
  imports: [
    ProfileModule,
    SolanaModule,
    StatsModule,
  ],
})
export class UserModule {}
