
import '../App.css'
import '../page.css'
import CouponList from './CouponList'
import DefaultHeader from "../header.jsx";
import { useLocation } from 'react-router-dom';
import React from 'react';

const {state} = useLocation


class UserCoupons extends React.Component {



    render(){
    return (

        <div className="App"  >
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <DefaultHeader/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body tableBG">
                                <h4 className="card-title text-uppercase mb-0">Manage Users</h4>
                            </div>
                            <div className="table-responsive tableBG">

                                <table  className="table no-wrap user-table mb-0 ">

                                    <thead>
                                    <tr>
                                        <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">ID</th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">code</th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">Expire Date</th>
                                    </tr>
                                    </thead>

                                    <tbody><CouponList/></tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
 }
}

export default UserCoupons;