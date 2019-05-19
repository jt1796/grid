import { Component, OnInit } from '@angular/core';

export interface Cell {
  row: number;
  col: number;
}

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {
  viewRows = 100;
  viewCols = 100;
  cells: Cell[][];

  constructor() { }

  ngOnInit() {
    this.cells = [];
    for (let r = 0; r < this.viewCols; r++) {
      const currow = [];
      for (let c = 0; c < this.viewCols; c++) {
        currow.push({ row: r, col: c });
      }
      this.cells.push(currow);
    }
  }

  onGridScroll(e: Event) {
    const grid = e.srcElement as HTMLElement;

    const approxVertPerc = grid.scrollTop / grid.scrollHeight * 100;

    const approxHorizPerc = grid.scrollLeft / grid.scrollWidth * 100;

    // todo: trackBy on loops?
    // todo: if perc is 0, nudge it so it doesnt get stuck
    if (approxVertPerc < 20) {
      this.addRowToTop();
    }
    if (approxVertPerc > 60) {
      this.addRowToBottom();
    }
  }

  addRowToTop() {
    const nextRowNum = this.cells[0][0].row - 1;
    const firstColNum = this.cells[0][0].col;
    const newrow = [];

    if (nextRowNum < 0) {
      return;
    }

    this.cells.pop();
    for (let i = 0; i < this.viewCols; i++) {
      newrow.push({ row: nextRowNum, col: firstColNum + i });
    }
    this.cells.unshift(newrow);
  }

  addRowToBottom() {
    const nextRowNum = this.cells[this.cells.length - 1][0].row + 1;
    const firstColNum = this.cells[this.cells.length - 1][0].col;
    const newrow = [];

    this.cells.shift();
    for (let i = 0; i < this.viewCols; i++ ) {
      newrow.push({ row: nextRowNum, col: firstColNum + i });
    }
    this.cells.push(newrow);
  }

}