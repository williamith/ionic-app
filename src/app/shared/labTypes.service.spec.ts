import { TestBed } from '@angular/core/testing';

import { LabTypesService } from './labTypes.service';

describe('LabsTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabTypesService = TestBed.get(LabTypesService);
    expect(service).toBeTruthy();
  });
});
