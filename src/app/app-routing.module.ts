import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./core/login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./core/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./core/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./core/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./content/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./content/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./content/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'main-screen',
    loadChildren: () => import('./core/main-screen/main-screen.module').then( m => m.MainScreenPageModule)
  },  {
    path: 'main-screen',
    loadChildren: () => import('./content/main-screen/main-screen.module').then( m => m.MainScreenPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
