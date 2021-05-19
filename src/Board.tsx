import Row from './Row'

class Board{
    private rows: Row[];
    private boardArray: string[][]; 
    private nextBoard: string[][];

    constructor(boardArray: string[][]){
        this.boardArray = boardArray;
        this.nextBoard = boardArray;
        this.rows = boardArray.map((row: string[], index: number) => {
            return new Row(index, row);
        })
    }

    getFullRows = (): number[] => {
        let fullRows: number[] = [];
        this.rows.forEach((row: Row, index: number) => {
            if (row.isFull) fullRows.push(index)
        })
        return fullRows;
    }

    removeFullRows = (fullRows: number[]): string[][] => {
        fullRows.forEach((index: number) => {
            while(index >= 0){
                    if(this.nextBoard[index - 1]){
                        this.nextBoard[index] = this.nextBoard[index - 1]
                    } else {
                        this.nextBoard[index] = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
                    }
                    index--;
            }
        })
        return this.nextBoard;
    }
    
}

export default Board;