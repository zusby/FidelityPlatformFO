import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColorColumn } from "./columns";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { AlertModal } from "@/components/Modals/alert-modal";
import Loading from "@/components/loadingPage";


interface CellActionProps {
    data: ColorColumn
}


export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const base_url = import.meta.env.VITE_BACKEND_URL;

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Color ID copied to clipboard")
    }


    const onDelete = async () => {
        try {
            setLoading(true);

            fetch(base_url + `color/${params.storeID}/${data.id}/delete`, {
                method: 'DELETE',
            });
            toast.loading(`Deleting ${data.name}...`);

            setTimeout(() => {
                toast.dismiss();
                toast.success(`${data.name} has been succesfully deleted`);
                setTimeout(() => {
                }, 1000);
                navigate(0);
            }, 3000);


        } catch (error) {
            toast.error("Make sure you removed products that use this color first.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }


    if (loading) {
        return <Loading />
    }

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <DropdownMenu>

                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only"></span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/${params.storeID}/colors/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}