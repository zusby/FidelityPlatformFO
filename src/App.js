import logo from './logo.svg';
import React, {useEffect,useState} from "react";
import './ApiRequest.js';
import './App.css';
import './page.css';

function removeTime(date = new Date()) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

const ApiComponent= () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/customer/all')
    .then(response => response.json())
    .then(json => setUserProfiles(json))
    .catch(error => console.error(error));
}, []);
  


  return userProfiles.map((userProfiles, index) => {

    return (
      <tr>
    <td class="pl-4">{index+1}</td>
    <td>
        <h5 class="font-medium mb-0">{userProfiles.name} {userProfiles.surname}</h5>
        <span class="text-muted">{userProfiles.address.street} {userProfiles.address.city} </span>
    </td>
    <td>
        <span class="text-muted">{userProfiles.rank} </span><br></br>
        
    </td>
    <td>
        <span class="text-muted">{userProfiles.email}</span><br></br>
        <span class="text-muted">{userProfiles.telephoneNumber} </span>
    </td>
    <td>
        <span class="text-muted">{userProfiles.birthDate.split("T")[0].split("-")[2]}-{userProfiles.birthDate.split("T")[0].split("-")[1]}-{userProfiles.birthDate.split("T")[0].split("-")[0]}</span><br></br>
        <span class="text-muted"></span>
    </td>
    <td>
      <select class="form-control category-select" id="exampleFormControlSelect1">
        <option>Modulator</option>
        <option>Admin</option>
        <option>User</option>
        <option>Subscriber</option>
      </select>
    </td>
    <td>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle"><i class="fa fa-key"></i> </button>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i class="fa fa-trash"></i> </button>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i class="fa fa-edit"></i> </button>
      <button type="button" class="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i class="fa fa-upload"></i> </button>
    </td>
  </tr>
    );


  });
}
  
  




function App() {
  return (
    
    <div className="App">
     <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

<div class="container">
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-uppercase mb-0">Manage Users</h5>
            </div>
            <div class="table-responsive">
                <table  class="table no-wrap user-table mb-0">
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
                  <ApiComponent/>
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
