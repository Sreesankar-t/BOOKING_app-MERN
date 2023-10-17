import './hotelDetails.css'
import Navbar from '../../components/client/Navbar'
import Header from '../../components/client/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import HashLoader from 'react-spinners/HashLoader'
import { SearchContext } from '../../context/client/SearchContext'

const HotelDetails = () => {
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  console.log(id)

  const { data, loading } = useFetch(`/hotel/getSingleHotel/${id}`)

  const { dates, options } = useContext(SearchContext)
  console.log(dates)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function daydiffrence (date1, date2) {
    const timeDiff = Math.abs(date1.getTime() - date2.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }
  const days =
    dates[0]?.endDate && dates[0]?.startDate
      ? daydiffrence(dates[0].endDate, dates[0].startDate)
      : 0

  const handleOpen = i => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = direction => {
    let newSlideNumber

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      {loading ? (
        <div className='hotel-loader-conatainer'>
          <HashLoader
            color='#36d7b7'
            loading={loading}
            size={50}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <>
          <div className='hotelContainer'>
            {open && (
              <div className='slider'>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className='close'
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className='arrow'
                  onClick={() => handleMove('l')}
                />
                <div className='sliderWrapper'>
                  <img
                    src={data.photos[slideNumber]}
                    alt=''
                    className='sliderImg'
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className='arrow'
                  onClick={() => handleMove('r')}
                />
              </div>
            )}
            <div className='hotelWrapper'>
              {/* <button className='bookNow'>Reserve or Book Now!</button> */}
              <h1 className='hotelTitle'>{data.name}</h1>
              <span className='hotelPriceHighlight'>{data.type}</span>
              <span className='hotelPriceHighlight'>{data.city}</span>
              <div className='hotelAddress'>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className='hotelDistance'>
                {}
                Excellent location – {data.distance} km from City center
              </span>

              <div className='hotelImages'>
                {data.photos?.map((photo, i) => (
                  <div className='hotelImgWrapper' key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=''
                      className='hotelImg'
                    />
                  </div>
                ))}
              </div>
              <div className='hotelDetails'>
                <div className='hotelDetailsTexts'>
                  <h1 className='hotelTitle'>{data.title}</h1>
                  <p className='hotelDesc'>{data.desc}</p>
                </div>

                <div className='hotelDetailsPrice'>
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>{data.title}</span>
                  <h2>
                    <b>{days * data.cheapestPrice * options.room}</b> ({days}{' '}
                    nights)
                  </h2>
                  <button>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <div style={{ height: '70px' }}></div>
          </div>
        </>
      )}
    </div>
  )
}

export default HotelDetails
