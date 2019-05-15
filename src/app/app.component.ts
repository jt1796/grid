import { Component } from '@angular/core';
import { Mode } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mode = Mode.SPREADSHEET;
  Mode = Mode;
}
