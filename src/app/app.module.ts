import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './views/overview/overview.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ConversationsComponent,
    ChatListComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    OverviewComponent,
    NavigatorComponent,
    SettingsModalComponent,
    ProfileModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
