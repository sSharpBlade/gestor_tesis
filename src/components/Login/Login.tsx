import './Login.css';
import imagenLogin from '../../images/imagenVioleta.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:3000/teachers/by-email', { // Ajusta esta URL a tu endpoint real
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const result = await response.json();
      console.log('Login successful:', result);
      const userId = result.idTeacher; 
      console.log('User ID:', userId); // Imprime el id del usuario en la consola

      navigate('/dashboard',{ state: { userId } }); // Redirige al usuario al dashboard
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="illustration">
        <img src={imagenLogin} alt="Illustration" />
      </div>
      <div className="login-form">
        <h2>Sign In</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
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
        </form>
      </div>
    </div>
  );
};

export default Login;
