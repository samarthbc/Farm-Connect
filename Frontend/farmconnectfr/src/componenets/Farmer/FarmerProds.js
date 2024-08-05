import React, { useState, useContext, useEffect } from 'react'
import urlcontext from '../../context/urlcontext'
import ItemDisplay from '../ItemDisplay';


function FarmerProds() {

    let context = useContext(urlcontext)
    let { server_url } = context;
    let [allitems, setAllitems] = useState([]);

    const getitems = async () => {
        let response = await fetch(`${server_url}/api/farmeritem/getoffarmer`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        let items = await response.json()
        setAllitems(items);
    }

    useEffect(() => {
        getitems();
    }, [])

    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    {
                        allitems.map((element) => {
                            return (
                                <div className="col-md-3 my-2">
                                    <ItemDisplay
                                        name={element.name}
                                        description={element.description}
                                        manuDate={element.manuDate}
                                        mrp={element.mrp}
                                        sp={element.sp}
                                        itemImg={element.itemImg}
                                        id={element._id}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default FarmerProds