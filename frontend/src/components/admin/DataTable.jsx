import './datatable.css';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DataTable({ columns }) {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState([]);
  const [userStates, setUserStates] = useState({});
  const [hotelApprovals, setHotelApprovals] = useState({}); 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/${path}/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const handleHide = async (id) => {
    try {
      const response = await axios.get(`/admin/hideUser/${id}`);
      const user = response.data;
      localStorage.setItem('isBlocked', 'true');
      // Update the local state
      setUserStates((prevState) => ({
        ...prevState,
        [id]: user,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const handleUnHide = async (id) => {
    try {
      const response = await axios.get(`/admin/unHideUser/${id}`);
      const user = response.data;
      localStorage.removeItem('isBlocked');
      // Update the local state
      setUserStates((prevState) => ({
        ...prevState,
        [id]: user,
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

  const { data } = useFetch(`/admin/${path}`);

  useEffect(() => {
    if (data) {
      setList(data);
      
      // Update button states based on the latest data
      const updatedUserStates = {};
      const updatedHotelApprovals = {};

      data.forEach((item) => {
        // Set up conditions based on your data to update button states
        if (path === "users") {
          updatedUserStates[item._id] = item.isUser;
        } else if (path === "hotellist") {
          updatedHotelApprovals[item._id] = item.approveHotel;
        }
      });

      setUserStates(updatedUserStates);
      setHotelApprovals(updatedHotelApprovals);
    }
  }, [data, path]);

  return (
    <div className='datatable'>
      <DataGrid
        rows={list}
        columns={columns.concat([
          {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
              const userState = userStates[params.row._id] || {};
              const isHotelApproved = hotelApprovals[params.row._id];
              
              return (
                <div className="cellAction">
                  {path === "users" && (
                    <>
                      <div
                        className="deleteButton"
                        onClick={() => handleDelete(params.row._id)}
                      >
                        Delete
                      </div>
                      {userState.isUser === false ? (
                        <div className="viewButton" onClick={() => handleUnHide(params.row._id)}>
                          UnHide
                        </div>
                      ) : (
                        <div className="viewButton" onClick={() => handleHide(params.row._id)}>
                          Hide
                        </div>
                      )}
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
        pageSize={10}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  )
}
