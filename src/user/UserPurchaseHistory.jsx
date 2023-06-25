import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import './PurchaseHistory.css'
import {auto} from "@popperjs/core";

const GetPurchaseHistory = () => {
    const [Purchase, setPurchases] = useState([]);


    const {state} = useLocation();

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/purchase/${state.id}/purchases`)
            .then(response => response.json())
            .then(json => setPurchases(json))
            .catch(error => console.error(error));
        console.log(Purchase);
    }, []);


    const date = Date.parse(Purchase.purchaseDate);
    const formattedDate = new Date(date);

    // Extracting date components
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1; // Months are zero-based, so we add 1
    const year = formattedDate.getFullYear();

    // Creating the "dd/mm/yyyy" format
    const normalDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;




    if (Purchase.length === 0) {
        return (
            <div style={{
                margin: 'auto',
                width: '50%',
                border: '3px',
                padding: '10px'
            }}>
                <div className="container-fluid mt-100">
                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                        <div className="card">
                            <div className="card-header">
                            </div>
                            <div className="card-body cart">
                                <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130"
                                     className="img-fluid mb-4 mr-3" alt="Empty Cart"/>
                                <h3><strong>Your purchase history is empty</strong></h3>
                                <h4> purchases will be listed here once you will have bought something</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {Purchase.length === 0 ? (
                            <div className="card">
                                <div className="card-header"></div>
                                <div className="card-body cart empty-cart">
                                    <img
                                        src="https://i.imgur.com/dCdflKN.png"
                                        width="130"
                                        height="130"
                                        className="img-fluid mb-4 mr-3"
                                        alt="Empty Cart"
                                    />
                                    <h3>
                                        <strong>Your purchase history is empty</strong>
                                    </h3>
                                    <h4>purchases will be listed here once you have bought something</h4>
                                </div>
                            </div>
                        ) : (
                            <div className="card">
                                <div className="card-body tableBG">
                                    <h4 className="card-title text-uppercase mb-0">Purchase History</h4>
                                </div>
                                <div className="scrollable-table">
                                    <div className="table-responsive tableBG">
                                        <table className="table no-wrap user-table mb-0">
                                            <thead>
                                            <tr>
                                                <th scope="col" className="border-0 text-uppercase font-medium pl-4">
                                                    #
                                                </th>
                                                <th scope="col" className="border-0 text-uppercase font-medium">
                                                    OrderID
                                                </th>
                                                <th scope="col" className="border-0 text-uppercase font-medium">
                                                    Price
                                                </th>

                                                <th scope="col" className="border-0 text-uppercase font-medium">
                                                    Date of Purchase
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {Purchase.map((purchase, index) => (
                                                <tr key={purchase.id}>
                                                    <td className="pl-4">{index + 1}</td>
                                                    <td>
                                                        <h5 className="font-medium mb-0">{purchase.id}</h5>
                                                    </td>
                                                    <td>
                                                        <span> {purchase.discountedPrice}$</span><br/>
                                                    </td>

                                                    <td>
                            <span>
                              {purchase.purchaseDate.split("T")[0].split("-")[2]}-
                                {purchase.purchaseDate.split("T")[0].split("-")[1]}-
                                {purchase.purchaseDate.split("T")[0].split("-")[0]}
                            </span><br/>
                                                        <span></span>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GetPurchaseHistory;