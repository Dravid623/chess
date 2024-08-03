import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const Chessboard = ({ board, socket }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket
}) => {
    const [from, setFrom] = useState<Square | null>(null);

    const handleSquareClick = (squareRepresentation: Square) => {
        if (!from) {
            setFrom(squareRepresentation);
        } else {
            const to = squareRepresentation;
            socket.send(JSON.stringify({
                type: MOVE,
                payload: { 
                    from,
                    to
                }
            }));
            console.log({
                from: from,
                to: to
            })
            setFrom(null);  // Reset the 'from' square after sending the move
        }
    };

    return (
        <div className="text-white-200">
            {board.map((row, i) => (
                <div key={i} className="flex">
                    {row.map((square, j) => {
                        const squareRepresentation = String.fromCharCode(97 + (j % 8)) + (8 - i) as Square;
                        return (
                            <div
                                onClick={() => handleSquareClick(squareRepresentation)}
                                key={j}
                                className={`w-16 h-16 ${(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-green-200'}`}
                            >
                                <div className="w-full h-full justify-center flex">
                                    <div className="h-full justify-center flex flex-col text-red">
                                        {square?.color === 'b' ? square?.type : square?.type?.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
