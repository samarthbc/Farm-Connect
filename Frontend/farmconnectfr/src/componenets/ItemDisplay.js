import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartContext from '../context/cartcontext'
import urlcontext from '../context/urlcontext'

function ItemDisplay(props) {

    const contexturl = useContext(urlcontext)
    const { server_url } = contexturl

    const [qnty, setQnty] = useState(0)

    // const context = useContext(cartContext)
    // const { addItemInCart } = context;

    let { name, description, manuDate, mrp, sp, itemImg, id } = props

    const Navigate = useNavigate()
    // const AddToCart = async (id) => {
    //     if (localStorage.getItem('token')) {
    //         addItemInCart(id, qnty)
    //     }
    //     else {
    //         Navigate('/login')
    //     }
    // }

    // const fillvalqnty = (e) => {
    //     setQnty(e.target.value)
    // }

    return (
        <>
            <div className="card border border-rounded border-success" style={{ width: "18rem" }}>
                <img src={`${server_url}/${itemImg}`} className="card-img-top" alt="..." style={{ width: "17.9rem", height: "16rem" }} />
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <h5 className='text-center text-success' style={{ fontSize: "25px", marginBottom: "0" }}>SP: {sp}</h5>
                    <h5 className='text-center text-success' style={{ fontSize: "16px",  marginTop: "0" }}>MRP: {mrp}</h5>
                    {/* <div>
                        <label htmlFor="qnty" style={{ display: "inline-block" }} className='me-2'>Quantity: </label>
                        <input type="number" id="qnty" className='form-control' style={{ width: "4vw", display: "inline-block" }} placeholder='1' onChange={fillvalqnty} value={qnty} />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ItemDisplay