
import './list.css'
import Navbar from '../../components/client/Navbar'
import Header from '../../components/client/Header'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/client/SearchItem'

const List = () => {

const location = useLocation()
const [destination,setDestination] =useState(location.state.destination)
const [date,setDate] =useState(location.state.date)
const [openDate,setOpenDate] =useState(false)
const [options,setOptions] =useState(location.state.options)
console.log(options);
  return (
    <div>
     <Navbar/>
     <Header type="list"/>
     <div className="listContainer">
        <div className="listWrapper">
            <div className="listSearch">
                <h1 className="lsTitle">Search</h1>
                <div className="lsItem">
                    <label htmlFor="">Destination</label>
                    <input placeholder={destination} type="text" />
                </div>
                <div className="lsItem">
                    <label htmlFor="">Chech-in Date</label>
                    <span onClick={()=>setOpenDate(!openDate)}>  {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                {openDate && (
                    <DateRange
                    onChange={(item)=> setDate([item.selection])}
                    minDate={new Date()}
                    ranges={date}
                    />
                )}
                </div>
                <div className="lsItem">
                    <label htmlFor="">Options</label>
                    <div className="lsOptions">

                    
                    <div className="lsOptionItem">
                        <span className="lsOptionText">Min price <small>(per night)</small>
                        </span>
                        <input type="number" className="lsOptionInput" />
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsOptionText">Max price <small>(per night)</small>
                        </span>
                        <input type="number" className="lsOptionInput" />
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsOptionText">Adult 
                        </span>
                        <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsOptionText">Childdren 
                        </span>
                        <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                    </div>
                    <div className="lsOptionItem">
                        <span className="lsOptionText">Room
                        </span>
                        <input type="number" min={1} className="lsOptionInput" placeholder={options.room}/>
                    </div>
                    </div>
                </div>
                <button>Search</button>
            </div>
            <div className="listResult">
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
            </div>
        </div>
     </div>
    </div>
  )
}

export default List
