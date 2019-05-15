import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {
  rows = 100;
  cols = 100;
  cells: number[][];

  constructor() { }

  ngOnInit() {
    this.cells = [];
    for (let r = 0; r < this.rows; r++) {
      const currow = [];
      for (let c = 0; c < this.cols; c++) {
        currow.push(0);
      }
      this.cells.push(currow);
    }
  }

}
