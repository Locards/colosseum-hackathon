import { TestBed } from '@angular/core/testing';

import { ReceiptPhotoService } from './photo.service';

describe('ReceiptPhotoService', () => {
  let service: ReceiptPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiptPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
