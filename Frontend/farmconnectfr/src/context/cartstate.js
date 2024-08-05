import cartContext from "./cartcontext";
import { useState } from "react";

const CartState = (props) =>{
    const [cart, setCart] = useState([])

    const addItemInCart = async(id,qnty) => {
        if(id in cart){
            let cartTemp = cart;
            cartTemp[id] = Number(cartTemp[id]) + Number(qnty)
            setCart(cartTemp)
        }
        else{
            let cartTemp = cart;
            cartTemp[`${id}`] = qnty;
            setCart(cartTemp);
        }
    }

    const removeOne = async(id) => {
        console.log(id)
        delete cart[id];
        console.log(cart)
    }

    return(
        <cartContext.Provider value={{cart, addItemInCart, removeOne, setCart}}>
            {props.children}
        </cartContext.Provider>
    )
}

export default CartState;