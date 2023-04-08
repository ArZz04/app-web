import "../css/loginForm.css";

const Register = () => (
  <div className="body">
      <section>
        <div className="login-container">
          <div className="login-box">
            <h2 className="login-heading">Registro</h2>
            <p className="login-subheading">
              Por favor, ingresa tus datos de registro:
            </p>

            <div className="form-group">
              <input
                type="email"
                id="typeEmailX"
                className="form-control"
                required
              />
              <label htmlFor="typeEmailX">Email</label>
            </div>

            <div className="form-group">
              <input
                type="password"
                id="typePasswordX"
                className="form-control"
                required
              />
              <label htmlFor="typePasswordX">Contraseña</label>
            </div>

            <button type="submit" className="btn-login">
              Ingresar
            </button>
          </div>
        </div>
      </section>
  </div>
);

export default Register;