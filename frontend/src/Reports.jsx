import { useState, useEffect } from 'react';

export default function Reports() {
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [payments, setPayments] = useState([]);
  const [servicePackages, setServicePackages] = useState([]);

  useEffect(() => {
    fetch('/api/cars').then(res => res.json()).then(setCars);
    fetch('/api/packages').then(res => res.json()).then(setPackages);
    fetch('/api/payments').then(res => res.json()).then(setPayments);
    fetch('/api/servicepackages').then(res => res.json()).then(setServicePackages);
  }, []);


  const carMap = Object.fromEntries(cars.map(car => [car._id, car]));
  const packageMap = Object.fromEntries(packages.map(pkg => [pkg._id, pkg]));

  return (
    <div className="card-custom animate__animated animate__fadeInDown">
      <h2 className="h4 fw-bold mb-4 text-primary d-flex align-items-center gap-2"><i className="bi bi-bar-chart-line"></i> Reports</h2>
      <div className="container py-4">
        <div className="mb-4 animate__animated animate__fadeInUp">
          <h3 className="fw-semibold">Cars</h3>
          <ul className="list-group mb-3">
            {cars.map(car => <li key={car._id} className="list-group-item">{car.plateNumber} - {car.owner} - {car.model}</li>)}
          </ul>
        </div>
        <div className="mb-4 animate__animated animate__fadeInUp">
          <h3 className="fw-semibold">Packages</h3>
          <ul className="list-group mb-3">
            {packages.map(pkg => <li key={pkg._id} className="list-group-item">{pkg.packageNumber} - {pkg.packageName} - {pkg.packagePrice}</li>)}
          </ul>
        </div>
        <div className="mb-4 animate__animated animate__fadeInUp">
          <h3 className="fw-semibold">Payments</h3>
          <ul className="list-group mb-3">
            {payments.map(payment => (
              <li key={payment._id} className="list-group-item">
                Car: {carMap[payment.car]?.plateNumber || payment.car} - Amount: {payment.amount} - Date: {payment.date?.slice(0,10)}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4 animate__animated animate__fadeInUp">
          <h3 className="fw-semibold">Service Packages</h3>
          <ul className="list-group mb-3">
            {servicePackages.map(sp => (
              <li key={sp._id} className="list-group-item">
                Car: {carMap[sp.car]?.plateNumber || sp.car} - Package: {packageMap[sp.package]?.packageName || sp.package} - Status: {sp.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
