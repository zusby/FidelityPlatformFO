import logo from './logo.svg';
import ApiComponent from './ApiRequest.js';
import './App.css';
import './page.css';


function App() {
  return (
    
    <div className="App" style={{backgroundColor: 'lightgray'}}>
     <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

          <div class="headerContainer">
            <table class="headerTable">
              <thead class="homeVP">
                <th>
                  <a href="localhost:3000" ><img src="https://www.labaroviola.com/wp-content/uploads/2023/05/Francesco-Totti-instagram-24022023-grantennistoscana.it-2.jpg" class="fotoDerCapitano"/></a>
                </th>
                <th id="thSpacer"></th>
                <th class="stdTh">
                  Zubyr
                </th>
                <th>
                  Zubbear
                </th>
                <th>
                  Zuzzupets
                </th>
              </thead>
              <tbody>

              </tbody>
            </table>


          </div>
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
                                  <th scope="col" class="border-0 text-uppercase font-medium">Category</th>
                                  <th scope="col" class="border-0 text-uppercase font-medium">Manage</th>
                                </tr>
                              </thead>

                              <tbody>
                                <ApiComponent />
                              </tbody>

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
