import { useState, useEffect } from 'react';

export default function PaymentForm() {
  const [form, setForm] = useState({ car: '', amount: '', date: '', method: '' });
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('/api/cars').then(res => res.json()).then(setCars);
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await fetch('/api/payments');
    setPayments(await res.json());
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to add payment');
      setForm({ car: '', amount: '', date: '', method: '' });
      fetchPayments();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card-custom animate__animated animate__fadeInDown">
      <h2 className="h4 fw-bold mb-4 text-primary d-flex align-items-center gap-2"><i className="bi bi-cash-coin"></i> Add Payment</h2>
      <div className="container py-4">
        <form onSubmit={handleSubmit} className="mb-4 animate__animated animate__fadeInUp">
          <div className="mb-2">
            <select name="car" value={form.car} onChange={handleChange} className="form-select mb-2">
              <option value="">Select Car</option>
              {cars.map(car => (
                <option key={car._id} value={car._id}>{car.plateNumber} - {car.DriverName}</option>
              ))}
            </select>
            <div className="input-group mb-2">
              <span className="input-group-text">$</span>
              <input name="amount" value={form.amount} onChange={handleChange} placeholder="amount" type="number" className="form-control" />
            </div>
            <input name="date" value={form.date} onChange={handleChange} placeholder="date (YYYY-MM-DD)" className="form-control mb-2" />
            <input name="method" value={form.method} onChange={handleChange} placeholder="method" className="form-control mb-2" />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button className="btn btn-primary">Add Payment</button>
        </form>
        <h3 className="h5 fw-semibold mb-3 animate__animated animate__fadeInLeft">Payments List</h3>
        <ul className="list-group animate__animated animate__fadeInUp">
          {payments.map(payment => (
            <li key={payment._id} className="list-group-item d-flex flex-column align-items-start mb-2">
              <span><b>car:</b> {payment.car} | <b>amount:</b> {payment.amount} | <b>date:</b> {payment.date?.slice(0,10)} | <b>method:</b> {payment.method}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
