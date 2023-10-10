import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router";
import { AlertModal } from "@/components/Modals/alert-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Loading from "@/components/loadingPage";


interface CategoryFormProps {
    initialData: Category | null;
    billboards: BillBoard[];
}

const formSchema = z.object({
    name: z.string().min(1),
    billboard: z.object({
        id: z.string().min(1),
        storeID: z.string().min(1),
        label: z.string().min(1),
        imageUrl: z.string().min(1),
        createdAt: z.optional(z.unknown()),
        updatedAt: z.optional(z.unknown()),
    }),
    storeID: z.string().min(1),
    updatedAt: z.optional(z.unknown()),
    createdAt: z.optional(z.unknown()),

})



type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
    billboards
}) => {


    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit category" : "Add a new category";
    //  const toastMessage = initialData ? "category uptaded" : "category created.";
    const action = initialData ? "Save Changes" : "Create category";

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            billboard: {},
            storeID: params.storeID,
        },
    })

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true)

            fetch("http://localhost:8080/api/v1/category/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });




            toast.loading("Updating your category...");
            setTimeout(() => {
                toast.dismiss();

                setTimeout(() => {
                    toast.success("category updated successfully");
                    setTimeout(() => {
                        navigate(`/${params.storeID}/category`)
                    }, 1000);
                }, 1000);
            }, 3000);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/v1/product/category/${params.categoryID}/all`);

            const productsData = await response.json();


            if (productsData && productsData.length > 0) {
                toast.error("Products exist in this category. Delete them first.");
            } else {
                await fetch(`http://localhost:8080/api/v1/category/${params.storeID}/${params.categoryID}/delete`, {
                    method: 'DELETE',
                });

                toast.loading(`Deleting ${initialData?.name}...`);

                setTimeout(() => {
                    toast.dismiss();
                    toast.success(`${initialData?.name} has been successfully deleted`);
                    setTimeout(() => {
                        navigate(`/${params.storeID}/category`);
                    }, 1000);
                }, 3000);
            }
        } catch (error) {
            toast.error("there was an error with your request");
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
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData?.id && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}

            </div>
            <Separator />


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">



                    <div className="grid grid-cols-3 gap-8 ">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Category name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboard"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>

                                    <Select
                                        disabled={loading}
                                        onValueChange={(selectedBillboardId) => {
                                            const selectedBillboard = billboards.find((billboard) => billboard.id === selectedBillboardId);
                                            if (selectedBillboard) {
                                                form.setValue('billboard', selectedBillboard);
                                            }
                                        }}
                                        value={field.value.id}
                                        defaultValue={field.value.id}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value.id} placeholder="Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem key={billboard.id} value={billboard.id}>
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit"  >
                        {action}
                    </Button>

                </form>
            </Form>

        </>
    );
};