
import '../App.css'
import '../page.css'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function UsersList() {
    const [userProfiles, setUserProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/customer/all')
            .then(response => response.json())
            .then(json => setUserProfiles(json))
            .catch(error => console.error(error));
    }, []);

    // Function to handle search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };


    // Filter the user list based on the search query
    const filteredUsers = userProfiles.filter((userProfile) => {
        const { name, email, telephoneNumber } = userProfile;
        const query = searchQuery.toLowerCase();
        return (
            name.toLowerCase().includes(query) ||
            email.toLowerCase().includes(query) ||
            telephoneNumber.toLowerCase().includes(query)
        );
    });


    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body tableBG">
                                <h4 className="card-title text-uppercase mb-0">Manage Users</h4>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, or role"
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                    />
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </div>
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
                                            Name
                                        </th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">
                                            Role
                                        </th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">
                                            Contacts
                                        </th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">
                                            Date of Birth
                                        </th>
                                        <th scope="col" className="border-0 text-uppercase font-medium">
                                            Edit
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredUsers.map((userProfile, index) => (
                                        <tr key={userProfile.id}>
                                            <td className="pl-4">{index + 1}</td>
                                            <td>
                                                <h5 className="font-medium mb-0">{userProfile.name} {userProfile.surname}</h5>
                                                <span>{userProfile.address.street} {userProfile.address.city} </span>
                                            </td>
                                            <td>
                                                <span>{userProfile.rank} </span><br></br>
                                            </td>
                                            <td>
                                                <span>{userProfile.email}</span><br></br>
                                                <span>{userProfile.telephoneNumber} </span>
                                            </td>
                                            <td>
                                                <span>{userProfile.birthDate.split("T")[0].split("-")[2]}-{userProfile.birthDate.split("T")[0].split("-")[1]}-{userProfile.birthDate.split("T")[0].split("-")[0]}</span><br></br>
                                                <span></span>
                                            </td>
                                            <td>
                                                <Link to={`/user/${userProfile.id}`} state={{ user: userProfile }}><i className="fa fa-list-alt"></i> </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}