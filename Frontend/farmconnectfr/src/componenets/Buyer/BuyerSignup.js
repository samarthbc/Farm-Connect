import React, { useState, useContext, useEffect } from 'react'
import urlcontext from '../../context/urlcontext';
import { useNavigate } from 'react-router-dom';

function BuyerSignup() {
  const context = useContext(urlcontext)
  const { server_url } = context
  const [credentials, setCredentials] = useState([]);
  const [file, setFile] = useState()
  const Navigate = useNavigate()

  const handleOnChange = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${server_url}/api/buyerauth/buyeredit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ location: credentials.location })
    })

    const formData = new FormData()
    formData.append('file', file)
    const response1 = await fetch(`${server_url}/api/buyerauth/pfp`, {
      method: "POST",
      headers: {
        'auth-token': localStorage.getItem('token')
      },
      body: formData
    })

    Navigate('/')
  }

  const handleImgChange = (e) => {
    setFile(e.target.files[0])
  }

  const getcurrent = async () => {
    const response = await fetch(`${server_url}/api/buyerauth/fetchcurrent`, {
      method: "POST",
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
    let currentbuyer = await response.json();
    setCredentials(currentbuyer);
  }

  useEffect(() => {
    getcurrent()
  }, [])

  return (
    <><div id="loginsetup">
      <h2 className="container-fluid text-center pt-4">COMPLETING PROFILE SETUP</h2>
      <form>
        <div className="d-flex flex-column my-5" style={{ maxWidth: "500px", margin: "auto auto" }}>
          <div className="mb-3">
            <div className='d-flex align-items-center'>
              <img className="rounded-circle" src={`${server_url}/${credentials.profileimg}`} alt="image not loaded" style={{ height: "5vw", width: "5vw" }} />
            </div>

            <label htmlFor="pfpimg">Upload profile image</label>
            <input type="file" name="profileimg" id="pfpimg" className='form-control' onChange={handleImgChange} />

            <label htmlFor="exampleInputName" className="form-label">Location</label>
            <input type="text" className="form-control" id="exampleInputName" minLength={3} name='location' onChange={handleOnChange} value={credentials.location} />
          </div>
          <button type="submit" className="btn btn-warning" onClick={handleSubmit}>Submit <i className="fa-solid fa-user-plus"></i></button>
        </div>
      </form>
    </div></>
  )
}

export default BuyerSignup