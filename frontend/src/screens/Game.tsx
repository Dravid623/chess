
import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Chessboard } from "../components/Chessboard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js"

export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess())
  const [board, setBoard]=useState(chess.board())
  

  useEffect(() => {
    if(!socket){return}
    socket.onmessage = (event)=>{
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type){
        case INIT_GAME:
          // setChess(new Chess())
          setBoard(chess.board())
          console.log("game initialized")
          break
        case MOVE:
          const move = message.payload;
          console.log('inside the move event')
          console.log(chess.move)
          chess.move(move)
          setBoard(chess.board())
          console.log("move done")
          break
        case GAME_OVER:
          console.log("game over")
      }
    }
  }, [socket])

  if (!socket) return <div>connecting...</div>
  
  return (
    <div className="flex justify-center">
      <div className="pt-8 grid grid-cols-6 gap-8">
        <div className="col-span-4">
          <Chessboard board={board} socket={socket}/>
        </div>
        <div className="col-span-2 bg-green-200 ">
          <div className="flex justify-center mt-4">
            <Button onClick={() => {
              socket.send(JSON.stringify({
                type: INIT_GAME,
              }))
            }}>
              Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
