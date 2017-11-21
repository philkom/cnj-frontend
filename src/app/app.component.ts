import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { NgSwitch } from '@angular/common';
import 'rxjs/add/operator/map';
import { Info } from './info';
import { Veranstaltung } from './veranstaltung';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  info: Info = null;
  allEvents: boolean = false;
  error: boolean = false;

  events: Veranstaltung[] = null;

  event: Veranstaltung = new Veranstaltung();

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.checkInfo();
    this.loadEvents();
  }

  checkInfo() {
    this.http.get('/v1/info').map(response => response.json()).subscribe(info => {
      this.info = info;
      this.error = false;
    },
      error => {
        this.error = true;
      }
    );
  }

  loadEvents() { 
    this.http.get('/v1/veranstaltungen?allEvents='+this.allEvents).map(response => response.json()).subscribe(veranstaltungen => {
      this.events = veranstaltungen;
    }
    );
   
  }

  load(id:number) { 
    this.http.get('/v1/veranstaltungen/'+id).map(response => response.json()).subscribe(veranstaltung => {
      this.event = veranstaltung;
    }
    );
   
  }

  delete(id:number) { 
    this.http.delete('/v1/veranstaltungen/'+id).subscribe(response => {
      this.loadEvents();
      this.event = new Veranstaltung();
    }
    );
   
  }

  createEvent() {
    this.http.post('/v1/veranstaltungen', this.event).subscribe(veranstaltungen => {
      this.loadEvents();
      this.event = new Veranstaltung();
    }, error => {
      window.alert(error);
    }
    );
  } 

  updateEvent() {
    this.http.put('/v1/veranstaltungen/'+this.event.id, this.event).subscribe(veranstaltungen => {
      this.loadEvents();
      this.event = new Veranstaltung();
    }, error => {
      window.alert(error);
    }
    );
  }
  
  reset() {
    this.event = new Veranstaltung();    
  }

  toggleList() {
    this.allEvents = !this.allEvents;
    this.loadEvents();
  }
}
