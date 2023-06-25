import {useLocation, useNavigate} from 'react-router-dom';
import './userForm.css'



export default function UserEditPage() {


    const {state} = useLocation()

    let user = {
        "name": "string",
        "surname": "string",
        "telephoneNumber": "string",
        "email": "string",
        "address": {
            "street": "string",
            "zipCode": "string",
            "city": "string",
            "province": "string"
        },
        "birthDate": "date",
        "rank": "CUSTOMER",
        "id": "string"
    }


    // Logic for editing the user's parameters based on the `id`

    user = state.user;

    const date = Date.parse(user.birthDate);
        const formattedDate = new Date(date);

        // Extracting date components
        const day = formattedDate.getDate();
        const month = formattedDate.getMonth() + 1; // Months are zero-based, so we add 1
        const year = formattedDate.getFullYear();

        // Creating the "dd/mm/yyyy" format
        const normalDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;


    function convertToISODate(normalDate) {
        const [day, month, year] = normalDate.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    let navigate = useNavigate();

    const routeChange= ()=>{
        let path = `/user/${user.id}/card`;
        navigate(path,{state:{id:user.id}});
    }
    const navigateToCoupons= ()=>{
        let path = `/user/${user.id}/coupons`;
        navigate(path,{state:{id:user.id}});
    }


    return (

        <div>
            <div id="topbar">
                <div>
                    <form method="post">
                        <table>

                            <tbody>
                            <tr>
                                <td>
                                    <button onClick={routeChange}>
                                        Card
                                    </button>

                                </td>
                                <td>
                                    <button type="submit" onClick={() => navigate(`/}`)}>Purchase History
                                    </button>
                                </td>
                                <td>
                                    <button type="submit" onClick={navigateToCoupons}>Coupons</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
            <div id="detail">
            </div>
            <>
                <form>
                    <div className="row gx-3 mb-3">

                        <div className="col-md-6">
                            <label className="small mb-1" form="inputFirstName">First name</label>
                            <input className="form-control" id="inputFirstName" type="text"
                                   defaultValue={user.name}/>
                        </div>

                        <div className="col-md-6">
                            <label className="small mb-1" form="inputLastName">Last name</label>
                            <input className="form-control" id="inputLastName" type="text"
                                   defaultValue={user.surname}/>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">

                        <div className="col-md-6">
                            <label className="small mb-1" form="inputLocation">Address</label>
                            <input className="form-control" id="inputLocation" type="text"
                                   defaultValue={user.address.street + user.address.city}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                        <input className="form-control" id="inputEmailAddress" type="email"
                               defaultValue={user.email}/>
                    </div>
                    <div className="row gx-3 mb-3">

                        <div className="col-md-6">
                            <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                            <input className="form-control" id="inputPhone" type="tel"
                                   defaultValue={user.telephoneNumber.substring(3, user.telephoneNumber.length)}/>
                        </div>
                        <div className="col-md-6">
                            <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                            <input className="form-control" id="inputBirthday" type="date" name="birthday"
                                   value={convertToISODate(normalDate)} readOnly={true}/>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="button">Save changes</button>
                </form>
            </>
        </div>);
}

