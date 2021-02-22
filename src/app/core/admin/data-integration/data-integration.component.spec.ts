import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataIntegrationComponent } from './data-integration.component';

describe('DataIntegrationComponent', () => {
  let component: DataIntegrationComponent;
  let fixture: ComponentFixture<DataIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
