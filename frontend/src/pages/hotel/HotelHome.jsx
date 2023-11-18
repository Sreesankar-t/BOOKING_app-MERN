import './hotelhome.css'
import HotelSidebar from '../../components/hotel/hotelSidebar'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Chart from '../../components/admin/Chart'
import Featured from '../../components/admin/FeaturedAdmin'

import Widget from '../../components/admin/Widget'
export default function HotelHome () {
  const [hasShownToast, setHasShownToast] = useState(false)

  useEffect(() => {
    const hasToastBeenShown = localStorage.getItem('toastShown')

    if (!hasToastBeenShown && !hasShownToast) {
      toast.success('approved success you can access your page', {
        position: 'top-center',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })

      localStorage.setItem('toastShown', 'true')

      setHasShownToast(true)
    }
  }, [hasShownToast])

  return (
    <div className='Hhome'>
      <div className='Hsidebar'>
        <HotelSidebar />
      </div>

      <div className='HhomeContainer'>
        <div className='Wwrapper'>
          <div className='Hwidgets'>
            <Widget />
          </div>
        </div>

        <div className='Hcharts'>
          <Featured />
          <Chart />
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}
