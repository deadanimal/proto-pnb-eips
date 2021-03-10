import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDatabaseComponent } from './master-database.component';

describe('MasterDatabaseComponent', () => {
  let component: MasterDatabaseComponent;
  let fixture: ComponentFixture<MasterDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
