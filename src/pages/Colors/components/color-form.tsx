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
import Loading from "@/components/loadingPage";

interface ColorFormProps {
    initialData: Color | null;

}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4),
    storeID: z.string(),
    updatedAt: z.optional(z.unknown()),
    createdAt: z.optional(z.unknown()),

})



type ColorFormValues = z.infer<typeof formSchema>;

export const ColorForm: React.FC<ColorFormProps> = ({
    initialData,

}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const title = initialData ? "Edit color" : "Create color";
    const description = initialData ? "Edit color" : "Add a new color";
    //  const toastMessage = initialData ? "color uptaded" : "color created.";
    const action = initialData ? "Save Changes" : "Create color";

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
            storeID: params.storeID,
        },
    })

    const onSubmit = async (data: ColorFormValues) => {
        try {
            setLoading(true)
            fetch("http://localhost:8080/api/v1/color/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });




            toast.loading("Updating your color...");
            setTimeout(() => {
                toast.dismiss();

                setTimeout(() => {
                    toast.success("color updated successfully");
                    setTimeout(() => {
                        navigate(`/${params.storeID}/colors`)
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
            fetch(`http://localhost:8080/api/v1/color/${params.storeID}/${params.colorID}/delete`, {
                method: 'DELETE',
            });

            toast.loading(`Deleting ${initialData?.name}...`);

            setTimeout(() => {
                toast.dismiss();
                toast.success(`${initialData?.name} has been succesfully deleted`);
                setTimeout(() => {
                    navigate(`/${params.storeID}/colors`);
                }, 1000);
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
                        color="icon"
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
                                        <Input disabled={loading} placeholder="Color name" {...field} />
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
                                        <div className="flex items-center gap-x-4">
                                            <Input disabled={loading} placeholder="#000" {...field} />
                                            <div className="p-3 rounded-full" style={{ backgroundColor: field.value, boxShadow: 'none', border: '1px solid transparent' }} ></div>

                                        </div>
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