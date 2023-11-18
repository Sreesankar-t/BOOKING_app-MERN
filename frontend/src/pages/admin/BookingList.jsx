import DataTable from '../../components/admin/DataTable'
import Sidebar from '../../components/admin/Sidebar'
import  './bookinglist.css'

export default function BookingList({columns}) {
  return (
    <div className='bookinglist'>
    <Sidebar/>
    <div className="bookinglistContainer">
     
       <DataTable columns={columns}/>
    </div>
   </div>
  )
}