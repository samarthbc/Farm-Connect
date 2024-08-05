import React, { useContext, useEffect, useState } from 'react'
import cartContext from '../context/cartcontext'
import urlcontext from '../context/urlcontext'
// TODO: Finish this.. Address, payment confirmation, coupon codes, transportation availing etc
function Payment() {

    const contexturl = useContext(urlcontext)
    const { server_url } = contexturl
    const [currentUser, setCurrentUser] = useState([])
    const [total, setTotal] = useState(0)

    let getDetails = async () => {
        if (localStorage.getItem('account-type') === 'farmer') {
            let response = await fetch(`${server_url}/api/farmerauth/fetchcurrent`, {
                method: "POST",
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            })
            let user = await response.json();
            setCurrentUser(user)
        }
        else if (localStorage.getItem('account-type') === 'buyer') {
            let response = await fetch(`${server_url}/api/buyerauth/fetchcurrent`, {
                method: "POST",
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            })
            let user = await response.json();
            setCurrentUser(user)
        }
    }

    const handleOnChange = async (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getDetails();
        setTotal(localStorage.getItem('total'))
    }, [])

    const handleTransport = async(e) => {
        e.target.checked?setTotal(Number(total)+200):setTotal(localStorage.getItem('total'))
    }

    const handlePayment = async(e) => {
        e.preventDefault();
        document.getElementById('main').style.display = 'none';
        document.getElementById('done').style.display = 'block';
    }

    return (
        <>
            <div className="container" style={{maxWidth:750}} id='main'>
                <h3 className='text-center mt-4 mb-4'>Payment Details:</h3>
                <form>
                    <div className="d-flex justify-content-between">
                        <div>
                            <label htmlFor="name" className='form-label'>Name:</label>
                            <input type="text" id='name' name='name' className='form-control' value={currentUser.name} onChange={handleOnChange} style={{width:"150%"}}/>
                        </div>

                        <div>
                            <label htmlFor="manuDate" className='form-label'>Coupon code: (Optional)</label>
                            <input type="text" id='manuDate' name='manuDate' className='form-control'/>
                        </div>
                    </div>

                    <label htmlFor="description" className='form-label mt-2'>Address:</label>
                    <textarea name="description" id="description" cols="30" rows="8" className='form-control' value={currentUser.address}></textarea>

                    <div class="form-check mt-2">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleTransport}/>
                        <label class="form-check-label" for="flexCheckDefault">
                            Avail Transportation (Transportation charges 200)
                        </label>
                    </div>

                    <div style={{fontSize:"1.2rem"}} className='mt-4'><strong>Grand Total: {total}</strong></div>


                    <button className="btn btn-success mt-4" type='submit' onClick={handlePayment}>Proceed to pay</button>
                </form>
            </div>
            <div className='text-center text-success' id='done' style={{fontWeight:"bolder", fontSize:"2rem", marginTop:"15rem", display:"none"}}>Payment Successful <i className="fa-regular fa-circle-check" ></i></div>
        </>
    )
}

export default Payment