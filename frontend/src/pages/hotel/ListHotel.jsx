import DataTable from '../../components/admin/DataTable'
import HotelSidebar from '../../components/hotel/hotelSidebar'
import './listhotel.css'

export default function ListHotel({columns}) {
  return (
    <div className='Llist'>
      <HotelSidebar />
 
      <div className="LlistContainer">
    
       <DataTable columns={columns}/>
       
      </div>
 
    </div>
  )
}
