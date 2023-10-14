import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Auth } from "@/lib/FireBase";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { StoreIcon } from "lucide-react";



const formSchema = z.object({
    vatNumber: z.string().min(1),
    name: z.string().min(1),
    shopOwners: z.array(z.string()).optional(),
    space: z.object({
        description: z.string(),
        shopTelephoneNumber: z.string().min(1),
        shopAddress: z.object({
            street: z.string().min(1),
            zipCode: z.string().min(1),
            city: z.string().min(1),
            province: z.string().min(1),
        }),
        email: z.string().email().min(1),
    }),
});


export const StoreModal = () => {

    const user = Auth.currentUser;
    const storeModal = useStoreModal();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vatNumber: '',
            name: '',
            shopOwners: [],
            space: {
                description: '',
                shopTelephoneNumber: '',
                shopAddress: {
                    street: '',
                    zipCode: '',
                    city: '',
                    province: '',
                },
                email: '',
            },
        },
    });

    const onSubmit = async (form: z.infer<typeof formSchema>) => {

        if (user) {
            form.shopOwners = [user.uid];
            toast.loading("Creating shop");
            await fetch("http://localhost:8080/api/v1/shop/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            }).finally(() => {
                toast.dismiss();
                navigate(0)
                storeModal.onClose();
            });
        }
    }



    return (
        <>

            <Modal
                title="Create your store"
                description="Add a new store to manage products and categories"
                isOpen={storeModal.isOpen}
                onClose={storeModal.onClose}
                Icon={StoreIcon}
            >+

                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>

                                {/* VAT Number */}
                                <FormField
                                    name="name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name:</FormLabel>
                                            <FormControl>
                                                <Input {...field} required placeholder="Name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="vatNumber"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>VAT Number:</FormLabel>
                                            <FormControl>
                                                <Input {...field} required placeholder="VAT Number" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="space.shopTelephoneNumber"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Shop Telephone Number:</FormLabel>
                                            <FormControl>
                                                <Input {...field} required placeholder="Shop Telephone Number" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Shop Address */}
                                <FormField
                                    name="space.shopAddress.street"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Street:</FormLabel>
                                            <FormControl>
                                                <Input {...field} required placeholder="Street" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="space.shopAddress.zipCode"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zip Code:</FormLabel>
                                            <FormControl>
                                                <Input {...field} required placeholder="Zip Code" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="space.shopAddress.city"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City:</FormLabel>
                                            <FormControl>
                                                <Input {...field} required placeholder="City" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="space.shopAddress.province"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Province:</FormLabel>
                                            <FormControl>
                                                <Input {...field} required placeholder="Province" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    name="space.email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email:</FormLabel>
                                            <FormControl>
                                                <Input {...field} required placeholder="Email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                    <Button variant="outline" onClick={storeModal.onClose} > Cancel</Button>
                                    <Button type="submit"> Continue </Button>
                                </div>

                            </form>

                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    );
}