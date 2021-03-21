import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AuthGuard } from './guards/auth.guard';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'co',
    pathMatch: 'full'
  },
  {
    path: 'co',
    loadChildren: () => import('./co/co.module').then( m => m.CoPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard],
    data : {
      role: 'USER'
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule),
    canActivate: [AuthGuard],
    data : {
      role: 'ADMIN'
    }
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./pages/admin-users/admin-users.module').then( m => m.AdminUsersPageModule),
    canActivate: [AuthGuard],
    data : {
      role: 'ADMIN'
    }
  },
  {
    path: 'admin-categories',
    loadChildren: () => import('./pages/admin-categories/admin-categories.module').then( m => m.AdminCategoriesPageModule),
    canActivate: [AuthGuard],
    data : {
      role: 'ADMIN'
    }
  },

];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
