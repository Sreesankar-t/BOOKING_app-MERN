import SyncLoader from 'react-spinners/SyncLoader';
import useFetch from '../../hooks/useFetch'
import  './featured.css'

export default function Featured() {
    const {data ,loading }=useFetch('/hotel/countByCity?cities=mumbai,bangalore,delhi')
    
  return (
    <div className='featuredUser'>
       { loading ?        
       <div className="loader-container">
          <SyncLoader
            color='#36d7b7'
            loading={loading}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>:<><div className="featuredItem">
            <img src="https://media.istockphoto.com/id/1390163309/photo/beautiful-gateway-of-india-near-taj-palace-hotel-on-the-mumbai-harbour-with-many-jetties-on.webp?b=1&s=170667a&w=0&k=20&c=RySWzx7z0NQaemti36zzWk2KhG0JrbnhBLL1T5ggyHA=" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Mumbai</h1>
                <h2>{data[0]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://t3.ftcdn.net/jpg/04/36/67/54/360_F_436675446_jGWzkVDah3b6ONZxhhN13s6I4iFnjLGJ.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Bangalore</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://images.unsplash.com/photo-1598977054780-2dc700fdc9d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVsaGl8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Delhi</h1>
                <h2>{data[2] } properties</h2>
            </div>
        </div>
        </>
        }
      
    </div>
  )
}
