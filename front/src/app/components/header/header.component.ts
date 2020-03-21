import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Globals } from './../../globals';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  session: boolean;
  globals: Globals;

  constructor(private _router: Router, globals: Globals) {
    this.session= globals.session;
   }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem('session'))){
      this.session = true;
    }
    else{
      this.session=false;
    }
  }
}