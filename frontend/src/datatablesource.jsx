export const userColumns = [
    { field: "_id", headerName: "ID", width: 180 },
    {
      field: "user",
      headerName: "User",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "name", headerName: "name", width: 180 },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
  ];
  
  export const hotelColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 100,
    },
   
    {
      field: "address",
      headerName: "Address",
      width: 100,
    },
 
   
  ];
  
  // export const roomColumns = [
  //   { field: "_id", headerName: "ID", width: 70 },
  //   {
  //     field: "title",
  //     headerName: "Title",
  //     width: 230,
  //   },
  //   {
  //     field: "desc",
  //     headerName: "Description",
  //     width: 200,
  //   },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     width: 100,
  //   },
  //   {
  //     field: "maxPeople",
  //     headerName: "Max People",
  //     width: 100,
  //   },
  // ];