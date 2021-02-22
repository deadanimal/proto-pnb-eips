import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDiscoveryComponent } from './data-discovery.component';

describe('DataDiscoveryComponent', () => {
  let component: DataDiscoveryComponent;
  let fixture: ComponentFixture<DataDiscoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDiscoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
