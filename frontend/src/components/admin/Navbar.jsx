import './navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input type='text' placeholder='Search...' />
        </div>
        <div className='items'>
          <div className='item'>English</div>
          <div className='item'></div>
          <div className='item'></div>
          <div className='item'>
            <div className='counter'>1</div>
          </div>
          <div className='item'>
            <div className='counter'>2</div>
          </div>
          <div className='item'></div>
          <div className='item'>
            <img
              src='https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
