import { useRef, useState, useEffect } from "react";
import '../css/loginForm.css'
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";


import axios from "../../api/axios";
const LOGIN_URL = "/login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrorMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPwd("");


    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    try {
      const response = await axios.post(LOGIN_URL, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      });

      const accessToken = response?.data?.access_token;
      const role = response?.data?.role;

      setAuth({ username, role, accessToken });
      
      setUser("");
      setPwd("");
      navigate(from, { replace: true});
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMsg("Usuario o Contrasena Incorrecto");
      } else if (err.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };


  return (
    <>
        <div className="body">
          
          <section>
            <div className="login-container">
              <form className="login-box" onSubmit={handleSubmit}>
                <h2 className="login-heading">Iniciar sesión</h2>
                <p className="login-subheading">
                  Por favor, ingresa tus datos de inicio de sesión:
                </p>

                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>

                <div className="form-group">
                  <input
                    type="text"
                    id="typeEmailX"
                    className="form-control"
                    ref={userRef}
                    autoComplete="off"
                    autoCapitalize="none"
                    onChange={(e) => setUser(e.target.value.toLowerCase())}
                    value={username}
                    required
                  />
                  <label htmlFor="typeEmailX">Usuario</label>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    id="typePasswordX"
                    className="form-control"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                  />
                  <label htmlFor="typePasswordX">Contraseña</label>
                </div>

                <button type="submit" className="btn-login">
                  Ingresar
                </button>
              </form>
            </div>
          </section>
        </div>
    </>
  );
};

export default Login;
