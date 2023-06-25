import "./App.css";

const DefaultHeader= () => {

    return (
        <div className="headerContainer">
            <table className="headerTable">
                <thead className="homeVP">
                <tr>
                <th>
                    <a href="/" ><img src="https://www.labaroviola.com/wp-content/uploads/2023/05/Francesco-Totti-instagram-24022023-grantennistoscana.it-2.jpg" className="fotoDerCapitano"/></a>
                </th>
                <th id="thSpacer"></th>
                <th className="stdTh">
                    Zubyr
                </th>
                <th>
                    Zubbear
                </th>
                <th>
                    Zuzzupets
                </th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
};

export default DefaultHeader;