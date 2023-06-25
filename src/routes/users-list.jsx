import ApiComponent from "./ApiRequest.jsx";
import '../App.css'
import '../page.css'
import DefaultHeader from "../header.jsx";
export default function UsersList() {
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
                                        <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">Role</th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">Contacts</th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">Date of Birth</th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">View Purchases</th>
                                    </tr>
                                    </thead>

                                    <tbody><ApiComponent /></tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}