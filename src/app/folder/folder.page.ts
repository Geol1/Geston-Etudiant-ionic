import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import{ MonModalComponent} from './../mon-modal/mon-modal.component';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';



@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string
  public editEtudiant: FormGroup
  public search: FormGroup
  elt_chercher=""
  trouve=false
  cle_search="1"
   cle="1"
   i=1
   t_editEtudiant=[]
   e_nom=""
  e_matricule=""
  e_presentation=""
  e_telephone=""
  e_cle=""
   public etuds1
  public etuds
  
  public AjouterEtudiant(){
    this.i=1
    this.cle=this.cle+"1";
      while (this.i!=10) {
        if (localStorage.getItem(this.cle)!=null) {
        JSON.parse(localStorage.getItem(this.cle),(key, value) => {
          if (key=='nom') { this.e_nom=value}
          if (key=='telephone') { this.e_telephone=value}
          if (key=='matricule') { this.e_matricule=value}
          if (key=='presentation') { this.e_presentation=value}
          if (key=='cle') { this.e_cle=value}
        }
    )
      this.etuds1={
          nom: this.e_nom,
          presentation: this.e_presentation,
          telephone: this.e_telephone,
          matricule: this.e_matricule,
          cle_etud: this.e_cle
        }
        this.etuds.push(this.etuds1)
      }
        this.cle=this.cle+"1";
        this.i=this.i+1
    }
  }

 constructor(public activatedRoute: ActivatedRoute ,public router:Router, public formBuilder2: FormBuilder, public formBuilder: FormBuilder , public alertController:AlertController,public modalCtrl: ModalController) {
    this.afficheAll()
   this.editEtudiant = this.formBuilder.group({
        nom: [''],
        telephone: [''],
        matricule: [''],
        presentation: ['', Validators.maxLength(150)],
        cle:['']
    })
    this.search=this.formBuilder2.group({
      recherche:['']
    })
  }
h
  public afficheAll(){
    this.cle="1"
    while (localStorage.getItem(this.cle)==null) {
      this.cle=this.cle+"1"
    }
    JSON.parse(localStorage.getItem(this.cle),(key, value) => {
      if (key=='nom') { this.e_nom=value}
      if (key=='telephone') { this.e_telephone=value}
      if (key=='matricule') { this.e_matricule=value}
      if (key=='presentation') { this.e_presentation=value}
      if (key=='cle') { this.e_cle=value}
    }
  ) 
    console.log(localStorage.getItem(this.cle));
    this.etuds=[{
      nom: this.e_nom,
      presentation: this.e_presentation,
      telephone: this.e_telephone,
      matricule: this.e_matricule,
      cle_etud: this.e_cle
    }]
    this.AjouterEtudiant()
  }

  public ChercherEtudiant(){
    this.elt_chercher=this.search.getRawValue().recherche
      console.log(this.elt_chercher);
      this.cle_search="1"
      console.log(this.cle_search);
      
      while (localStorage.getItem(this.cle_search)!=null) {
        console.log(this.cle_search);
        JSON.parse(localStorage.getItem(this.cle_search),(key, value) => {
          if (key=='matricule' && this.elt_chercher==value ){this.trouve=true
            JSON.parse(localStorage.getItem(this.cle_search),(key, value) => {
          if (key=='cle' ) { this.e_cle=value}
            })
        }}
      )
      this.cle_search=this.cle_search+"1"
     }
     if (this.trouve===true) {
      console.log(localStorage.getItem(this.e_cle))
      this.affiche()
     }else if(this.trouve===false){
       this.afficheabsent()
     } 
  }
  public SupprimerEtudiant(val){
    localStorage.removeItem(val)
    this.afficheAll()
    console.log(val);
  }

editForm(val1){
  localStorage.removeItem(val1)
  this.t_editEtudiant.push(this.editEtudiant.value);
  console.log(val1);
  

  this.t_editEtudiant.push(this.editEtudiant.value)
    localStorage.setItem(val1, JSON.stringify(this.t_editEtudiant))
     
    console.log(this.t_editEtudiant)
      JSON.parse(localStorage.getItem(val1),(key, value) => {
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
        "cle": val1
      }]
      // this.etuds.push(this.etuds1)
      localStorage.setItem(val1, JSON.stringify(this.etuds1))
    this.afficheAll()
    // let cle="etud"
    // this.cle_etud.push(cle)
    // this.t_etud.push( localStorage.getItem(cle))
    
    // while (localStorage.getItem(cle)!=null) {
    //   cle=cle+"1"
    //   this.cle_etud.push(cle)
    //   this.t_etud.push( localStorage.getItem(cle))
    // }

  }


  public async openModal() {
    let modal = await this.modalCtrl.create({
      component: MonModalComponent,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.etuds1 = dataReturned.data;
        console.log(this.etuds1);
        this.afficheAll()
      }
    });
    await modal.present();
  }


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  async presentAlertEdit(val1) {
    const alert = await this.alertController.create({
      header: "Nouveau nom: "+this.editEtudiant.value.nom,
      subHeader: " Nouveau matricule: "+this.editEtudiant.value.matricule,
      message: " Nouveau Tel: "+this.editEtudiant.value.telephone+"   Nouvelle presentation: "+this.editEtudiant.value.presentation,
      buttons: [
        {
            text: "Oui j'accepte",
            handler: ()=> {
              this.Agree();
              this.editForm(val1)
            }
      },
      {
            text: "Cancel",
            handler: ()=>{
              this.Cancel()
              
            }
      }
      ]
    });
  
    await alert.present();
  }
  async affiche() {
    JSON.parse(localStorage.getItem(this.e_cle),(key, value) => {
      if (key=='nom') { this.e_nom=value}
      if (key=='telephone') { this.e_telephone=value}
      if (key=='matricule') { this.e_matricule=value}
      if (key=='presentation') { this.e_presentation=value}
    })
    const alert = await this.alertController.create({
      header: this.e_nom,
      subHeader: this.e_matricule,
      message: this.e_telephone+"   "+this.e_presentation,
    });
  await alert.present();
  }
  async afficheabsent() {
    const alert = await this.alertController.create({
      message: "Cet etudiant n'existe pas",
    });
  await alert.present();
  }
  Agree(){
    console.log("j accepte");
  }
  Cancel(){
    console.log("refuser");
  }
  async presentAlertSupp(val) {
    console.log(this.editEtudiant.value.cle)
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Voulez vous vraiment supprimer cet etudiant?',
      buttons: [
        {
            text: "Oui",
            handler: ()=> {
              this.Agree()
              this.SupprimerEtudiant(val)
            }
      },
      {
            text: "Cancel",
            handler: ()=>{
              this.Cancel();
            }
      }
      ]
    });
  
    await alert.present();
  }
  

}
