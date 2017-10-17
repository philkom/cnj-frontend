import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string = null;
  error: boolean = false;

  constructor(private http: Http) {
  }

  checkInfo() {
    this.http.get('/info').map(response => response.json()).subscribe(info => {
        this.message = info.message;
        this.error = false;
      },
      error => {
        this.error = true;
        this.message = 'ERROR';
      }
    );
  }
}
