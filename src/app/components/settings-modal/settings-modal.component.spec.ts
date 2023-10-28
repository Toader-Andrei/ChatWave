import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingModalComponent } from './setting-modal.component';

describe('SettingModalComponent', () => {
  let component: SettingModalComponent;
  let fixture: ComponentFixture<SettingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingModalComponent]
    });
    fixture = TestBed.createComponent(SettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
