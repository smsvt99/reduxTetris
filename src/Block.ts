import { PiecePosition } from './Types';

type blockProps = {
    columnId : number,
    rowId : number,
    value : string,
}

class Block{  

    value: string;
    rowId: number;
    columnId: number;

    constructor(value: string, rowId: number, columnId: number){
        this.columnId = columnId;
        this.rowId = rowId;
        this.value = value;
    }

    blockToLeft = (): Block => {
        return new Block(this.value, this.rowId, this.columnId - 1);
    }

    blockToRight = (): Block => {
        return new Block(this.value, this.rowId, this.columnId + 1);
    }

    blockBelow = (): Block => {
        return new Block(this.value, this.rowId + 1, this.columnId);
    }

    isEqualTo = (block: Block): boolean => {
        return block.rowId === this.rowId && block.columnId === this.columnId;
    }
}

export default Block;