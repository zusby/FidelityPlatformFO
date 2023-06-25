import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";


const GetFidelityCard = () => {
    const [fidelityCard, setFidelityCard] = useState([]);


    const {state} = useLocation();

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/fidelity-cards/user/' + state.id)
            .then(response => response.json())
            .then(json => setFidelityCard(json))
            .catch(error => console.error(error));
    }, []);


    const date = Date.parse(fidelityCard.expireDate);
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

    function updateFidelityCard(card) {
        fetch(`http://localhost:8080/api/v1/fidelity-cards/update`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(card),
            }).catch((error) => console.error(error));
    }

    function danto(event) {
        updateFidelityCard(fidelityCard);
        event.preventDefault();
    }


    return (
        <>
            <form onSubmit={danto} method="POST">
                <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputExpireDate">Expiration Date</label>
                        <input className="form-control" id="inputExpireDate" type="date" name="expireDate"
                               value={convertToISODate(normalDate)} readOnly={true}/>
                    </div>
                    <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputPoints">Points</label>
                        <input className="form-control" id="inputPoints" type="number" name="points"
                               defaultValue={fidelityCard.points}
                               onChange={(e) => (fidelityCard.points = e.target.value)}/>
                    </div>
                </div>
                <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputRank">Rank</label>
                        <input className="form-control" id="inputRank" type="text" name="rank"
                               defaultValue={fidelityCard.rank} onChange={(e) => (fidelityCard.rank = e.target.value)}/>
                    </div>
                    <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputExp">Experience</label>
                        <input className="form-control" id="inputExp" type="number" name="exp"
                               defaultValue={fidelityCard.exp} onChange={(e) => (fidelityCard.exp = e.target.value)}/>
                    </div>
                </div>
                <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputPointsHistory">Points History</label>
                        <input className="form-control" id="inputPointsHistory" type="text" name="pointsHistory"
                               value={'empty'} readOnly={true}/>
                    </div>
                    <div className="mb-3">
                        <label className="small mb-1" htmlFor="inputBalance">Balance</label>
                        <input className="form-control form-control-sm" id="inputBalance" type="number" name="balance"
                               defaultValue={fidelityCard.balance}
                               onChange={(e) => (fidelityCard.balance = e.target.value)}/>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit"> Save changes</button>
            </form>
        </>
    );
}
export default GetFidelityCard;