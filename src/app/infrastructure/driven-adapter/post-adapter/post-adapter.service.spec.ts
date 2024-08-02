import { TestBed } from '@angular/core/testing';

import { PostAdapterService } from './post-adapter.service';

describe('PostAdapterService', () => {
  let service: PostAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
