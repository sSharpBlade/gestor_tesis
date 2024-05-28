import './Login.css';
import imagenLogin from '../../images/imagenVioleta.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';// Asegúrate de ajustar la ruta de importación según tu estructura de carpetas
import { handleLogin } from './servicioLogin';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      await handleLogin(email, password, setError, navigate);
  };

  return (
    <div className="container">
      <div className="illustration">
        <img src={imagenLogin} alt="Illustration" />
      </div>
      <div className="login-form">
        <h2>Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email :</label>
            <div className="input-wrapper">
              <i className="fas fa-user"></i>
              <input
                type="text"
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password :</label>
            <div className="input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button type="submit" className="sign-in-btn">Sign In</button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;