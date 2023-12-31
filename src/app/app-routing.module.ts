import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './views/overview/overview.component';
import { AuthGuard } from './auth.guard';
import { CreateChatComponent } from './components/create-chat/create-chat.component';
import { ChatsComponent } from './chats/components/chats/chats.component';
import { SettingsComponent } from './settings/components/settings/settings.component';
import { FriendsComponent } from './friends/friends/friends.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'chats',
        pathMatch: 'full',
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
      },
      {
        path: 'create-chat',
        component: CreateChatComponent,
      },
      {
        path: 'chats',
        component: ChatsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'friends',
        loadChildren: () =>
          import('./friends/friends.module').then((m) => m.FriendsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
