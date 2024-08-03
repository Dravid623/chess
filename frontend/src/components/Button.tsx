

export const Button = ({onClick, children}:{onClick:()=>void, children:React.ReactNode})=>{
    return(
        <div>
            <button onClick={()=> onClick()} className="bg-green-400 rounded p-2 text-2xl hover:bg-green-500 font-bold text-white">
                {children}
            </button>
        </div>
    )
}