import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"


import { useNavigate, useParams } from "react-router-dom"
import { ColorColumn, columns } from "../columns"
import { DataTable } from "@/components/ui/data-table"

interface ColorsClientProps {
    data: ColorColumn[]
}

export const ColorsClient: React.FC<ColorsClientProps> = ({
    data
}) => {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Colors (${data.length})`}
                    description="Manage colors for your store"
                />
                <Button onClick={() => navigate(`/${params.storeID}/colors/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />


        </>
    )
}