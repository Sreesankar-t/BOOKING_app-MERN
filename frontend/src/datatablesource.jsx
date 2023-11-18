export const userColumns = [
  { field: '_id', headerName: 'ID', width: 290 },
  {
    field: 'user',
    headerName: 'User',
    width: 130,
    renderCell: params => {
      return (
        <div className='cellWithImg'>
          <img
            className='cellImg'
            src={params.row.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
            alt='avatar'
          />
          {params.row.username}
        </div>
      )
    }
  },
  { field: 'name', headerName: 'name', width: 200 },
  {
    field: 'email',
    headerName: 'Email',
    width: 350
  },

  {
    field: 'phone',
    headerName: 'Phone',
    width: 180
  }
]

export const hotelColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    width: 190
  },

  {
    field: 'address',
    headerName: 'Address',
    width: 480
  }
]

export const ListHotelColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'name',
    headerName: 'Name',
    width: 180
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 110
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250
  },
  {
    field: 'city',
    headerName: 'City',
    width: 120
  },

  {
    field: 'distance',
    headerName: 'D from city-center (km)',
    width: 220
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 120
  },
  {
    field: 'cheapestPrice',
    headerName: 'Price(₹)',
    width: 120
  }
]

export const roomColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'title',
    headerName: 'Title',
    width: 200
  },
  {
    field: 'desc',
    headerName: 'Description',
    width: 450
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100
  },
  {
    field: 'maxPeople',
    headerName: 'Max People',
    width: 150
  }
]

export const Bookingcolumns = [
  {
    field: 'hotelName',
    headerName: 'hotelName',
    width: 150
  },
  {
    field: 'hotelAddress',
    headerName: 'hotelAddress',
    width: 350
  },
  {
    field: 'roomTitle',
    headerName: 'Romm',
    width: 150
  },
  {
    field: 'totalAmount',
    headerName: 'BooKing Charge',
    width: 190
  },
  {
    field: 'roomDesc',
    headerName: 'Fecility',
    width: 370
  },
  {
    field: 'roomNumbers',
    headerName: 'roomNumbers',
    cell: row => (
      <ul>
        {row.roomNumbers.map(roomNumber => (
          <li key={roomNumber}>{roomNumber}</li>
        ))}
      </ul>
    ),
    width: 150
  },
  {
    field: 'startDate',
    headerName: 'Check_in_date',
    width: 150
  },
  {
    field: 'endDate',
    headerName: 'Check_out_date',
    width: 150
  }
]

export const blogColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'title',
    headerName: 'Title',
    width: 280
  },
  {
    field: 'summary',
    headerName: 'summary',
    width: 600
  },

  {
    field: 'createdAt',
    headerName: 'Date',
    width: 150
  }
]

export const bookingColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'hotelName',
    headerName: 'hotelName',
    width: 180
  },
  {
    field: 'hotelType',
    headerName: 'hotelType',
    width: 150
  },

  {
    field: 'hotelAddress',
    headerName: 'hotelAddress',
    width: 330
  },
  {
    field: 'roomTitle',
    headerName: 'Room',
    width: 150
  },
  {
    field: 'roomDesc',
    headerName: 'Facility',
    width: 150
  }
]

export const ownerBookingColumns = [
  { field: '_id', headerName: 'ID', width: 280 },
  {
    field: 'hotelName',
    headerName: 'hotelName',
    width: 230
  },
  {
    field: 'hotelType',
    headerName: 'hotelType',
    width: 160
  },

  {
    field: 'hotelAddress',
    headerName: 'hotelAddress',
    width: 330
  },
  {
    field: 'roomTitle',
    headerName: 'Room',
    width: 150
  },
  {
    field: 'roomDesc',
    headerName: 'Facility',
    width: 380
  }
]
