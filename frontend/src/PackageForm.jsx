import { useState, useEffect } from 'react';

export default function PackageForm() {
  const [form, setForm] = useState({ packageNumber: '', packageName: '', PackageDiscription: '', packagePrice: '' });
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');

  const fetchPackages = async () => {
    const res = await fetch('/api/packages');
    setPackages(await res.json());
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to add package');
      setForm({ packageNumber: '', packageName: '', PackageDiscription: '', packagePrice: '' });
      fetchPackages();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card-custom animate__animated animate__fadeInDown">
      <h2 className="h4 fw-bold mb-4 text-primary d-flex align-items-center gap-2"><i className="bi bi-box-seam"></i> Add Package</h2>
      <div className="container py-4">
        <form onSubmit={handleSubmit} className="mb-4 animate__animated animate__fadeInUp">
          <div className="mb-2">
            <input name="packageNumber" value={form.packageNumber} onChange={handleChange} placeholder="packageNumber" className="form-control mb-2" />
            <input name="packageName" value={form.packageName} onChange={handleChange} placeholder="packageName" className="form-control mb-2" />
            <input name="PackageDiscription" value={form.PackageDiscription} onChange={handleChange} placeholder="PackageDiscription" className="form-control mb-2" />
            <input name="packagePrice" value={form.packagePrice} onChange={handleChange} placeholder="packagePrice" type="number" className="form-control mb-2" />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button className="btn btn-primary">Add Package</button>
        </form>
        <h3 className="h5 fw-semibold mb-3 animate__animated animate__fadeInLeft">Packages List</h3>
        <ul className="list-group animate__animated animate__fadeInUp">
          {packages.map(pkg => (
            <li key={pkg._id} className="list-group-item mb-2">
              <span><b>packageNumber:</b> {pkg.packageNumber} | <b>packageName:</b> {pkg.packageName} | <b>PackageDiscription:</b> {pkg.PackageDiscription} | <b>packagePrice:</b> {pkg.packagePrice}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
