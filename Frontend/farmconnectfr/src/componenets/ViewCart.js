import React, { useContext, useEffect, useState } from 'react';
import cartContext from '../context/cartcontext';
import urlcontext from '../context/urlcontext';
import { useNavigate } from 'react-router-dom';

function ViewCart(props) {
    const contexturl = useContext(urlcontext);
    const { server_url } = contexturl;
    const Navigate = useNavigate();

    const context = useContext(cartContext);
    const { cart, addItemInCart, setCart, removeOne } = context;

    const [finalAllItemsToReRender, setFinalAllItemsToReRender] = useState([]);

    const Loadcart = async () => {
        let counter = 1;
        let allItems = [];
        for (let id in cart) {
            let item = await getByItem(id);
            item['qnty'] = cart[id];
            item['counter'] = counter;
            allItems.push(item);
            counter = counter + 1;
        }
        setFinalAllItemsToReRender(allItems);
    };

    const getByItem = async (id) => {
        let response;
        if (localStorage.getItem('account-type') === 'buyer') {
            response = await fetch(`${server_url}/api/farmeritem/getone`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ id: id })
            });
        } else if (localStorage.getItem('account-type') === 'farmer') {
            response = await fetch(`${server_url}/api/supplieritem/getone`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ id: id })
            });
        }
        let item = await response.json();
        return item;
    };

    const handleDeleteCart = () => {
        setCart({});
        setFinalAllItemsToReRender([]);
    };

    const handlePayment = (e) => {
        e.preventDefault();
        localStorage.setItem('total', total);
        Navigate('/payment');
    };

    const removeItem = (id) => {
        console.log(id)
        removeOne(id)
        Loadcart()
    };

    useEffect(() => {
        Loadcart();
    }, [cart]);

    let total = finalAllItemsToReRender.reduce((acc, item) => acc + item.qnty * item.sp, 0);

    return (
        <>
            <h3 className="text-danger text-center mt-3 nb-check" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bolder", fontSize: "40px" }}>Your Cart</h3>

            {finalAllItemsToReRender.length > 0 ? (
                <div>
                    <div className="container d-flex justify-content-end">
                        <button className="btn btn-danger mb-2" onClick={handleDeleteCart}>Empty Cart <i className="fa-solid fa-trash"></i></button>
                    </div>

                    <div className="container my-4">
                        <div className="row">
                            <div className="col-1">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>SNo.</div>
                            </div>
                            <div className="col-4">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>Name</div>
                            </div>
                            <div className="col-2">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>Quantity</div>
                            </div>
                            <div className="col-2">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>Price per item</div>
                            </div>
                            <div className="col-2">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>Price</div>
                            </div>
                            <div className="col-1">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}></div>
                            </div>
                        </div>

                        {finalAllItemsToReRender.map((element, index) => (
                            <div className="row" key={index} id={element.id}>
                                <div className="col-1">
                                    <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>{element.counter}</div>
                                </div>
                                <div className="col-4">
                                    <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>{element.name}</div>
                                </div>
                                <div className="col-2">
                                    <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>{element.qnty}</div>
                                </div>
                                <div className="col-2">
                                    <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>{element.sp}</div>
                                </div>
                                <div className="col-2">
                                    <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>{element.qnty * element.sp}</div>
                                </div>
                                <div className="col-1">
                                    <button className="btn btn-danger" onClick={() => removeItem(element._id)}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        ))}

                        <h5 className="container mt-3 text-center">Total Price: {total}</h5>

                        <div className="container d-flex justify-content-around">
                            <button className="btn btn-success mt-4" onClick={handlePayment}>Proceed to Buy <i className="fa-solid fa-bag-shopping"></i></button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h5 className="text-center text-danger mt-5">YOUR CART IS EMPTY</h5>
                    <p className='text-center' style={{ fontSize: "20px" }}>Add items in cart to view here</p>
                </div>
            )}
        </>
    );
}

export default ViewCart;
