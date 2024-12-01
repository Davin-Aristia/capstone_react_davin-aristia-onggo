import 'bootstrap/dist/css/bootstrap.min.css';
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
