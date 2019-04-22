import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/shared/auth.guard';
import { RoleGuard } from './login/shared/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'patients',
    loadChildren: './patients/patients.module#PatientsPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'labs',
    loadChildren: './labs/labs.module#LabsPageModule',
    canLoad: [RoleGuard]
  },
  {
    path: 'pharmacists',
    loadChildren: './pharmacists/pharmacists.module#PharmacistsPageModule',
    canLoad: [RoleGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
