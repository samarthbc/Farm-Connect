import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import urlcontext from '../../context/urlcontext'


function EditProfileSupplier() {
    const context = useContext(urlcontext)
    const { server_url } = context


    const Navigate = useNavigate()
    const [userdetails, setUserdetails] = useState([])
    const [file, setFile] = useState()

    const fetchcurrent = async () => {

        const response = await fetch(`${server_url}/api/supplierauth/fetchcurrent`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        let currentuser = await response.json()
        setUserdetails(currentuser)
    }

    useEffect(() => {
        fetchcurrent()
    }, [])

    const fillvals = (e) => {
        setUserdetails({ ...userdetails, [e.target.name]: e.target.value })
    }

    const handleImgChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleEditProfile = async (e) => {
        e.preventDefault()

        let updateprofile = await fetch(`${server_url}/api/supplierauth/update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(userdetails)
        })

        const formData = new FormData()
        formData.append('file', file)
        let response = await fetch(`${server_url}/api/supplierauth/pfp`, {
            method: "POST",
            headers: {
                'auth-token': localStorage.getItem('token')
            },
            body: formData
        })

        Navigate('/editprofilesupplier')
    }

    return (
        <>

<form>
                <div className="container d-flex justify-content-center flex-column align-items-center">
                    <h3 className="text-danger text-center mt-4 nb-check" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bolder", fontSize: "40px" }}>Edit Profile</h3>

                    <img className="rounded-circle" src={`${server_url}/${userdetails.profileimg}`} alt="image not loaded" style={{ height: "18vw", width: "18vw" }} />

                    <input type="file" name="profileimg" id="pfpimg" className='form-control' style={{ width: "50vw" }} onChange={handleImgChange} />

                    <div className='mt-3'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id='name' className='form-control' style={{ width: "50vw" }} value={userdetails.name} onChange={fillvals} name='name' />
                    </div>

                    <div className='mt-3'>
                        <label htmlFor="location">Location:</label>
                        <input type="text" id='location' className='form-control' style={{ width: "50vw" }} value={userdetails.location} onChange={fillvals} name='location' />
                    </div>

                    <div className='mt-3'>
                        <label htmlFor="phno">Phone Number:</label>
                        <input type="number" id='phno' className='form-control' style={{ width: "50vw" }} value={userdetails.phno} onChange={fillvals} name='phno' />
                    </div>

                    <div className="mt-3">
                        <label htmlFor="address" className='form-label'>Address:</label>
                        <textarea name="address" id="address" cols="30" rows="10" className='form-control' value={userdetails.address} onChange={fillvals} style={{ width: "50vw" }}></textarea>
                    </div>

                    <button className="btn btn-success my-4" onClick={handleEditProfile}>Edit Profile <i className="fa-solid fa-user-pen"></i></button>

                </div>

            </form>

        </>
    )
}

export default EditProfileSupplier