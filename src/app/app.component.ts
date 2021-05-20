import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import{ MonModalComponent} from './mon-modal/mon-modal.component';

import {Router} from'@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Accueil', url: '/folder/Inbox', icon: 'mail' },
    { title: 'ADD', url: '/mon-modal', icon: 'add-circle' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router,public modalCtrl: ModalController) {}

  
}
