import  './hoteldetails.css'
import DataTable from '../../components/admin/DataTable'
import Sidebar from '../../components/admin/Sidebar'

export default function HotelDetails({columns}) {
  return (
    <div className='hdlist'>
    <Sidebar/>
    <div className="hdlistContainer">
      <h3>Hotels</h3>
       <DataTable columns={columns}/>
    </div>
   </div>
  )
}
