import { Route, Routes } from "react-router-dom"
import Moviedetails from "../components/moviedetails/Moviedetails"
import App from "../App"

function UserRouter() {
  return (
    <Routes>
         <Route element={<App />} path="/" />
         <Route element={<Moviedetails />} path="/detail/:id" />
    </Routes>
  )
}

export default UserRouter