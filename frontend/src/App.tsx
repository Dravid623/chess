import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Landing} from './screens/Landing.tsx'
import {Game} from './screens/Game.tsx'
function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/game' element={<Game/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
