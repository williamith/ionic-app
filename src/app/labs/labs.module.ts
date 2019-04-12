import { LabTypeCreateComponent } from './lab-type-create/lab-type-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LabsPage } from './labs.page';

const routes: Routes = [
  {
    path: 'new',
    component: LabTypeCreateComponent
  },
  {
    path: '',
    component: LabsPage
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
    LabsPage,
    LabTypeCreateComponent
  ]
})
export class LabsPageModule {}
