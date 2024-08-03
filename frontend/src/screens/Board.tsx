import React from 'react';

// Define the square function
const square = () => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    const chessboardSquares = [];

    for (let rank of ranks) {
        for (let file of files) {
            chessboardSquares.push(`${file}${rank}`);
        }
    }

    return (
        chessboardSquares.map(square => (
            <div key={square} className="w-12 h-12 border flex items-center justify-center bg-gray-200 border-solid border-1 border-zinc-950 rounded transition ease-in-out hover:-translate-y-1 ">
                {square}
            </div>
        ))
    );
}

// Define the Board component
export const Board: React.FC = () => {
    return (
        <div className="grid place-items-center grid-cols-8 gap-1">
            {square()}
        </div>
    );
}
