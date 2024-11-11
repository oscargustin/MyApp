import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPopoverPage } from './perfil-popover.page';

describe('PerfilPopoverPage', () => {
  let component: PerfilPopoverPage;
  let fixture: ComponentFixture<PerfilPopoverPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
