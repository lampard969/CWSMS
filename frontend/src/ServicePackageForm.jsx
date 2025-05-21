import { useState, useEffect } from 'react';

export default function ServicePackageForm() {
  const [form, setForm] = useState({ car: '', package: '', startDate: '', endDate: '', status: 'active' });
  const [servicePackages, setServicePackages] = useState([]);
  const [error, setError] = useState('');
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch('/api/cars').then(res => res.json()).then(setCars);
    fetch('/api/packages').then(res => res.json()).then(setPackages);
    fetchServicePackages();
  }, []);

  const fetchServicePackages = async () => {
    const res = await fetch('/api/servicepackages');
    setServicePackages(await res.json());
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/servicepackages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to add service package');
      setForm({ car: '', package: '', startDate: '', endDate: '', status: 'active' });
      fetchServicePackages();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card-custom animate__animated animate__fadeInDown">
      <h2 className="h4 fw-bold mb-4 text-primary d-flex align-items-center gap-2"><i className="bi bi-gear-wide-connected"></i> Add Service Package</h2>
      <div className="container py-4">
        <form onSubmit={handleSubmit} className="mb-4 animate__animated animate__fadeInUp">
          <div className="mb-2">
            <select name="car" value={form.car} onChange={handleChange} className="form-select mb-2">
              <option value="">Select Car</option>
              {cars.map(car => (
                <option key={car._id} value={car._id}>{car.plateNumber} - {car.DriverName}</option>
              ))}
            </select>
            <select name="package" value={form.package} onChange={handleChange} className="form-select mb-2">
              <option value="">Select Package</option>
              {packages.map(pkg => (
                <option key={pkg._id} value={pkg._id}>{pkg.packageName}</option>
              ))}
            </select>
            <input name="startDate" value={form.startDate} onChange={handleChange} placeholder="startDate" className="form-control mb-2" />
            <input name="endDate" value={form.endDate} onChange={handleChange} placeholder="endDate" className="form-control mb-2" />
            <select name="status" value={form.status} onChange={handleChange} className="form-select mb-2">
              <option value="active">active</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button className="btn btn-primary">Add Service Package</button>
        </form>
        <h3 className="h5 fw-semibold mb-3 animate__animated animate__fadeInLeft">Service Packages List</h3>
        <ul className="list-group animate__animated animate__fadeInUp">
          {servicePackages.map(sp => (
            <li key={sp._id} className="list-group-item mb-2">
              <span><b>car:</b> {sp.car} | <b>package:</b> {sp.package} | <b>startDate:</b> {sp.startDate?.slice(0,10)} | <b>endDate:</b> {sp.endDate?.slice(0,10)} | <b>status:</b> {sp.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
