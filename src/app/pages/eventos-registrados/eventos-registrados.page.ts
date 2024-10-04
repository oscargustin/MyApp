import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos-registrados',
  templateUrl: './eventos-registrados.page.html',
  styleUrls: ['./eventos-registrados.page.scss'],
})
export class EventosRegistradosPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


  codigoqr(){
    this.router.navigate(['/codigo-qr'])
  }
}
