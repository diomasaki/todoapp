import Home from './pages/Home'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

const user = localStorage["user"]

export const app = createBrowserRouter(
            createRoutesFromElements(
      <>
        <Route exact path="/task" element={<Home/>} />
        <Route path="/task/:id" element={<Home/>} />
        <Route path="/createaccount" element={user ? <Home /> : <Register />} />
        <Route path="/signin" element={user ? <Home /> : <Login />} />
      </>
  )
)

