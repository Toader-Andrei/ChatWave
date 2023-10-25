import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOverviewComponent } from './chat-overview.component';

describe('ChatOverviewComponent', () => {
  let component: ChatOverviewComponent;
  let fixture: ComponentFixture<ChatOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatOverviewComponent]
    });
    fixture = TestBed.createComponent(ChatOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
