import logo from './logo.svg';
import ApiComponent from './ApiRequest.js';
import './App.css';
import './page.css';
import "./userTable.css";
import DefaultHeader from './header.js';
import ViewPurchases from './viewPurchases';


function App() {

  return (
    
    <div className="App" style={{backgroundColor: 'lightgray'}}>
     <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

         <DefaultHeader/>


          <div class="divSpacer"></div>
          <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body tableBG">
                            <h4 class="card-title text-uppercase mb-0">Manage Users</h4>
                        </div>
                        <div class="table-responsive tableBG">

                          <table  class="table no-wrap user-table mb-0 ">
                             
                              <thead>
                                <tr>
                                  <th scope="col" class="border-0 text-uppercase font-medium pl-4">#</th>
                                  <th scope="col" class="border-0 text-uppercase font-medium">Name</th>
                                  <th scope="col" class="border-0 text-uppercase font-medium">Role</th>
                                  <th scope="col" class="border-0 text-uppercase font-medium">Contacts</th>
                                  <th scope="col" class="border-0 text-uppercase font-medium">Date of Birth</th>
                                  <th scope="col" class="border-0 text-uppercase font-medium">View Purchases</th>
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

export default App;
