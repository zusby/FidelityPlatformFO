import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"

import { useNavigate, useParams } from "react-router-dom"

export const BillBoardClient = () =>{
    const navigate = useNavigate();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                title="BillBoards (0)"
                description="Manage Billboards for your store"
                />
                <Button onClick={()=> navigate(`/${params.storeID}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator/>
        </>
    )
}