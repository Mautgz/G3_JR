import { TestBed } from '@angular/core/testing';

import { GestionVentasService } from './gestion-ventas.service';

describe('GestionVentasService', () => {
  let service: GestionVentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionVentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
