import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioProfePage } from './inicio-profe.page';

describe('InicioProfePage', () => {
  let component: InicioProfePage;
  let fixture: ComponentFixture<InicioProfePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioProfePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
