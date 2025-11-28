import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBox } from './detail-box';

describe('DetailBox', () => {
  let component: DetailBox;
  let fixture: ComponentFixture<DetailBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
