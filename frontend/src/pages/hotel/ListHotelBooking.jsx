import DataTable from '../../components/admin/DataTable'
import HotelSidebar from '../../components/hotel/hotelSidebar'
import './listhotelbooking.css'

export default function listHotelBooking ({ columns }) {
  return (
    <div className='LHlist'>
      <HotelSidebar />

      <div className='LHlistContainer'>
        <div className='ctable'>
          <DataTable columns={columns} />
        </div>
      </div>
    </div>
  )
}
