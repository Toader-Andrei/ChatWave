import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { ChatComponent } from './chats/components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './views/overview/overview.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChatsComponent } from './chats/components/chats/chats.component';
import { CreateChatComponent } from './components/create-chat/create-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ConversationsComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    OverviewComponent,
    NavigatorComponent,
    SettingsComponent,
    ProfileModalComponent,
    ChatsComponent,
    CreateChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
