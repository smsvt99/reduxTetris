import Block from './Block';

class Row{

    rowId: number;
    blocks: Block[];
    isFull: boolean;
    
    constructor(rowId: number, blocks: string[]){
        this.rowId = rowId;
        this.blocks = blocks.map((value, index) => {
            return new Block(value, rowId, index)
        })
        this.isFull = !blocks.includes('e');
    }
}

export default Row;