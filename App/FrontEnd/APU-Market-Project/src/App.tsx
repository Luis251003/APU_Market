import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, ResetPass } from "./pages";
import { Toaster } from "sonner";
import MEmpleado from "./pages/Mantenimiento/Empleado/MEmpleado";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainLayout from "./components/MainLayout/MainLayout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App(){
  return(
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login/>}></Route>
          <Route path="/recovery" element={<ResetPass/>}></Route>
          {/* Rutas privadas */}
          <Route element={<PrivateRoute><MainLayout/></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/mantenimiento/empleado" element={<MEmpleado/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;