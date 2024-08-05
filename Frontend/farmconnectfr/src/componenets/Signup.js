import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import urlcontext from '../context/urlcontext'

// TODO: Error messages for min chars, valid email, valid password etc

function Signup() {

  const context = useContext(urlcontext)
  const { server_url } = context

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [check, setCheck] = useState(false)
  const navigate = useNavigate()

  const signupHandle = async (e) => {
    e.preventDefault()

    if (credentials.password === credentials.cpassword) {

      let selectedValue = document.querySelector('input[name="flexRadioDefault"]:checked').value
      if (selectedValue === "farmer") {

        const response = await fetch(`${server_url}/api/farmerauth/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()

        if (json.success) {
          // Saving the auth-token
          localStorage.setItem('token', json.authToken);
          localStorage.setItem('account-type', "farmer")
          navigate('/farmersignup')
        }
        else {
          document.getElementById('InvalidCred2').style.display = 'block'
          setTimeout(() => {
            document.getElementById('InvalidCred2').style.display = 'none'
          }, 5000)
        }

      }

      if (selectedValue === "supplier") {

        const response = await fetch(`${server_url}/api/supplierauth/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()

        if (json.success) {
          // Saving the auth-token
          localStorage.setItem('token', json.authToken);
          localStorage.setItem('account-type', "supplier")
          navigate('/suppliersignup')
        }
        else {
          document.getElementById('InvalidCred2').style.display = 'block'
          setTimeout(() => {
            document.getElementById('InvalidCred2').style.display = 'none'
          }, 5000)
        }

      }

      if (selectedValue === "buyer") {

        const response = await fetch(`${server_url}/api/buyerauth/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: "default" })
        });
        const json = await response.json()

        if (json.success) {
          // Saving the auth-token
          localStorage.setItem('token', json.authToken);
          localStorage.setItem('account-type', "buyer")
          navigate('/buyersignup')
        }
        else {
          document.getElementById('InvalidCred2').style.display = 'block'
          setTimeout(() => {
            document.getElementById('InvalidCred2').style.display = 'none'
          }, 5000)
        }

      }
    }

    else {
      document.getElementById('InvalidCred').style.display = 'block'
      setTimeout(() => {
        document.getElementById('InvalidCred').style.display = 'none'
      }, 5000)
    }

  }

  const handleOnChange = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleTac = async(e) => {
    setCheck(e.target.checked);
  }

  return (
    <><div id="loginsetup">
      <h2 className="container-fluid text-center pt-4">SIGN UP</h2>
      <form>
        <div className="d-flex flex-column my-2" style={{ maxWidth: "500px", margin: "auto auto" }}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleInputName" minLength={3} name='name' onChange={handleOnChange} value={credentials.name} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleOnChange} value={credentials.email} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={handleOnChange} minLength={5} value={credentials.password} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleOnChange} minLength={5} value={credentials.cpassword} />
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="supplier" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Supplier
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="farmer" />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Farmer
            </label>
          </div>
          <div className="form-check mb-5">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="buyer" />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Retail/Wholesale purchaser
            </label>
          </div>

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={handleTac} />
            <label class="form-check-label" for="flexCheckDefault">
              <Link to="/tac" style={{ textDecoration: "none", color: "black" }}>I agree to Farm-Connect Terms and Conditions</Link>
            </label>
          </div>

          <h6 id='InvalidCred' className='text-danger' style={{ display: 'none' }}>Password and confirm password doent match</h6>
          <h6 id='InvalidCred2' className='text-danger' style={{ display: 'none' }}>An account with this email already exists</h6>
          <button type="submit" className={`btn btn-warning ${check?"":"disabled"}`} onClick={signupHandle}>Sign up <i className="fa-solid fa-user-plus"></i></button>
        </div>
      </form>
    </div></>
  )
}

export default Signup