import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.page.html',
  styleUrls: ['./registro-alumno.page.scss'],
})
export class RegistroAlumnoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  registrar(){
    this.router.navigate(['/login'])
  }
}


