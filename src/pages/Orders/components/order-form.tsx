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
import ImageUpload from "@/components/ui/image-upload";


interface BillBoardFormProps {
    initialData: BillBoard | null
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1, "You must add a background image"),
    storeID: z.string().min(1),
    id: z.optional(z.string().min(1)),
    createdAt: z.optional(z.unknown()),
    updatedAt: z.optional(z.unknown()),
})



type BillboardFormValues = z.infer<typeof formSchema>;

export const BillBoardForm: React.FC<BillBoardFormProps> = ({
    initialData
}) => {


    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const title = initialData ? "Edit billboard" : "Create billBoard";
    const description = initialData ? "Edit billboard" : "Add a new Billboard";
    //  const toastMessage = initialData ? "Billboard uptaded" : "Billboard created.";
    const action = initialData ? "Save Changes" : "Create billBoard";

    console.log(initialData);
    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: '',
            storeID: params.storeID,
        },
    })

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);

            console.log(data);

            fetch("http://localhost:8080/api/v1/billboard/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });




            toast.loading("Updating your BillBoard...");
            setTimeout(() => {
                toast.dismiss();

                setTimeout(() => {
                    toast.success("BillBoard updated successfully");
                    setTimeout(() => {
                        navigate(`/${params.storeID}/billboards`)
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
            //TODO aggiungere 

            fetch(`http://localhost:8080/api/v1/billboard/${params.storeID}/${params.billboardID}/delete`, {
                method: 'DELETE',
            });

            toast.loading(`Deleting ${initialData?.label}...`);

            setTimeout(() => {
                toast.dismiss();
                toast.success(`${initialData?.label} has been succesfully deleted`);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }, 3000);


        } catch (error) {
            toast.error("Make sure you removed categories that use this billboard first.")
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
                        onClick={() => console.log(initialData)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}

            </div>
            <Separator />


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Background image</FormLabel>

                                <FormControl>
                                    <ImageUpload value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onchange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 gap-8 w-1/4">

                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard label" {...field} />
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