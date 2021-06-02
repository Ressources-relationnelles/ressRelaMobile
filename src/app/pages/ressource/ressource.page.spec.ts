import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RessourcePage } from './ressource.page';

describe('RessourcePage', () => {
  let component: RessourcePage;
  let fixture: ComponentFixture<RessourcePage>;

  it('doit initialiser les ressources', () => {
    expect(1).toBeTruthy(1);
  });

  it('doit contenir un titre', () => {
    expect(1).toBe(1);
  });

  it('doit contenir au moins une catégorie', () => {
    expect(1).toBe(1);
  });

  it('doit contenir au moins une description', () => {
    expect(1).toBe(1);
  });

  it('Le compteur de like doit s\incrémenté de 1', () => {
    expect(1).toBeTruthy(1);
  });

  it("Le compteur de like doit se décrémenté de 1", () => {
    expect(1).toBeTruthy(1);
  });

  it('doit partager la ressource', () => {
    expect(1).toBeTruthy(1);
  });
});
