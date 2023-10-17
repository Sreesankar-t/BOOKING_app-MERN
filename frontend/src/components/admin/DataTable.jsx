import './datatable.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { HotelAuthContext } from '../../context/hotel/HotelContext';



const showConfirmationDialog = () => {
  return Swal.fire({
    title: 'Confirmation',
    text: 'Are you sure you want to delete ?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });
};

export default function DataTable({ columns }) {



  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState([]);
  const [userStates, setUserStates] = useState({});
  const [hotelApprovals, setHotelApprovals] = useState({}); 
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const {hotel}=useContext(HotelAuthContext)
  const hotelId = hotel._id

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        if (path === "listhotel" || path === "listroom") {
          const response = await axios.get(`/hotel/${path}/${hotelId}`);
          const data = response.data;
          setList(data);
          setLoading(false); 
        }
        const response = await axios.get(`/admin/${path}`);
        const data = response.data;
        setList(data);
        setLoading(false); 

        const updatedUserStates = {};
        const updatedHotelApprovals = {};

        data.forEach((item) => {
          if (path === "users") {
            updatedUserStates[item._id] = item.isUser;
          } else if (path === "hotellist") {
            updatedHotelApprovals[item._id] = item.approveHotel;
          }
        });

        setUserStates(updatedUserStates);
        setHotelApprovals(updatedHotelApprovals);

      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, [path]);

  const handleDelete = async (id) => {
    const confirmation = await showConfirmationDialog();
    if (confirmation.isConfirmed){
    try {
      await axios.delete(`/admin/${path}/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  }
  }

  const handleHotelDelete = async (id) => {
    const confirmation = await showConfirmationDialog();
    if (confirmation.isConfirmed){
    try {
      await axios.delete(`/hotel/${path}/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  }
}

  const handleBlock = async (id) => {
    try {
      const response = await axios.get(`/admin/hideUser/${id}`);
      const user = response.data;
      localStorage.removeItem('user')
      // Update the local state
      setUserStates((prevState) => ({
        ...prevState,
        [id]: user.isUser,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const handleUnBlock = async (id) => {
    try {
      const response = await axios.get(`/admin/unHideUser/${id}`);
      const user = response.data;
     
      // Update the local state
      setUserStates((prevState) => ({
        ...prevState,
        [id]: user.isUser,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const handleApprove = async (id) => {
    try {
      const response = await axios.get(`/admin/hotellist/${id}`);
      const hotel = response.data;
      
      // Update the local state
      setHotelApprovals((prevState) => ({
        ...prevState,
        [id]: hotel.approveHotel,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='datatable'>
      {loading ? (
          <div className="loader-container">
          <HashLoader
            color='#36d7b7'
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <div className="datatableTitle">
            {path}
            {path === "users" || path === "hotellist" ? (
              <div></div>
            ) : (
              <Link to={`/${path}/new`} className="link">
                Add New
              </Link>
            )}
          </div>
          <DataGrid
            rows={list}
            columns={columns.concat([
              {
                field: "action",
                headerName: "Action",
                width: 200,
                renderCell: (params) => {
                  const userState = userStates[params.row._id];
                  const isHotelApproved = hotelApprovals[params.row._id];
    
                  return (
                    <div className="cellAction">
                      {path === "users"  && (
                        <>
                          <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row._id)}
                          >
                            Delete
                          </div>
                          {userState === false ? (
                            <div className="viewButton" onClick={() => handleUnBlock(params.row._id)}>
                              Unblock
                            </div>
                          ) : (
                            <div className="viewButton" onClick={() => handleBlock(params.row._id)}>
                              Block
                            </div>
                          )}
                        </>
                      )}

                      {(path === "listhotel" || path === "listroom") && (
                      <>
                       <div
                      className="deleteButton"
                      onClick={() => handleHotelDelete(params.row._id)}
                       >
                       Delete
                      </div>
                      </>
                      )}

                      {path === "hotellist" && (
                        <>
                          {!isHotelApproved ? (
                            <div className="viewButton" onClick={() => handleApprove(params.row._id)}>
                              Approve
                            </div>
                          ) : (
                            <div className="status">
                              Approved
                            </div>
                          )}
                        </>
                      )}
                      
                    </div>
                  );
                },
              },
            ])}
           
          
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={(row) => row._id}

          />
        </div>
      )}
    </div>
  );

}

//prop type define

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  
}; 