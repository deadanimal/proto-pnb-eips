import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetizedApiComponent } from './monetized-api.component';

describe('MonetizedApiComponent', () => {
  let component: MonetizedApiComponent;
  let fixture: ComponentFixture<MonetizedApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonetizedApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonetizedApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
