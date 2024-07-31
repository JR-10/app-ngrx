import { TestBed } from '@angular/core/testing';

import { PhotosAdapterService } from './photos-adapter.service';

describe('PhotosAdapterService', () => {
  let service: PhotosAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotosAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
