import Block from './Block';

export type PiecePosition = [ Block, Block, Block, Block ];

export type BoardArray = string[][];

export type ScoreRow = {
    name: string,
    id: number,
    score: number
}

export type ScoreList = ScoreRow[]