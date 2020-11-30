import { Component, OnInit } from '@angular/core';


//llamar a una funcion global (otro archivo) *** Declarar funcion
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      customInitFunctions();
  }

}
