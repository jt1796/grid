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

  onGridScroll(e: Event) {
    const grid = e.srcElement as HTMLElement;

    const approxVertPerc = grid.scrollTop / grid.scrollHeight * 100;
    console.log(approxVertPerc);

    const approxHorizPerc = grid.scrollLeft / grid.scrollWidth * 100;
    console.log(approxHorizPerc);

    // When scroll is near bottom/top, add on rows, take rows from top
    // near right/ left
  }

}