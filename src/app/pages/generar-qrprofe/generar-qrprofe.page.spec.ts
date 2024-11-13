import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarQrprofePage } from './generar-qrprofe.page';

describe('GenerarQrprofePage', () => {
  let component: GenerarQrprofePage;
  let fixture: ComponentFixture<GenerarQrprofePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarQrprofePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
