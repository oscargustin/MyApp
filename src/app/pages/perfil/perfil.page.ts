import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
  }

  editarPerfil(){
    this.router.navigate(['editar-perfil']);
  }
}
