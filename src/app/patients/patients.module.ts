import { PatientLabHistoryComponent } from './patient-lab-history/patient-lab-history.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PatientsPage } from './patients.page';

const routes: Routes = [
  {
    path: 'patient-detail/lab-history',
    component: PatientLabHistoryComponent
  },
  {
    path: 'patient-detail',
    component: PatientDetailComponent
  },
  {
    path: '',
    component: PatientsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PatientsPage,
    PatientDetailComponent,
    PatientLabHistoryComponent
  ]
})
export class PatientsPageModule {}
