import { WebSocket } from "ws";
import {Chess} from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date()
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'white'
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'black'
            }
        }))
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string
    }){
        // validate the move using zod
        try {
            this.board.move(move)
            console.log(move)
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        } catch (error) {
            console.log(error)
            return
        }

        if(this.board.isGameOver()){
            // Send the game over message
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                paylod: {
                    winner: this.board.turn() == 'w'?'black':'white'
                }
            }))
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                paylod: {
                    winner: this.board.turn() == 'w' ? 'black' : 'white'
                }
            }))
            return
        }

    }
}
