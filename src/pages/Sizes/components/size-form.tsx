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

interface SizeFormProps {
    initialData: Size | null;

}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
    storeID: z.string(),
    updatedAt: z.optional(z.unknown()),
    createdAt: z.optional(z.unknown()),

})



type SizeFormValues = z.infer<typeof formSchema>;

export const SizeForm: React.FC<SizeFormProps> = ({
    initialData,

}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const title = initialData ? "Edit size" : "Create size";
    const description = initialData ? "Edit size" : "Add a new size";
    //  const toastMessage = initialData ? "size uptaded" : "size created.";
    const action = initialData ? "Save Changes" : "Create size";

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: '',
            storeID: params.storeID,
        },
    })

    const onSubmit = async (data: SizeFormValues) => {
        try {
            setLoading(true)
            console.log(data);
            fetch("http://localhost:8080/api/v1/size/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });




            toast.loading("Updating your size...");
            setTimeout(() => {
                toast.dismiss();

                setTimeout(() => {
                    toast.success("size updated successfully");
                    setTimeout(() => {
                        navigate(`/${params.storeID}/sizes`)
                    }, 1000);
                }, 1000);
            }, 3000);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = () => {
        try {
            setLoading(true);
            fetch(`http://localhost:8080/api/v1/size/${params.storeID}/${params.sizeID}/delete`, {
                method: 'DELETE',
            });

            toast.loading(`Deleting ${initialData?.name}...`);

            setTimeout(() => {
                toast.dismiss();
                toast.success(`${initialData?.name} has been succesfully deleted`);
                setTimeout(() => {
                    navigate(`/${params.storeID}/sizes`);
                }, 1000);
            }, 3000);


        } catch (error) {
            toast.error("Make sure you removed products that use this sizes first.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
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
                                        <Input disabled={loading} placeholder="Size name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Size value" {...field} />
                                    </FormControl>
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