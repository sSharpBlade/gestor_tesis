
export const handleLogin = async (
  email: string,
  password: string,
  setError: (error: string | null) => void,
  navigate: (path: string) => void
): Promise<boolean> => {  // <-- Añadimos Promise<boolean> aquí
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
    localStorage.setItem('teacherID', userId);
    navigate('/dashboard'); // Redirige al usuario al dashboard
    return true;  // <-- Devuelve true si el inicio de sesión es exitoso
  } catch (error) {
    setError('Invalid email or password');
    //console.error('Error:', error);
    return false;  // <-- Devuelve false si el inicio de sesión falla
  }
};
