import './hotelhome.css';
import HotelSidebar from '../../components/hotel/hotelSidebar';
import { ToastContainer, toast, } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function HotelHome() {
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    // Check if the toast has already been shown
    const hasToastBeenShown = localStorage.getItem('toastShown');

    if (!hasToastBeenShown && !hasShownToast) {
      toast.success('approved success you can access your page', {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

      localStorage.setItem('toastShown', 'true');

  
      setHasShownToast(true);
    }
  }, [hasShownToast]);

  return (
    <div className='hhome'>
      <HotelSidebar />
      <div className="hhomeContainer">
        <h1>Welcome to the hotel page</h1>
        <ToastContainer />
      </div>
    </div>
  );
}
