import { Component, OnInit } from '@angular/core';

export interface Cell {
  row: number;
  col: number;
  value?: string;
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
  activeCell: Cell;

  cellData: { [key: string]: string } = {};

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
    this.activeCell = this.cells[0][0];
  }

  onGridScroll(e: Event) {
    const grid = e.srcElement as HTMLElement;

    const approxVertPerc = grid.scrollTop / grid.scrollHeight * 100;

    const approxHorizPerc = grid.scrollLeft / grid.scrollWidth * 100;

    // todo: trackBy on loops? -- tested, harmed performance. May try manually adding/removing to DOM
    // todo: if perc is 0, nudge it so it doesnt get stuck
    // todo: scroll should only affect one direction
    if (approxVertPerc < 20) {
      this.addRowToTop();
    }
    if (approxVertPerc > 60) {
      this.addRowToBottom();
    }

    if (approxHorizPerc > 60) {
      this.addColToRight();
    }

    if (approxHorizPerc < 20) {
      this.addColToLeft();
    }
  }

  addRowToTop() {
    const nextRowNum = this.cells[0][0].row - 1;
    const firstColNum = this.cells[0][0].col;
    const newrow = [];

    if (nextRowNum < 0) {
      return;
    }

    this.extractDataFromRow(this.cells.pop());

    for (let i = 0; i < this.viewCols; i++) {
      newrow.push({ row: nextRowNum, col: firstColNum + i });
    }
    this.insertDataIntoNewRow(newrow);
    this.cells.unshift(newrow);
  }

  addRowToBottom() {
    const nextRowNum = this.cells[this.cells.length - 1][0].row + 1;
    const firstColNum = this.cells[this.cells.length - 1][0].col;
    const newrow = [];

    this.extractDataFromRow(this.cells.shift());

    for (let i = 0; i < this.viewCols; i++ ) {
      newrow.push({ row: nextRowNum, col: firstColNum + i });
    }
    this.insertDataIntoNewRow(newrow);
    this.cells.push(newrow);
  }

  addColToRight() {
    const nextColNum = this.cells[0][this.cells[0].length - 1].col + 1;
    for (let i = 0; i < this.viewRows; i++) {
      const rowToMutate = this.cells[i];
      rowToMutate.shift();
      rowToMutate.push({ row: i, col: nextColNum });
    }
  }

  addColToLeft() {
    const nextColNum = this.cells[0][0].col - 1;

    if (nextColNum < 0) {
      return;
    }

    for (let i = 0; i < this.viewRows; i++) {
      const rowToMutate = this.cells[i];
      rowToMutate.pop();
      rowToMutate.unshift({ row: i, col: nextColNum });
    }
  }

  cellClick(cell: Cell) {
    this.activeCell = cell;
    document.getElementById('formulaInput').focus();
  }

  extractDataFromRow(row: Cell[]) {
    row
      .filter(c => c.value)
      .forEach(c => this.cellData[`${c.row}-${c.col}`] = c.value);
  }

  insertDataIntoNewRow(row: Cell[]) {
    row.forEach(c => {
      const key = `${c.row}-${c.col}`;
      if (this.cellData[key]) {
        c.value = this.cellData[key];
      }
    });
  }

  numToAlpha(n: number) {
    let alpha = '';
    do {
      const rem = n % 26;
      n = Math.floor(n / 26);

      alpha += String.fromCharCode(65 + rem);
    } while(n > 0);

    return alpha;
  }
}