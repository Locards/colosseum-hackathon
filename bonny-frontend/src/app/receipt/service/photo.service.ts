// photo.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, GalleryPhotos, GalleryPhoto, PermissionStatus, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem'
import { UploadFileReference } from './uploadfile.dto';
import { Platform } from '@ionic/angular';
import { File, FilePicker, PickFilesResult } from '@capawesome/capacitor-file-picker';

@Injectable({
  providedIn: 'root'
})
export class ReceiptPhotoService {

  public async takeReceiptPhoto() : Promise<UploadFileReference | undefined> {
    try {
      // if (!(await this.hasPermission())) {
      //   return undefined; // better throw exception
      // }
      const photo = await this.takePhoto();
      const file = this.buildFileObject(photo, 0);
      return file;
    } catch (error) {
      console.error('Error taking photo', error);
      return undefined;
    }
  }

  private async takePhoto() : Promise<Photo> {


    return await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
  }


  public async getReceiptPhotosFromGallery(): Promise<PickFilesResult | undefined> {
    try {

      const result = await FilePicker.pickFiles({
        multiple: true,
        types: ['image/png', 'application/pdf', 'image/jpg', 'image/jpeg'],
        readData: true
      })

      return result

     /* const { photos } = await Camera.pickImages({
        quality: 60,
        limit: 5
      })*/


      //return photos.map((photo, index) => this.buildFileObject(photo, index))

    } catch(error) {
      console.log("Error selecting Photos", error);
      return undefined;
    }
  }

  async buildGalleryFileObject(file: File, index: number) : Promise<UploadFileReference> {
    const timestamp = Date.now();
      const uploadFile : UploadFileReference = {
        webPath: await file.blob?.text(),
        filename: `receipt_${timestamp}_${index}.${file.mimeType}`,
      }
      return uploadFile;
  }

  private buildFileObject(photo: Photo | GalleryPhoto, index: number) : UploadFileReference {
    const timestamp = Date.now();
      const uploadFile : UploadFileReference = {
        webPath: photo.webPath,
        filename: `receipt_${timestamp}_${index}.${photo.format}`,
      }
      return uploadFile;
  }

  private async hasPermission(): Promise<boolean> {
    const permissionStatus: PermissionStatus = await Camera.checkPermissions();
    if (permissionStatus.camera != 'granted') {
      const permissionResponse = await Camera.requestPermissions();
      if (permissionResponse.camera != 'granted') {
        return false;
      }
    }
    return true;
  }
}
