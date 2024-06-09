import styles from './Login.module.css';
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
    <div className={styles.container}>
      <div className={styles.illustration}>
        <img src={imagenLogin} alt="Illustration" />
      </div>
      <div className={styles['login-form']}>
        <h2>Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className={styles['input-group']}>
            <label htmlFor="email">Email :</label>
            <div className={styles['input-wrapper']}>
              <i className={styles['fas fa-user']}></i>
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
          <div className={styles['input-group']}>
            <label htmlFor="password">Password :</label>
            <div className={styles['input-wrapper']}>
              <i className={styles['fas fa-lock']}></i>
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
          <button type="submit"  className={styles['sign-in-btn']}>Sign In</button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;