import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import urlcontext from '../../context/urlcontext';
import ShopItemDisplay from '../ShopItemDisplay';
import { useNavigate } from 'react-router-dom';

function Shop() {

    const context = useContext(urlcontext)
    const Navigate = useNavigate()
    const { server_url } = context
    const [items1, setItems1] = useState([])
    const [items2, setItems2] = useState([])
    const [items3, setItems3] = useState([])
    const [searchText, setSearchText] = useState("")
    const [currentLocation, setCurrentLocation] = useState("")

    const getCurrentFarmer = async () => {
        const response = await fetch(`${server_url}/api/farmerauth/fetchcurrent`, {
            method: "POST",
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json()
        let location = json.location
        setCurrentLocation(location)
        console.log(json)
    }

    const getatlocation = async () => {
        const response = await fetch(`${server_url}/api/supplieritem/getatlocation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: currentLocation })
        });
        const json = await response.json()
        setItems1(json)
        console.log(json)
    }

    const getotherlocation = async () => {
        const response = await fetch(`${server_url}/api/supplieritem/getotherlocation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: currentLocation })
        });
        const json = await response.json()
        setItems2(json)
        console.log(json)
    }

    useEffect(() => {
        getCurrentFarmer()
        getatlocation()
        getotherlocation()
    }, [])

    const handleOnChange = async (e) => {
        setSearchText(e.target.value)
    }

    const handleSearch = async (e) => {
        e.preventDefault()

        const response = await fetch(`${server_url}/api/supplieritem/getbyname`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "search": searchText })
        })
        const items = await response.json()

        setItems3(items);
        document.getElementById('onSearch').style.display = 'block';
        document.getElementById('nonSearch').style.display = 'none';
    }

    const viewcart = (e) => {
        e.preventDefault()
        Navigate('/viewcart')
    }

    return (
        <>
            <div className="container d-flex mt-2 justify-content-between align-items-center">
                <div className='d-flex'>
                    <input type="text" className='form-control ms-2 border border-success' onChange={handleOnChange} id='search' style={{ width: "20vw", display: "inline-block" }} />
                    <button className="btn btn-success ms-2" onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <button onClick={viewcart} className="btn btn-success"><i className="fa-solid fa-cart-shopping"></i></button>
            </div>


            <div id="nonSearch" className='container mt-3'>
                <div className="row">
                    {items1.map((element) => {
                        return (
                            <div className="col-md-3 my-2">
                                <ShopItemDisplay
                                    name={element.name}
                                    description={element.description}
                                    manuDate={element.manuDate}
                                    mrp={element.mrp}
                                    sp={element.sp}
                                    itemImg={element.itemImg}
                                    id={element._id}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="row">
                    {items2.map((element) => {
                        return (
                            <div className="col-md-3 my-2">
                                <ShopItemDisplay
                                    name={element.name}
                                    description={element.description}
                                    manuDate={element.manuDate}
                                    mrp={element.mrp}
                                    sp={element.sp}
                                    itemImg={element.itemImg}
                                    id={element._id}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id="onSearch" className='container mt-3'>
                <div className="row">
                    {items3.map((element) => {
                        return (
                            <div className="col-md-3 my-2">
                                <ShopItemDisplay
                                    name={element.name}
                                    description={element.description}
                                    manuDate={element.manuDate}
                                    mrp={element.mrp}
                                    sp={element.sp}
                                    itemImg={element.itemImg}
                                    id={element._id}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Shop