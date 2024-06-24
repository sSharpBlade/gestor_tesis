import styles from './Login.module.css';
import imagenLogin from '../../images/imagenVioleta.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from './servicioLogin';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [blockMessage, setBlockMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAttempts = localStorage.getItem(`loginAttempts_${email}`);
    const blockUntil = localStorage.getItem(`blockUntil_${email}`);

    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts));
    }

    if (blockUntil) {
      const blockUntilTime = new Date(blockUntil).getTime();
      const currentTime = new Date().getTime();

      if (blockUntilTime > currentTime) {
        setIsBlocked(true);
        const remainingTime = Math.ceil((blockUntilTime - currentTime) / 1000);
        setBlockMessage(`Please try again in ${remainingTime} seconds.`);
        const interval = setInterval(() => {
          const newRemainingTime = Math.ceil((blockUntilTime - new Date().getTime()) / 1000);
          if (newRemainingTime > 0) {
            setBlockMessage(`Please try again in ${newRemainingTime} seconds.`);
          } else {
            setIsBlocked(false);
            setBlockMessage(null);
            localStorage.removeItem(`blockUntil_${email}`);
            localStorage.setItem(`loginAttempts_${email}`, '0');
            clearInterval(interval);
          }
        }, 1000);
      } else {
        localStorage.removeItem(`blockUntil_${email}`);
      }
    }
  }, [email]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBlocked) {
      setError('Too many attempts. Please try again later.');
      return;
    }

    const success = await handleLogin(email, password, setError, navigate);
    if (!success) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem(`loginAttempts_${email}`, newAttempts.toString());

      if (newAttempts >= 3) {
        const blockDuration = 1 * 60 * 1000; // 1 minute
        const blockUntilTime = new Date(new Date().getTime() + blockDuration);
        localStorage.setItem(`blockUntil_${email}`, blockUntilTime.toISOString());
        setIsBlocked(true);
        setBlockMessage(`Too many attempts. Please try again in 60 seconds.`);
        const interval = setInterval(() => {
          const newRemainingTime = Math.ceil((blockUntilTime.getTime() - new Date().getTime()) / 1000);
          if (newRemainingTime > 0) {
            setBlockMessage(`Too many attempts. Please try again in ${newRemainingTime} seconds.`);
          } else {
            setIsBlocked(false);
            setBlockMessage(null);
            localStorage.removeItem(`blockUntil_${email}`);
            localStorage.setItem(`loginAttempts_${email}`, '0');
            clearInterval(interval);
          }
        }, 1000);
      }
    } else {
      localStorage.setItem(`loginAttempts_${email}`, '0');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.illustration}>
        <img src={imagenLogin} alt="Illustration" />
      </div>
      <div className={styles['login-form']}>
        <h2>Sign In</h2>
        <div className={styles.formWrapper}>
          <form onSubmit={onSubmit}>
            <div className={styles['input-group']}>
              <label htmlFor="email">Email :</label>
              <div className={styles['input-wrapper']}>
                <i className={`${styles.icon} ${styles['fas fa-user']}`}></i>
                <input
                  type="text"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError(null);
                    setAttempts(0); // Reset attempts if user changes email
                  }}
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
                <i className={`${styles.icon} ${styles['fas fa-lock']}`}></i>
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
            <button type="submit" className={styles['sign-in-btn']} disabled={isBlocked}>Sign In</button>
            {error && <div className={styles['error-message']}>{error}</div>}
            {blockMessage && <div className={styles['block-message']}>{blockMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
