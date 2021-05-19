import React, { CSSProperties } from 'react';

type blockProps = {
    // columnId : number,
    // rowId : number,
    value: string,
    key: string,
    isInFullRow: boolean,
    index: number,
    gameOver: boolean
}

const Block: React.FC<blockProps> = (props) => {
    const { key, value } = props;

    // const shine: CSSProperties = {
    //     width: '5px',
    //     height: '10px',
    //     border: 'solid 3px',
    //     borderColor: 'rgba(255, 255, 255, 0) transparent transparent transparent',
    //     borderRadius: '70%',
    //     transform: 'rotate(45deg)',
    //     margin: '3px 8px'
    // }
    // const noShine: CSSProperties = {
    //     width: '5px',
    //     height: '10px',
    //     border: 'solid 3px transparent',
    //     borderRadius: '70%',
    //     margin: '3px 8px',

    // }

    const getStyle = (value: string): CSSProperties => {

        let color: string;
        // let shadow: string = 'inset 2px -2px 0px 0px rgba(0,0,0,0.4)'
        // let shadow: string = 'none';

        if(props.gameOver) value = 'e';

        switch (value) {
            case 'e': color = '#111929'; break;
            case 'b': color = 'deepSkyBlue'; break;
            case 'o': color = 'orangered'; break;
            case 'g': color = 'lime'; break;
            case 'p': color = 'slateblue'; break;
            case 'br': color = 'red'; break;
            case 'y': color = 'gold'; break;
            case 'r': color = 'deeppink'; break;
            default: color = 'pink'; break;
        }

        // switch (value) {
        //     case 'e': color = '#111929'; shadow = 'none'; break;
        //     case 'b': color = '#2ba1d4'; break;
        //     case 'o': color = '#fc8f4d'; break;
        //     case 'g': color = '#deea70'; break;
        //     case 'p': color = '#ea69d2'; break;
        //     case 'br': color = '#f35669'; break;
        //     case 'y': color = '#8672e1'; break;
        //     case 'r': color = '#63a888'; break;
        //     default: color = 'pink'; break;
        // }

        return {
            height: '26px',
            width: '26px',
            display: 'inline-block',
            margin: '0px 2px',
            border: '1px solid rgba(255,255,255, .3)',
            // border: '2px solid #202a34',
            // border: '2px solid rgb(48,48,48)',
            borderColor: value === 'e' ? 'rgba(255,255,255,.3)' : '#111929',
            // borderRadius: '50%',
            // borderRadius: '15px',
            background: color,
            position: 'relative',
            opacity: '.9'
        }
    }

    const style: CSSProperties = getStyle(value)

    return <div
        style={style}
        key={key}
        className={props.isInFullRow || props.gameOver ? `t${"" + props.index} animated` : ""}
    >
    </div>
}

export default Block;