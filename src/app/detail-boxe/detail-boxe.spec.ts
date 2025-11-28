import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBoxe } from './detail-boxe';

describe('DetailBoxe', () => {
  let component: DetailBoxe;
  let fixture: ComponentFixture<DetailBoxe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBoxe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBoxe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
