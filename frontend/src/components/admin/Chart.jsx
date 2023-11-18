import './chart.css'
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { HotelAuthContext } from '../../context/hotel/HotelContext'
import axios from 'axios'

const Chart = () => {
  const [data, setData] = useState([])
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const { hotel } = useContext(HotelAuthContext)
  const hotelId = hotel._id

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (path === 'admin') {
          const result = await axios.get('/admin/getTotalRoomPriceByMonth')
          setData(result.data)
        } else {
          const result = await axios.get(
            `/hotel/getTotalRoomPriceByMonth/${hotelId}`
          )
          setData(result.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [path, hotelId])

  return (
    <div className='chart'>
      <div className='title'>booking amount month base</div>
      <ResponsiveContainer width='100%' aspect={2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' stroke='gray' />
          <CartesianGrid strokeDasharray='3 3' className='chartGrid' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='Total'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#total)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
