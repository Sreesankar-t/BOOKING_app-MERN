import useFetch from '../../hooks/useFetch'
import './featuredBlogs.css'
import { useNavigate } from 'react-router-dom'
export default function FeaturedBlogs () {
  const { data } = useFetch(`/admin/blogdetails?doc=${4}`)
  const navigate = useNavigate()
  const handleClick = (id)=>{
     navigate (`/blogDetails/${id}`)
  }
  console.log(data)
  return (
    <div className='fp'>
      {data
        ? data.map(item => (
            <div onClick={()=>handleClick(item._id)} key={item.id} className='fpItem'>
              <img src={item.photos[0]} alt='' className='fpImg' />
              <span className='fpName'>{item.title}</span>
              <span className='fpCity'>
                Promising amazing city views , roof tops ,bars
              </span>
            </div>
          ))
        : 
        <div><h2>opss there is no item !!</h2></div>
        }
    </div>
  )
}
