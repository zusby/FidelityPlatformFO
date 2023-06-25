import {useEffect,useState} from "react";
import "./userTable.css";
import {Link} from "react-router-dom";


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

            <tr key = {userProfiles.id}>
                <td className="pl-4">{index+1}</td>
                <td>
                    <h5 className="font-medium mb-0">{userProfiles.name} {userProfiles.surname}</h5>
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
                    <Link to={`/user/${userProfiles.id}`} state={{user:userProfiles}} > <i className="fa fa-list-alt"></i> </Link>

                </td>
            </tr>
        );


    });
}

export default ApiComponent;

