import { TestBed } from '@angular/core/testing';

import { TypeRelationService } from './type-relation.service';

describe('TypeRelationService', () => {
  let service: TypeRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
