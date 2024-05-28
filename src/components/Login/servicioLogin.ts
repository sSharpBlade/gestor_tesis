// src/services/authService.ts
export const handleLogin = async (
    email: string,
    password: string,
    setError: (error: string | null) => void,
    navigate: (path: string) => void
  ) => {
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:3000/teachers/by-email', {
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
      const { id_teacher } = result;
      localStorage.setItem('teacherID', id_teacher); // Almacena el teacherID en localStorage
      navigate('/dashboard'); // Redirige al usuario al dashboard
      console.log(id_teacher);
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error:', error);
    }
  };
  