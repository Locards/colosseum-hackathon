import { Injectable } from '@angular/core';
import { ReceiptPhotoService } from './photo.service';
import { ReceiptUploadService } from './upload.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private photoService: ReceiptPhotoService,
    private uploadService: ReceiptUploadService,
    private toastCtrl: ToastController
  ) { }

  async selectGalleryReceipts() {
    const files = await this.photoService.getReceiptPhotosFromGallery()
    console.log(files)

    if(!files) return false;

    await this.uploadService.uploadPickerFiles(files, {})

    return true;
  }

}
