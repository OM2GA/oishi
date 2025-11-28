import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBox } from './liste-box';

describe('ListeBox', () => {
  let component: ListeBox;
  let fixture: ComponentFixture<ListeBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
