
import Navbar from "@/components/Navbar"
import { BillBoardClient } from "./components/client";

const BillBoardsPage = () =>{

    return (
        <>
        <Navbar/> 

            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <BillBoardClient/>
                     
                </div>
            </div>
        </>
    );
}

export default BillBoardsPage