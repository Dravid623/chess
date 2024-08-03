// import { Board } from "./Board"

import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const Landing = () => {
    const navigate = useNavigate()
    return (
        <div className="">
                <div className="bg-black h-screen grid place-items-center grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="order-last md:order-first bg-white">
                        <img src="/chessboard.jpeg" alt="Chessboard" className="max-w-96" />
                    </div>
                    <div className="" >
                        <div className="text-4xl font-bold text-white">
                            Play chess Online on the #2 Site!
                        </div>
                        <div className="mt-4 flex justify-center">
                        <Button onClick={() => { navigate("./game") }}>
                            Play Online
                        </Button>
                        </div>
                        <div className="mt-4 flex justify-center">
                        <Button onClick={() => { navigate("./game") }}>
                            Play Coumpter
                        </Button>
                        </div>
                    </div>
                </div>
        </div>
    )
}
