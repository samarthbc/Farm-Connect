import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import urlcontext from '../context/urlcontext';

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(urlcontext);
    const { server_url } = context
    const [user, setUser] = useState([]);

    function loginclick(e) {
        e.preventDefault()
        navigate('/login')
    }

    function signupclick(e) {
        e.preventDefault()
        navigate('/signup')
    }

    function logoutclick() {
        localStorage.removeItem('account-type');
        localStorage.removeItem('token');
        localStorage.removeItem('total');
        localStorage.removeItem('cart')
        navigate('/')
    }

    const getcurrent = async () => {
        if (localStorage.getItem('account-type') === 'farmer') {
            const response = await fetch(`${server_url}/api/farmerauth/fetchcurrent`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
            let current = await response.json()
            setUser(current);
        }
        else if (localStorage.getItem('account-type') === 'supplier') {
            const response = await fetch(`${server_url}/api/supplierauth/fetchcurrent`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
            let current = await response.json()
            setUser(current);
        }
        else if (localStorage.getItem('account-type') === 'buyer') {
            const response = await fetch(`${server_url}/api/buyerauth/fetchcurrent`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
            let current = await response.json()
            setUser(current);
        }

    }

    const handleEditProfile = async (e) => {
        e.preventDefault();
        if (localStorage.getItem('account-type') === 'farmer')
            navigate('/editprofilefarmer')
        else if (localStorage.getItem('account-type') === 'buyer')
            navigate('editprofilebuyer')
        else if (localStorage.getItem('account-type') === 'supplier')
            navigate('editprofilesupplier')
    }

    useEffect(() => {
        getcurrent()
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-warning">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={require("../static/logos/logo_cropped_resized.png")} alt="logo" width="40px" height="40px" />
                    </Link>
                    <Link className="navbar-brand h1" to="/">Farm Connect</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/laws" ? "active" : ""}`} aria-current="page" to="/laws">Laws</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/news" ? "active" : ""}`} aria-current="page" to="/news">News</Link>
                            </li>

                            {/* Farmer stuff */}
                            <li className={`nav-item ${localStorage.getItem('account-type') === 'farmer' ? "" : "d-none"}`}>
                                <Link className={`nav-link ${location.pathname === "/farmershop" ? "active" : ""}`} aria-current="page" to="/farmershop">Shop</Link>
                            </li>
                            <li className={`nav-item ${localStorage.getItem('account-type') === 'farmer' ? "" : "d-none"}`}>
                                <Link className={`nav-link ${location.pathname === "/farmersell" ? "active" : ""}`} aria-current="page" to="/farmersell">Sell</Link>
                            </li>
                            <li className={`nav-item ${localStorage.getItem('account-type') === 'farmer' ? "" : "d-none"}`}>
                                <Link className={`nav-link ${location.pathname === "/farmerprods" ? "active" : ""}`} aria-current="page" to="/farmerprods">Your Products</Link>
                            </li>

                            {/* Buyer stuff */}
                            <li className={`nav-item ${localStorage.getItem('account-type') === 'buyer' ? "" : "d-none"}`}>
                                <Link className={`nav-link ${location.pathname === "/buyershop" ? "active" : ""}`} aria-current="page" to="/buyershop">Shop</Link>
                            </li>

                            {/* Supplier stuff */}
                            <li className={`nav-item ${localStorage.getItem('account-type') === 'supplier' ? "" : "d-none"}`}>
                                <Link className={`nav-link ${location.pathname === "/suppliersell" ? "active" : ""}`} aria-current="page" to="/suppliersell">Sell</Link>
                            </li>
                            <li className={`nav-item ${localStorage.getItem('account-type') === 'supplier' ? "" : "d-none"}`}>
                                <Link className={`nav-link ${location.pathname === "/supplierprods" ? "active" : ""}`} aria-current="page" to="/supplierprods">Your Products</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('account-type')
                            ?
                            <form className='d-flex'>
                                <button className='btn btn-outline-dark me-3' onClick={loginclick}>Login</button>
                                <button className='btn btn-outline-dark' onClick={signupclick}>Sign up</button>
                            </form>
                            :
                            <div>
                                <div>
                                    <img className='rounded-circle img-fluid' style={{ width: "35px", height: "35px" }} src={`${server_url}/${user.profileimg}`} alt="" />

                                    <div className="dropdown" style={{ display: "inline-block" }}>
                                        <button className="btn btn-warning" style={{ padding: "0px" }} data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-solid fa-sort-down ps-1" style={{ fontSize: "20px" }}></i>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li><button to="/editprofile" className="dropdown-item" onClick={handleEditProfile}>Edit profile</button></li>
                                            <li><button className="dropdown-item" onClick={logoutclick}>Logout</button></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar