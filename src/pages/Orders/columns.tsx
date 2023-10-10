import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

export type OrderColumn = {
    id: string
    phone: string
    address: string
    isPaid: boolean
    products: string
    totalPrice: string
    createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "totalPrice",
        header: "Total price",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.isPaid ? (
                    <Check size={24} color="green" />
                ) : (
                    <X size={24} color="red" />
                )}
                {row.original.isPaid ? "Paid" : "Not Paid"}
            </div>
        ),
    },
];