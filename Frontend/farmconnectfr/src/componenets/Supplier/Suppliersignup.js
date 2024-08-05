import React, { useState, useContext, useEffect } from 'react'
import urlcontext from '../../context/urlcontext';
import { useNavigate } from 'react-router-dom';

function SupplierSignup() {
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

    const response = await fetch(`${server_url}/api/supplierauth/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(credentials)
    })

    const formData = new FormData()
    formData.append('file', file)
    const response1 = await fetch(`${server_url}/api/supplierauth/pfp`, {
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
    const response = await fetch(`${server_url}/api/supplierauth/fetchcurrent`, {
      method: "POST",
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
    let currentsupplier = await response.json();
    setCredentials(currentsupplier);
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

            <label htmlFor="address" className='form-label'>Address:</label>
            <textarea name="address" id="address" cols="30" rows="10" className='form-control' value={credentials.address} onChange={handleOnChange} ></textarea>

            <label htmlFor="phno" className='form-label'>Phno number:</label>
            <input type="number" className="form-control" id="phno" name='phno' onChange={handleOnChange} value={credentials.phno}/>
          </div>
          <button type="submit" className="btn btn-warning" onClick={handleSubmit}>Submit <i className="fa-solid fa-user-plus"></i></button>
        </div>
      </form>
    </div></>
  )
}

export default SupplierSignup