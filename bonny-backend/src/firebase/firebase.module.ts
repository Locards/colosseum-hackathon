import { Module } from '@nestjs/common';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { FirebaseProvider } from './firebase.provider';

@Module({
  providers: [FirebaseAuthStrategy, FirebaseProvider],
  exports: [FirebaseProvider],
})
export class FirebaseModule {}
