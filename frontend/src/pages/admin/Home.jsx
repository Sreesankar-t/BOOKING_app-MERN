import { lazy, Suspense } from 'react'
import Sidebar from '../../components/admin/Sidebar'
import './home.css'
import Navbar from '../../components/admin/Navbar'

const LazyWidget = lazy(() => import('../../components/admin/Widget'))
const LazyFeatured = lazy(() => import('../../components/admin/FeaturedAdmin'))
const LazyChart = lazy(() => import('../../components/admin/Chart'))

export default function Home () {
  return (
    <div className='home'>
     
      <Sidebar />

      <div className='homeContainer'>
      
        <div className='widgets'>
          <Suspense fallback={<div>Loading Widget...</div>}>
            <LazyWidget />
          </Suspense>
        </div>
        <div className='charts'>
          <Suspense fallback={<div>Loading Featured or Chart...</div>}>
            <LazyFeatured />
            <LazyChart />
          </Suspense>
        </div>
      </div>
    </div>
  )
}


