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
import { useContext, useState, useEffect } from 'react' // Added useEffect
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import HashLoader from 'react-spinners/HashLoader'
import { SearchContext } from '../../context/client/SearchContext'
import Booking from '../../components/client/Booking'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import Modal from 'react-modal'
import { bookingModalStyles } from '../../ModelStyle'

const HotelDetails = () => {
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)

  const [openModal, setOpenModel] = useState(false)

  const [dates1, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const location = useLocation()

  const id = location.pathname.split('/')[2]

  const { data, loading } = useFetch(`/hotel/getSingleHotel/${id}`)

  const { dates, options, dispatch } = useContext(SearchContext)

  const [parsedDates, setParsedDates] = useState([]) // Store parsed dates

  useEffect(() => {
    if (dates && dates[0] && dates[0].startDate && dates[0].endDate) {
      // Convert date strings to Date objects when dates are available
      setParsedDates([
        {
          startDate: new Date(dates[0].startDate),
          endDate: new Date(dates[0].endDate),
          key: 'selection'
        }
      ])
    }
  }, [dates])

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function daydiffrence (date1, date2) {
    if (date1 instanceof Date && date2 instanceof Date) {
      const timeDiff = Math.abs(date1.getTime() - date2.getTime())
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
      return diffDays
    } else {
      return 0
    }
  }

  const days = daydiffrence(parsedDates[0]?.endDate, parsedDates[0]?.startDate)

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

  const handleClick = () => {
    setOpenModel(true)
  }

  const handleDate = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSelection = () => {
    const selectedDates = [
      {
        startDate: dates1[0].startDate,
        endDate: dates1[0].endDate,
        key: 'selection'
      }
    ]

    const selectedOptions = options

    const selectedData = {
      dates: selectedDates,
      options: selectedOptions
    }

    dispatch({ type: 'NEW_SEARCH', payload: { ...selectedData } })

    setIsOpen(false)
    setOpenModel(true)
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

                {days !== 0 ? (
                  <div className='hotelDetailsPrice'>
                    <h1>Perfect for a {days}-night stay!</h1>
                    <span>{data.title}</span>
                    <h2>
                      <b>₹ {days * data.cheapestPrice * options.room}</b> (
                      {days} nights)
                    </h2>
                    <div className='btnContDiv'>
                      <button className='bookingBtn' onClick={handleClick}>
                        Reserve or Book Now!
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='hotelDetailsPrice'>
                    <span>{data.title}</span>
                    <div className='btnContDiv'>
                      <button className='bookingBtn' onClick={handleDate}>
                        Reserve or Book Now!
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ height: '70px' }}></div>
          </div>
        </>
      )}

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={bookingModalStyles}
          contentLabel='Edit Profile Modal'
        >
          <div className='headerSearchItem'>
            <div style={{ marginBottom: '30px' }}>
              <h3>Select Your Dates</h3>
            </div>

            <span
              style={{ marginBottom: '1px' }}
              // onClick={() => setOpenDate(!openDate)}
              className='headerSearchText'
            >
              {`${format(dates1[0].startDate, 'MM/dd/yyyy')} to ${format(
                dates1[0].endDate,
                'MM/dd/yyyy'
              )}`}
            </span>

            <DateRange
              editableDateInputs={true}
              onChange={item => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates1}
              className='date'
              minDate={new Date()}
            />
          </div>
          <div className='CBookingButtonT'>
            <button onClick={handleSelection} className='BookingButtonT'>
              Select
            </button>
          </div>
        </Modal>
      </div>

      {openModal && <Booking setOpen={setOpenModel} hotelId={id} />}
    </div>
  )
}

export default HotelDetails
