import {Validators, FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mon-modal',
  templateUrl: './mon-modal.component.html',
  styleUrls: ['./mon-modal.component.scss'],
})
export class MonModalComponent {
  public nom ="kenne";
   etudiants : FormGroup
  t_etudiants=[]
  t_etud=[]
   cle_etud=[]
   public etuds1
   cle="1"
   e_nom=""
  e_matricule=""
  e_presentation=""
  e_telephone=""
  e_cle=""
  constructor(public modalCtrl: ModalController, private formBuilder: FormBuilder, public navCtrl: NavController) {
    this.navCtrl
    this.etudiants = this.formBuilder.group({
      nom: ['', Validators.required],
      telephone: [''],
      matricule: [''],
      presentation: [''],
    });
  }
  logForm(){
    
    this.cle_etud.push(this.cle)
    this.t_etud.push( localStorage.getItem(this.cle))

    while (localStorage.getItem(this.cle)!=null) {
      this.cle=this.cle+"1"
      this.cle_etud.push(this.cle)
      this.t_etud.push( localStorage.getItem(this.cle))
    }
    // stockage des this.cle etudiants
    // localStorage.setItem("this.cle",JSON.stringify(this.cle_etud))
    // console.log(this.t_etud)

    // ajouter un nouvelle etudiant 
    this.t_etudiants.push(this.etudiants.value)
    localStorage.setItem(this.cle, JSON.stringify(this.t_etudiants))
     
    console.log(this.t_etudiants)
      JSON.parse(localStorage.getItem(this.cle),(key, value) => {
        if (key=='nom') { this.e_nom=value}
        if (key=='telephone') { this.e_telephone=value}
        if (key=='matricule') { this.e_matricule=value}
        if (key=='presentation') { this.e_presentation=value}
      } )

    this.etuds1=[{
        "nom": this.e_nom,
        "presentation": this.e_presentation,
        "telephone": this.e_telephone,
        "matricule": this.e_matricule,
        "cle": this.cle
      }]
      // this.etuds.push(this.etuds1)
      localStorage.setItem(this.cle, JSON.stringify(this.etuds1))
     
    console.log(this.etuds1)
  
    this.dismissModalcancel()
  }
  dismissModalcancel(){
    this.modalCtrl.dismiss()
  }

}
