import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}

export default App
