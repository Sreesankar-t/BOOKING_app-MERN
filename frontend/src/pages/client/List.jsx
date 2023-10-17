import './list.css'
import Navbar from '../../components/client/Navbar'
import Header from '../../components/client/Header'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/client/SearchItem'
import useFetch from '../../hooks/useFetch'
import SyncLoader from 'react-spinners/SyncLoader'



const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState('')
  const [dates, setDates] = useState([])
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 })
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)



  // Update state with location data when it's available
  useEffect(() => {
    if (location.state) {
      setDestination(location.state.destination || '')
      setDates(location.state.dates || [])
      setOptions(location.state.options || { adult: 1, children: 0, room: 1 })
    }
  }, [location.state])

  const { data, loading, reFetch } = useFetch(
    `/hotel/gethotelsSearch?city=${destination}&min=${min || 0}&max=${
      max || 9999999
    }`
  )

  const handleClick = () => {
    reFetch()
  }



  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label htmlFor=''>Destination</label>
              <input
                onChange={e => setDestination(e.target.value)}
                placeholder={destination}
                type='text'
              />
            </div>
            <div className='lsItem'>
              <label htmlFor=''>Chech-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {dates && dates[0] && dates[0].startDate
                  ? `${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
                      dates[0].endDate || new Date(),
                      'MM/dd/yyyy'
                    )}`
                  : 'Select date'}
              </span>
              {openDate && (
                <DateRange
                  onChange={item => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className='lsItem'>
              <label htmlFor=''>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Min price <small>(per night)</small>
                  </span>
                  <input
                    type='number'
                    onChange={e => setMin(e.target.value)}
                    className='lsOptionInput'
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Max price <small>(per night)</small>
                  </span>
                  <input
                    type='number'
                    onChange={e => setMax(e.target.value)}
                    className='lsOptionInput'
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Adult</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    placeholder={options.adult}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Childdren</span>
                  <input
                    type='number'
                    min={0}
                    className='lsOptionInput'
                    placeholder={options.children}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Room</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className='listResult'>
            {loading ? (
              <SyncLoader
                color='#36d7b7'
                loading={loading}
                size={10}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            ) : (
              data.map(item => <SearchItem item={item} key={item._id} />)
            )}



          </div>
         
        </div>
      </div>
    </div>
  )
}

export default List
