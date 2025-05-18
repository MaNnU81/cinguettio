import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCingueComponent } from './new-cingue.component';

describe('NewCingueComponent', () => {
  let component: NewCingueComponent;
  let fixture: ComponentFixture<NewCingueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCingueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCingueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
