import { createStore } from 'redux';
import emptyBoard from './emptyBoard';

const initialState = {
    board: emptyBoard,
    currentPiece: undefined,
    gravityActive: false,
    score: 0,
    gameOver: false,
    gameStarted: false,
    highScores: undefined,
    gameSpeed: 350, 
};

const reducer = (state = initialState, action) => {
    let nextState;
    switch(action.type){
        case 'UPDATE': return {
            board: action.board,
            currentPiece: action.currentPiecePosition,
            gravityActive: true,
            newPiece: action.newPiece,
            score: action.score,
            gameStarted: true,
            highScores: action.highScores,
            gameSpeed: action.gameSpeed
            
        }
        case "REMOVE_FULL_ROWS": 
            nextState = Object.assign(state, 
                {board: action.board},
                {newPiece: false},
                {score: action.score},
                {gameSpeed: 350 - (action.score * 2) > 75 ? 350 - (action.score * 2) : 75}
                )
            return nextState;
        case "GAME_OVER":
            nextState = Object.assign(state, {gameOver: true})
            return nextState;
        case "START_GAME":
            nextState = Object.assign(state, {gameStarted: true})
            return nextState;
        case "SET_SCORES":
            nextState = Object.assign(state, {highScores: action.scores});
        // case "UPDATE_INTERVAL_ID":
        //     nextState = Object.assign(state, {intervalId: action.intervalId})
        default: return state;
    }
}

const store = createStore(reducer);

export default store;
 