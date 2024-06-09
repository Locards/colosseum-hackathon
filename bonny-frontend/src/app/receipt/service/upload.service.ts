// upload.service.ts
import { Injectable } from '@angular/core';
import { ref, uploadBytes, UploadResult, UploadMetadata, uploadString } from "firebase/storage";
import { UploadFileReference } from './uploadfile.dto';
import { Storage } from '@angular/fire/storage';
import { FCM } from '@capacitor-community/fcm';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PickFilesResult, PickedFile } from '@capawesome/capacitor-file-picker';


@Injectable({
  providedIn: 'root'
})
export class ReceiptUploadService {

  constructor(private storage: Storage, private plt: Platform, private authentication: AuthenticationService) {}

  public async uploadFile(fileReference: UploadFileReference, additionalMetaData: { [key: string]: string }): Promise<UploadResult> {
    const file = await fetch(fileReference.webPath!);
    const fileBlob = await file.blob();

    //  const currentUserId = this.fireAuth.currentUser?.uid
    const currentUserId = this.authentication.getCurrentUid()
    const storageRef = ref(this.storage, `receipts/${currentUserId}/${fileReference.filename}`);
    const metadata : UploadMetadata= {
      customMetadata: {
        userId: currentUserId!,
        ...additionalMetaData
      }
    }
    if(this.plt.is('capacitor')){
      metadata.customMetadata!['fcmToken'] = (await FCM.getToken()).token;
    }
    return await uploadBytes(storageRef, fileBlob, metadata);
  }

  public async uploadPickerFiles(res: PickFilesResult, additionalMetaData: { [key: string]: string }) {
    await Promise.all(res.files.map(async (file, index) => await this.uploadPickedFile(file, index, additionalMetaData)))
  } 

  public async uploadPickedFile(pickedFile: PickedFile, index: number, additionalMetaData: { [key: string]: string }) {
    console.log(pickedFile);
    const currentUserId = this.authentication.getCurrentUid()
    const storageRef = ref(this.storage, `receipts/${currentUserId}/receipt_${Date.now()}_${index}_${pickedFile.name}`);
    const metadata : UploadMetadata= {
      contentType: pickedFile.mimeType,
      customMetadata: {
        userId: currentUserId!,
        ...additionalMetaData
      }
    }
    if(this.plt.is('capacitor')){
      metadata.customMetadata!['fcmToken'] = (await FCM.getToken()).token;
    }
    return await uploadString(storageRef, pickedFile.data!, "base64", metadata);
  }

  public async uploadFilesBatch(fileReferences: UploadFileReference[], additionalMetaData: { [key: string]: string }) {
    const uploads = fileReferences.map(ref => this.uploadFile(ref, additionalMetaData))
    await Promise.all(uploads)
  }

}