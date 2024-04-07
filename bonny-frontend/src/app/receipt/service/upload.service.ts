// upload.service.ts
import { Injectable } from '@angular/core';
import { ref, uploadBytes, UploadResult, UploadMetadata, getMetadata } from "firebase/storage";
import { UploadFileReference } from './uploadfile.dto';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { FCM } from '@capacitor-community/fcm';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ReceiptUploadService {

  constructor(private fireAuth: Auth, private storage: Storage, private plt: Platform, private authentication: AuthenticationService) {}

  public async uploadFile(fileReference: UploadFileReference): Promise<UploadResult> {
    const file = await fetch(fileReference.webPath!);
    const fileBlob = await file.blob();

    //  const currentUserId = this.fireAuth.currentUser?.uid
    const currentUserId = this.authentication.getCurrentUid()
    const storageRef = ref(this.storage, `receipts/${currentUserId}/${fileReference.filename}`);
    const metadata : UploadMetadata= {
      customMetadata: {
        userId: currentUserId!,
      }
    }
    if(this.plt.is('capacitor')){
      metadata.customMetadata!['fcmToken'] = (await FCM.getToken()).token;
    }
    return await uploadBytes(storageRef, fileBlob, metadata);
  }

  public async uploadFilesBatch(fileReferences: UploadFileReference[]) {
    const uploads = fileReferences.map(ref => this.uploadFile(ref))
    await Promise.all(uploads)
  }


  public uploadFileFromSystem() {

  }

}