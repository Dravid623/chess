import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

// classes needed: user, game
// until websocket is okay for ts
export class GameManager {
    private game: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.game =[]
        this.pendingUser = null;
        this.users = []
    }

    addUser(socket: WebSocket){
        this.users.push(socket)
        this.addHandler(socket)
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user != socket)
        // Stop the gmae here because the user left
    }

    private addHandler(socket: WebSocket){
        socket.on('message',(data)=>{
            const message = JSON.parse(data.toString())

            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    // start a game
                    const game = new Game(this.pendingUser, socket)
                    this.game.push(game)
                    this.pendingUser = null;
                } else{
                    this.pendingUser = socket
                }
            }

            if(message.type === MOVE ){
                console.log(message)
                const game = this.game.find(game => game.player1 === socket || game.player2 === socket)
                if(game) {
                    game.makeMove(socket, message.payload);
                }
            }
        })
    }
}