import React, { CSSProperties } from 'react';
import Form from './Form';
import '../johnny_fever/johnnyFever.ttf';
import { ScoreList } from '../Types';

type ScoreProps = {
    score: number,
    gameOver: boolean,
    startGame: () => void,
    gameStarted: boolean,
    highScores: ScoreList | undefined 
}

const Score: React.FC<ScoreProps> = (props) => {


    let variableText;
    if (!props.gameStarted) {
        variableText = "click here to play!"
    } else if (props.gameOver) {
        variableText = "game over"
    } else {
        variableText = "use the arrow keys to play"
    }

    const scoreBoard = props.highScores ? <ol style={{fontSize: '20px'}}>{
                        props.highScores.map(row =>
                            <li style={{ padding: '0px' }}>
                                <span style={{width:"40px", display: "inline-block"}}>{row.name}</span>
                                : 
                                <span style={{width:"75px", display: "inline-block"}}>{`${row.score} PTS`}</span>
                            </li>)}
                        </ol>
                        : <div>Loading high scores...</div>
    let bottom;
    if(props.gameOver){
        bottom = <Form score={props.score}/>
    } else {
        bottom = scoreBoard
    }


    const cursor = props.gameStarted ? 'initial' : 'pointer';

    const animation = props.gameStarted ? "" : "blinker";

    const box: CSSProperties = {
        border: "3px solid rgba(255,255,255,.3)",
        height: "150px",
        width: "250px",
        // color: `rgb(255, ${255-props.score}, ${255-props.score})`,
        color: "white",
        lineHeight: "150px",
        fontSize: "75px",
        marginLeft: "25px",
        marginBottom: "10px",
        borderRadius: "15px",
        textAlign: "center",
        fontFamily: "johnnyFever"
    }
    return (
        <div>

            <div style={box}>
                {props.score}
            </div>

            <div
                style={{ 
                    ...box,
                    height: '435px',
                    lineHeight: 'initial'
                }}
            >
                Tetris
            <div
                    style={{
                        fontSize: '30px',
                        cursor: cursor
                                        }}
                    onClick={props.gameStarted ? () => {} : props.startGame}
                >
                    <span className = {animation}>
                    {variableText}
                    </span>
                    {bottom}
                </div>
            </div>
        </div>
    )
}

export default Score;