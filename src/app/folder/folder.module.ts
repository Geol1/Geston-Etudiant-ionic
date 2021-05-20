import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import{ MonModalComponent} from './../mon-modal/mon-modal.component';

import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage,MonModalComponent],
  entryComponents: [MonModalComponent]
})
export class FolderPageModule {}
