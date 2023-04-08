import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/homePage";
import Login from "./components/pages/loginForm";
import Register from "./components/pages/registerForm";
import Users from "./components/pages/usersPage";

import Navigation from "./components/navBar";
import RequireAuth from "./components/requireAuth";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={["admin", "command"]} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
