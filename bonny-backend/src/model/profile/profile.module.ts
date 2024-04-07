import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';

@Module({
  providers: [ProfileService],
  imports: [TypeOrmModule.forFeature([Profile])],
  exports: [ProfileService]
})
export class ProfileModule {}
