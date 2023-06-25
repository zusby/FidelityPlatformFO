import {useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {userProfile} from "./Pages/UserProfile.js";
import "./userTable.css";


const ApiComponent= () => {
    const [userProfiles, setUserProfiles] = useState([]);
    //const navigate = useNavigate();

    useEffect(() => {
      fetch('http://localhost:8080/api/v1/customer/all')
      .then(response => response.json())
      .then(json => setUserProfiles(json))
      .catch(error => console.error(error));
    }, []);


    const navigateToEdit = ()=>{
      //navigate('/userProfile');
      }
      
    
    
      return userProfiles.map((userProfiles, index) => {
    
        return (
          <tr>
        <td class="pl-4">{index+1}</td>
        <td>
            <h5 class="font-medium mb-0">{userProfiles.name} {userProfiles.surname}</h5>
            <span>{userProfiles.address.street} {userProfiles.address.city} </span>
        </td>
        <td>
            <span>{userProfiles.rank} </span><br></br>
            
        </td>
        <td>
            <span>{userProfiles.email}</span><br></br>
            <span>{userProfiles.telephoneNumber} </span>
        </td>
        <td>
            <span>{userProfiles.birthDate.split("T")[0].split("-")[2]}-{userProfiles.birthDate.split("T")[0].split("-")[1]}-{userProfiles.birthDate.split("T")[0].split("-")[0]}</span><br></br>
            <span></span>
        </td>
        <td>
           <button type="button" class="btnPurc"><i class="fa fa-list-alt"></i> </button>
        </td>
      </tr>
        );
    
    
      });
  }
  //btn btn-outline-info btn-circle btn-lg btn-circle
export default ApiComponent;

