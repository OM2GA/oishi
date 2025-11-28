import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCommandes } from './historique-commandes';

describe('HistoriqueCommandes', () => {
  let component: HistoriqueCommandes;
  let fixture: ComponentFixture<HistoriqueCommandes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueCommandes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueCommandes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
