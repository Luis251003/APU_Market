import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, ResetPass } from "./pages";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/recovery" element={<ResetPass/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;