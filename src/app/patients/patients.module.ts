import { PatientLabEditComponent } from './patient-lab-edit/patient-lab-edit.component';
import { PatientLabHistoryComponent } from './patient-lab-history/patient-lab-history.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PatientsPage } from './patients.page';
import { PatientCreateComponent } from './patient-create/patient-create.component';

const routes: Routes = [
  {
    path: 'patient-detail/lab-history/lab-edit',
    component: PatientLabEditComponent
  },
  {
    path: 'patient-detail/lab-history',
    component: PatientLabHistoryComponent
  },
  {
    path: 'new',
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
    PatientLabHistoryComponent,
    PatientCreateComponent,
    PatientLabEditComponent
  ]
})
export class PatientsPageModule {}
