import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"


import { useNavigate, useParams } from "react-router-dom"
import { SizeColumn, columns } from "../columns"
import { DataTable } from "@/components/ui/data-table"

interface SizeClientProps {
    data: SizeColumn[]
}

export const SizesClient: React.FC<SizeClientProps> = ({
    data
}) => {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage sizes for your store"
                />
                <Button onClick={() => navigate(`/${params.storeID}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />


        </>
    )
}