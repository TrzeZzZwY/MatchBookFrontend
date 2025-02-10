import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestService from '@/common/RequestService';
import TokenService from '@/common/TokenService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await RequestService.post(
        'account',
        '/api/Admin/Login',
        { email, password },
      );

      if (response.status === 201) {
        await TokenService.setTokens(
          response.data.token,
          response.data.refreshToken,
        );
        navigate('/admin-panel');
      }
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="mb-4 block w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 block w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
