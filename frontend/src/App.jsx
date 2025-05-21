import { useState } from 'react';
import AuthIndex from './AuthIndex';
import CarForm from './CarForm';
import PackageForm from './PackageForm';
import PaymentForm from './PaymentForm';
import ServicePackageForm from './ServicePackageForm';
import Reports from './Reports';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeMenu, setActiveMenu] = useState('car');

  const menuItems = [
    { key: 'car', label: 'Car', icon: 'bi-car-front-fill' },
    { key: 'packages', label: 'Packages', icon: 'bi-box-seam' },
    { key: 'servicepackage', label: 'Service Package', icon: 'bi-gear-wide-connected' },
    { key: 'payment', label: 'Payment', icon: 'bi-cash-coin' },
    { key: 'reports', label: 'Reports', icon: 'bi-bar-chart-line' },
  ];

  const handleMenuClick = (key) => {
    setActiveMenu(key);
    toast.info(`Navigated to ${menuItems.find(m => m.key === key).label}`);
  };

  if (!authenticated) {
    return <AuthIndex onAuthSuccess={() => {
      setAuthenticated(true);
      toast.success('Login successful!');
    }} />;
  }

  let content;
  if (activeMenu === 'car') content = <CarForm toast={toast} />;
  else if (activeMenu === 'packages') content = <PackageForm toast={toast} />;
  else if (activeMenu === 'payment') content = <PaymentForm toast={toast} />;
  else if (activeMenu === 'servicepackage') content = <ServicePackageForm toast={toast} />;
  else if (activeMenu === 'reports') content = <Reports />;

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <nav className="navbar navbar-expand-lg navbar-custom shadow-sm px-4 py-3 mb-4 sticky-top">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-droplet-half fs-3 text-info"></i> CWSMS
          </span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-2">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.key}>
                <button
                  className={`btn btn-primary d-flex align-items-center gap-1 ${activeMenu === item.key ? 'active' : 'btn-outline-primary'}`}
                  onClick={() => handleMenuClick(item.key)}
                >
                  <i className={`bi ${item.icon}`}></i> {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-danger ms-auto d-flex align-items-center gap-1"
            onClick={() => { setAuthenticated(false); toast.info('Logged out.'); }}
          >
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </nav>
      <div className="container-fluid d-flex flex-row flex-grow-1">
        {/* Sidebar for large screens */}
        <aside className="d-none d-lg-block bg-white shadow-sm p-3 me-4 rounded-3" style={{ minWidth: 220, marginTop: 20, height: 'fit-content' }}>
          <ul className="nav flex-column gap-2">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.key}>
                <button
                  className={`btn btn-outline-primary w-100 d-flex align-items-center gap-2 ${activeMenu === item.key ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item.key)}
                >
                  <i className={`bi ${item.icon}`}></i> {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-4 w-100">
          <div className="card-custom w-100" style={{ maxWidth: 700 }}>
            {content}
          </div>
        </main>
      </div>
      <footer className="footer-custom text-center py-3 animate__animated animate__fadeInUp">
        <div>CWSMS &copy; {new Date().getFullYear()} Hakizimana Lampard. All rights reserved.</div>
        <div>Email: hakizimanalampard8@gmail.com | Smartpark Car Wash, Rwanda</div>
      </footer>
      <ToastContainer className="toast-container" position="top-right" autoClose={2500} hideProgressBar newestOnTop closeOnClick pauseOnHover />
    </div>
  );
}

export default App;
