import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cartContext from '../context/cartcontext'
import urlcontext from '../context/urlcontext'

function Item() {
    
    const contexturl = useContext(urlcontext)
    const { server_url } = contexturl

    const context = useContext(cartContext)
    const { addItemInCart } = context

    const [quantity, setQuantity] = useState(1)
    const [seller, setSeller] = useState({})

    const [curitem, setCuritem] = useState({})
    const { id } = useParams()

    const loaditem = async () => {
        const accountType = localStorage.getItem('account-type')
        const endpoint = accountType === 'farmer' ? '/api/supplieritem/getone' : '/api/farmeritem/getone'
        
        let response = await fetch(`${server_url}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        let parsedResponse = await response.json()
        setCuritem(parsedResponse)
    }

    const getSeller = async () => {
        const accountType = localStorage.getItem('account-type')
        const sellerId = accountType === 'farmer' ? curitem.supplier : curitem.farmer
        const endpoint = accountType === 'farmer' ? '/api/supplierauth/getbyid' : '/api/farmerauth/getbyid'
        
        let response = await fetch(`${server_url}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: sellerId })
        })
        let parsedResponse = await response.json()
        setSeller(parsedResponse)
    }

    useEffect(() => {
        loaditem()
    }, [])

    useEffect(() => {
        if (curitem && (curitem.supplier || curitem.farmer)) {
            getSeller()
        }
    }, [curitem])

    const Navigate = useNavigate()
    const handleAddToCart = async () => {
        if (localStorage.getItem('token')) {
            addItemInCart(id, quantity)
        } else {
            Navigate('/login')
        }
    }

    const fillValsQnty = (e) => {
        setQuantity(e.target.value)
    }

    return (
        <div className="d-flex my-5 ms-5 justify-content-start">
            <img src={`${server_url}/${curitem.itemImg}`} alt="Image" style={{ width: "25vw", height: "25vw" }} className='border rounded border-dark' />
            <div style={{ marginLeft: "40px", height: "40vw" }} className='d-flex flex-column justify-content-between py-5'>
                <div>
                    <h2>{curitem.name}</h2>
                    <p>{curitem.description}</p>
                    <p>{curitem.manuDate}</p>
                </div>

                <div className='my-5'>
                    <p>Seller details:</p>
                    <p>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Name: {seller.name}</p>
                    <p>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Contact: +91 {seller.phno}</p>
                    <p>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}Location: {seller.location}</p>
                </div>

                <h4>{curitem.sp}</h4>

                <div>
                    <label htmlFor="qnty">Quantity:</label>
                    <input type="number" className='form-control border' style={{ width: "6vw" }} onChange={fillValsQnty} id='qnty' value={quantity} />
                    <button className="btn btn-success mt-1" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Item
