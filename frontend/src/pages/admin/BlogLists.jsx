import DataTable from '../../components/admin/DataTable'
import Sidebar from '../../components/admin/Sidebar'
import  './bloglists.css'

export default function ListBlogs({columns}) {
  return (
    <div className='bloglist'>
    <Sidebar/>
    <div className="bloglistContainer">
     
       <DataTable columns={columns}/>
    </div>
   </div>
  )
}
