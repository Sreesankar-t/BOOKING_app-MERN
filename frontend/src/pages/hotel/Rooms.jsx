import './rooms.css'
import DataTable from '../../components/admin/DataTable'
import HotelSidebar from '../../components/hotel/hotelSidebar'
import PropTypes from 'prop-types'

export default function Rooms ({ columns }) {
  return (
    <div className='Rlist'>
      <HotelSidebar />

      <div className='RlistContainer'>
        <DataTable columns={columns} />
      </div>
    </div>
  )
}

Rooms.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired
}
