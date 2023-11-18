import DataTable from '../../components/admin/DataTable'
import Sidebar from '../../components/admin/Sidebar'
import './user.css'

export default function User({columns}) {
  return (
    <div className='list'>
     <Sidebar/>
      
     <div className="listContainer">
     
        <DataTable columns={columns}/>
     </div>
    </div>
  )
}
