import Home from './pages/Home'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route
} from "react-router-dom";
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

const user = localStorage["user"]

export const app = createBrowserRouter(
            createRoutesFromElements(
      <>
        <Route exact path="/" element={ user ? <Home/> : <Navigate to="/signin" />} />
        <Route path="/createaccount" element={user ? <Home /> : <Register />} />
        <Route path="/signin" element={user ? <Home /> : <Login />} />
      </>
  )
)

