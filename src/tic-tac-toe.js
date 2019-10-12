class TicTacToe {
  constructor() {
    this.field = [
      [
        null, null, null,
      ],
      [
        null, null, null,
      ],
      [
        null, null, null,
      ]
    ];

    this.symbols = [{
      value: 'x',
      selected: true, // selected by default
    }, {
      value: 'o',
      selected: false,
    }];
  }

  _checkRows(symbol) {
    return this.field.some(row => row.every(item => item === symbol));
  }

  _checkColumns(symbol) {
    let columnIndex = 0;
    let isWon = false;

    while (!isWon && columnIndex < this.field.length) {
      isWon = this.field.every(row => row[columnIndex] === symbol);

      columnIndex++;
    }

    return isWon;
  }

  _checkMainDiagonal(symbol) {
    return this.field.every((row, index) => row[index] === symbol);
  }

  _checkSecondDiagonal(symbol) {
    return this.field.every((row, index) => {
      const columnIndex = this.field.length - 1 - index;

      return row[columnIndex] === symbol;
    })
  }

  getCurrentPlayerSymbol() {
    return this.symbols.find(item => item.selected).value;
  }

  nextTurn(rowIndex, columnIndex) {
    if (!!this.field[rowIndex][columnIndex]) {
      return;
    }

    this.field[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();

    this.symbols = this.symbols.map(item => ({...item, selected: !item.selected }));
  }

  isFinished() {
    return !!this.getWinner() || this.isDraw();
  }

  getWinner() {
    const winner = this.symbols.find(symbolObj => {
      const symbol = symbolObj.value;

      return [
        this._checkRows(symbol),
        this._checkColumns(symbol),
        this._checkMainDiagonal(symbol),
        this._checkSecondDiagonal(symbol),
      ].some(item => item);
    });

    return winner && winner.value || null;
  }

  noMoreTurns() {
    return this.field.every(row => row.every(item => !!item));
  }

  isDraw() {
    return this.noMoreTurns() && !this.getWinner();
  }

  getFieldValue(rowIndex, colIndex) {
    return this.field[rowIndex][colIndex];
  }
}

module.exports = TicTacToe;