import UiBlock from './UiBlock'; 
import React from 'react'; 
 
type rowProps = {
    rowId: number,
    row: string[],
    isFull: boolean,
    key: number,
    gameOver: boolean
}
 
const Row: React.FC<rowProps> = (props: rowProps) => {

    const rowId: number = props.rowId;
    const blocks: JSX.Element[] = props.row.map((value, index) => 
        <UiBlock 
            key={"" + index + rowId}
            value={value}
            isInFullRow={props.isFull} 
            index={index}
            gameOver={props.gameOver}
        />
    );

    return <div 
        key={rowId}
        style={{padding: 0}}
        >{blocks}</div>
}

export default Row;