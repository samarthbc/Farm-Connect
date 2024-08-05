import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartContext from '../context/cartcontext'
import urlcontext from '../context/urlcontext'

function ShopItemDisplay(props) {

    const contexturl = useContext(urlcontext)
    const { server_url } = contexturl

    const [qnty, setQnty] = useState(1)
    const [location, setLocation] = useState("abc")

    const context = useContext(cartContext)
    const { addItemInCart, cart } = context;

    let { name, description, manuDate, mrp, sp, itemImg, id } = props

    const Navigate = useNavigate()
    const AddToCart = async (id) => {
        if (localStorage.getItem('token')) {
            addItemInCart(id, qnty)
            console.log(cart)
        }
        else {
            Navigate('/login')
        }
    }

    const fillvalqnty = (e) => {
        setQnty(e.target.value)
    }

    const getLocationById = async (id) => {
        if(localStorage.getItem('account-type')==='buyer'){
            let response = await fetch(`${server_url}/api/farmeritem/getById`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            })
            let location = await response.json()
            setLocation(location.location)
        }
        else if(localStorage.getItem('account-type')==='farmer'){
            let response = await fetch(`${server_url}/api/supplieritem/getById`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            })
            let location = await response.json()
            setLocation(location.location)
        }
    }

    useEffect(() => {
        getLocationById(id)
    }, [])

    return (
        <>
            <div className="card border border-rounded border-success" style={{ width: "18rem" }}>
                <img src={`${server_url}/${itemImg}`} className="card-img-top" alt="..." style={{ width: "17.9rem", height: "16rem" }} />
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{location}</p>
                    <div>
                        <h5 className='text-center text-success' style={{ fontSize: "25px", marginBottom: "0", display:"inline-block" }}>{sp}{'\u00A0'}{'\u00A0'} </h5>
                        <h5 className='text-center text-danger' style={{ fontSize: "16px", textDecoration: "line-through", marginTop: "0",display:"inline-block"}}> {mrp}</h5>
                    </div>
                    <div>
                        <label htmlFor="qnty" style={{ display: "inline-block" }} className='me-2'>Quantity: </label>
                        <input type="number" id="qnty" className='form-control' style={{ width: "4vw", display: "inline-block" }} placeholder='1' onChange={fillvalqnty} value={qnty} />
                    </div>
                    <div className='mt-2'>
                        <Link to={`/item/${id}`} className="btn btn-primary btn-sm me-3">View Product</Link>
                        <button className="btn btn-primary btn-sm" onClick={() => AddToCart(id)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopItemDisplay