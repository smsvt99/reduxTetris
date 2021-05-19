import Block from './Block';
import { PiecePosition, BoardArray } from './Types'

class CurrentPiece {

    currentPosition: PiecePosition;
    lockCurrentPosition: boolean = false;
    nextPosition: PiecePosition;
    board: BoardArray;
    axis: Block; 
    newPiece: boolean = false;

    constructor(board: BoardArray, position: PiecePosition | undefined) {
        this.board = board;

        if(position){
            this.currentPosition = position;
            this.nextPosition = position;
            this.axis = position[0];
        } else {
            const nextPiece: PiecePosition = this.generate();
            this.currentPosition = nextPiece;
            this.nextPosition = nextPiece;
            this.axis = nextPiece[0];
        }
    }

    removeFromBoard(board: BoardArray): BoardArray{
        this.currentPosition.forEach((block: Block): void => {
            board[block.rowId][block.columnId] = 'e';
        })
        return board;
    }

    addToBoard(board: BoardArray): BoardArray{
        this.currentPosition.forEach((block: Block): void => {
            board[block.rowId][block.columnId] = block.value;
        })
        return board;
    }

    addNextToBoard(board: BoardArray): BoardArray{
        this.nextPosition.forEach((block: Block): void => {
            board[block.rowId][block.columnId] = block.value
        })
        return board;
    }

    rotate(): boolean {

        const newPosition: PiecePosition = this.currentPosition.map((block: Block, index) => {
            const newColumnId = ((this.axis.rowId - block.rowId) * -1) + this.axis.columnId;
            const newRowId = (this.axis.columnId - block.columnId) + this.axis.rowId;

            return new Block(
                block.value,
                newRowId,
                newColumnId
            )
        }) as PiecePosition

        if (this.isValidPosition(newPosition)) {
            this.setNextPosition(newPosition)
            return true;
        }
        return false;
    }

    move(direction: string): boolean {
        const proposedPosition = this.currentPosition.map((block: Block): Block => {
            switch (direction) {
                case "ArrowLeft":
                    return block.blockToLeft();
                case "ArrowRight":
                    return block.blockToRight();
                case "ArrowDown":
                    return block.blockBelow();
                default:
                    return block;
            }
        }) as PiecePosition

        if (this.isValidPosition(proposedPosition)) {
            this.setNextPosition(proposedPosition)
            return true;

        } else if (direction === "ArrowDown") { //this.move("ArrowDown") will always return true and alter state
            this.setNextPosition(this.generate())
            this.lockCurrentPosition = true;
            return true;
        }
        return false;
    }

    isValidPosition(proposedPosition: PiecePosition): boolean {
        const currentPositionString: string[] = this.currentPosition.map((block: Block) => {
            return JSON.stringify(block);
        })
        // i.e., the proposed position with the blocks it has in common with the current position having been subtracted
        const difference: Block[] = proposedPosition.filter((block: Block) => {
            return !currentPositionString.includes(JSON.stringify(block));
        })

        for (let block of difference) {
            if (block.rowId === this.board.length){
                return false;}
            try {
                if (this.board[block.rowId][block.columnId] !== 'e'){
                    return false;
                }
            } catch (error) {
                return false;
            }
        }
        return true;
    }

    private setNextPosition(nextPosition: PiecePosition) {
        this.nextPosition = nextPosition;
    }

    getNextPosition = (): PiecePosition => {
        return this.nextPosition;
    }

    generate(): PiecePosition {
        let blocks: PiecePosition;
        const shapes = ['o', 't', 's', 'z', 'l', 'j', 'i']
        const shape = shapes[Math.floor(Math.random() * shapes.length)]
        switch (shape) {
            case 'o':
                blocks = [
                    new Block('b', 0, 4),
                    new Block('b', 0, 5),
                    new Block('b', 1, 4),
                    new Block('b', 1, 5)
                ];
                break;
            case 't':
                blocks = [
                    new Block('o', 1, 5),
                    new Block('o', 0, 5),
                    new Block('o', 1, 4),
                    new Block('o', 1, 6)
                ]
                break;
            case 's':
                blocks = [
                    new Block('g', 0, 4),
                    new Block('g', 1, 3),
                    new Block('g', 0, 5),
                    new Block('g', 1, 4)
                ]
                break;
            case 'z':
                blocks = [
                    new Block('p', 1, 5),
                    new Block('p', 0, 4),
                    new Block('p', 0, 5),
                    new Block('p', 1, 6)
                ]
                break;
            case 'l':
                blocks = [
                    new Block('y', 0, 4),
                    new Block('y', 0, 3),
                    new Block('y', 0, 5),
                    new Block('y', 1, 3)
                ]
                break;
            case 'j':
                blocks = [
                    new Block('br', 0, 4),
                    new Block('br', 0, 5),
                    new Block('br', 0, 3),
                    new Block('br', 1, 5)
                ]
                break;
            case 'i':
                blocks = [
                    new Block('r', 0, 5),
                    new Block('r', 0, 4),
                    new Block('r', 0, 3),
                    new Block('r', 0, 6)
                ]
                break;
            default: blocks = [
                new Block('b', 0, 4),
                new Block('b', 0, 5),
                new Block('b', 1, 4),
                new Block('b', 1, 5)
            ];
        }
        this.newPiece = true;
        return blocks;
    }

}

export default CurrentPiece;