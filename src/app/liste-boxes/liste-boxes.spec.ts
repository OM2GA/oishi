import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBoxes } from './liste-boxes';

describe('ListeBoxes', () => {
  let component: ListeBoxes;
  let fixture: ComponentFixture<ListeBoxes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeBoxes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeBoxes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
