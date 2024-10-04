import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroEventoPage } from './registro-evento.page';

describe('RegistroEventoPage', () => {
  let component: RegistroEventoPage;
  let fixture: ComponentFixture<RegistroEventoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
