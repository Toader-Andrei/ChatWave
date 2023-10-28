import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalComponent } from './profile-modal.component';

describe('ProfileModalComponent', () => {
  let component: ProfileModalComponent;
  let fixture: ComponentFixture<ProfileModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileModalComponent]
    });
    fixture = TestBed.createComponent(ProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
