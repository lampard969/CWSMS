import { useState } from 'react';

export default function AuthIndex({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username && form.password) {
      setError('');
      onAuthSuccess && onAuthSuccess();
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 animate__animated animate__fadeInDown" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="bg-white p-4 rounded shadow w-100 animate__animated animate__zoomIn" style={{ maxWidth: 400 }}>
        <div className="text-center mb-2">
          <i className="bi bi-car-front-fill text-primary" style={{ fontSize: 40 }}></i>
        </div>
        <h1 className="h5 fw-bold mb-3 text-center text-primary animate__animated animate__fadeInLeft" style={{ letterSpacing: 1 }}>
          Welcome to Smart park |Car Wash Sales Management System
        </h1>
        <h2 className="h4 fw-bold mb-4 text-center text-primary animate__animated animate__fadeInRight">
          <i className={`bi ${isLogin ? 'bi-box-arrow-in-right' : 'bi-person-plus'} me-2`}></i>
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="bi bi-person" /></span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text"><i className="bi bi-lock" /></span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            <i className={`bi ${isLogin ? 'bi-box-arrow-in-right' : 'bi-person-plus'} me-2`}></i>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="text-center">
          <button
            className="btn btn-link p-0"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
          >
            <i className={`bi ${isLogin ? 'bi-person-plus' : 'bi-box-arrow-in-right'} me-1`}></i>
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-2 w-100 mt-3 animate__animated animate__fadeInUp">
        <div>CWSMS &copy; {new Date().getFullYear()} Hakizimana Lampard. All rights reserved.</div>
        <div>Email: hakizimanalampard8@gmail.com | Smartpark Car Wash, Rwanda</div>
      </footer>
    </div>
  );
}
