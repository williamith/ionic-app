import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardPageModule'
  },
  {
    path: 'patients',
    loadChildren: './patients/patients.module#PatientsPageModule'
  },
  {
    path: 'labs',
    loadChildren: './labs/labs.module#LabsPageModule'
  },
  {
    path: 'pharmacists',
    loadChildren: './pharmacists/pharmacists.module#PharmacistsPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
