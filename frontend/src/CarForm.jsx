import { useState, useEffect } from 'react';

export default function CarForm() {
  const [form, setForm] = useState({ plateNumber: '', carType: '', carSize: '', DriverName: '', phoneNumber: '' });
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ plateNumber: '', carType: '', carSize: '', DriverName: '', phoneNumber: '' });

  const fetchCars = async () => {
    const res = await fetch('/api/cars');
    setCars(await res.json());
  };

  useEffect(() => { fetchCars(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to add car');
      setForm({ plateNumber: '', carType: '', carSize: '', DriverName: '', phoneNumber: '' });
      fetchCars();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/cars/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete car');
      fetchCars();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (car) => {
    setEditId(car._id);
    setEditForm({
      plateNumber: car.plateNumber,
      carType: car.carType,
      carSize: car.carSize,
      DriverName: car.DriverName,
      phoneNumber: car.phoneNumber
    });
  };

  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/cars/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (!res.ok) throw new Error('Failed to update car');
      setEditId(null);
      fetchCars();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card-custom animate__animated animate__fadeInDown">
      <h2 className="h4 fw-bold mb-4 text-primary d-flex align-items-center gap-2"><i className="bi bi-car-front-fill"></i> Add Car</h2>
      <div className="container py-4">
        <form onSubmit={handleSubmit} className="mb-4 animate__animated animate__fadeInUp">
          <div className="mb-2">
            <input name="plateNumber" value={form.plateNumber} onChange={handleChange} placeholder="plateNumber" className="form-control mb-2" />
            <input name="carType" value={form.carType} onChange={handleChange} placeholder="carType" className="form-control mb-2" />
            <input name="carSize" value={form.carSize} onChange={handleChange} placeholder="carSize" className="form-control mb-2" />
            <input name="DriverName" value={form.DriverName} onChange={handleChange} placeholder="DriverName" className="form-control mb-2" />
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="phoneNumber" className="form-control mb-2" />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button className="btn btn-primary">Add Car</button>
        </form>
        <h3 className="h5 fw-semibold mb-3 animate__animated animate__fadeInLeft">Cars List</h3>
        <ul className="list-group animate__animated animate__fadeInUp">
          {cars.map(car => (
            <li key={car._id} className="list-group-item d-flex flex-column align-items-start mb-2">
              {editId === car._id ? (
                <form onSubmit={handleUpdate} className="w-100">
                  <input name="plateNumber" value={editForm.plateNumber} onChange={handleEditChange} placeholder="plateNumber" className="form-control mb-2" />
                  <input name="carType" value={editForm.carType} onChange={handleEditChange} placeholder="carType" className="form-control mb-2" />
                  <input name="carSize" value={editForm.carSize} onChange={handleEditChange} placeholder="carSize" className="form-control mb-2" />
                  <input name="DriverName" value={editForm.DriverName} onChange={handleEditChange} placeholder="DriverName" className="form-control mb-2" />
                  <input name="phoneNumber" value={editForm.phoneNumber} onChange={handleEditChange} placeholder="phoneNumber" className="form-control mb-2" />
                  <div className="d-flex gap-2 mt-2">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <span><b>Plate Number:</b> {car.plateNumber} | <b>Car Type:</b> {car.carType} | <b>Car Size:</b> {car.carSize} | <b>Driver Name:</b> {car.DriverName} | <b>Phone Number:</b> {car.phoneNumber}</span>
                  <div className="d-flex gap-2 mt-1">
                    <button className="btn btn-warning text-white" onClick={() => startEdit(car)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(car._id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
