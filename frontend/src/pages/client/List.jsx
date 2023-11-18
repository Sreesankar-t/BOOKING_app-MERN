import { useState, useEffect, useContext } from 'react'
import './list.css'
import Navbar from '../../components/client/Navbar'
import Header from '../../components/client/Header'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/client/SearchItem'
import useFetch from '../../hooks/useFetch'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import { SearchContext } from '../../context/client/SearchContext'
const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(
    location.state?.destination || ''
  )
  const [dates, setDates] = useState([])
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 })
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10) // Default to 10 items per page
  const { dispatch } = useContext(SearchContext)
  // Update state with location data when it's available
  useEffect(() => {
    if (location.state) {
      setDestination(location.state.destination || '')
      setDates(
        location.state.dates.length > 0
          ? location.state.dates
          : [
              {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection'
              }
            ]
      )
      setOptions(location.state.options || { adult: 1, children: 0, room: 1 })
    }
  }, [location.state])

  useEffect(() => {
    reFetch()
  }, [page])

  const { data, loading, reFetch } = useFetch(
    `/hotel/gethotelsSearch?city=${destination}&min=${min || 0}&max=${
      max || 9999999
    }&page=${page}&perPage=${perPage}`
  )

  const handleClick = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } })
    reFetch()
  }

  const handlePageChange = newPage => {
    setPage(newPage)
  }

  const handlePerPageChange = newPerPage => {
    setPerPage(newPerPage)
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
              <label htmlFor=''>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {dates && dates[0] && dates[0].startDate
                  ? `${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
                      dates[0].endDate || new Date(),
                      'MM/dd/yyyy'
                    )}`
                  : `${format(new Date(), 'MM/dd/yyyy')} to ${format(
                      new Date(),
                      'MM/dd/yyyy'
                    )}`}
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
                  <span className='lsOptionText'>Children</span>
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
            <div className='items-per-page'>
              Items per page:{' '}
              <select
                value={perPage}
                onChange={e => handlePerPageChange(e.target.value)}
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
              </select>
            </div>
            {loading ? (
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={5}>
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
                <LinearProgress
                  color='inherit'
                  sx={{ animation: 'blink 1s infinite' }}
                />
              </Stack>
            ) : Array.isArray(data.docs) ? (
              data.docs.map(item => <SearchItem item={item} key={item._id} />)
            ) : (
              <div style={{ backgroundColor: 'yellow' }}>
                Opps there is no hotels{' '}
              </div>
            )}

            <div className='pagination'>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                <KeyboardDoubleArrowLeftIcon />
              </button>
              <span> {page}</span>
              <button onClick={() => handlePageChange(page + 1)}>
                <KeyboardDoubleArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
