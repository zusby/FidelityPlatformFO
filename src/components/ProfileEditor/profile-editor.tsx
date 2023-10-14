
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { LockIcon, UnlockIcon, UserCog } from "lucide-react";
import { useState } from "react";
import { Auth } from "@/lib/FireBase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";



interface ProfileEditorProps {
    user: UserProfile;
    isOpen: boolean;
    onClose: () => void;
}


const formSchema = z.object({
    name: z.string().optional(),
    surname: z.string().optional(),
    telephoneNumber: z.string().optional(),
    email: z.string().optional(),

});

type ProfileEditorValues = z.infer<typeof formSchema>;

const ProfileForm: React.FC<ProfileEditorProps> = ({
    user,
    isOpen,
    onClose
}) => {
    const [disabled, setDisabled] = useState<boolean>(true);


    const form = useForm<ProfileEditorValues>({
        resolver: zodResolver(formSchema),
        defaultValues: user,
    })

    const resetPassword = (email: string) => {
        toast.loading("Sending reset password link", { id: "loading" })

        sendPasswordResetEmail(Auth, email)
            .then(() => { toast.success("A password reset link has been sent to your email") })
            .catch(() => { toast.error("An error has occurred, please try again later") }).finally(() => toast.remove("loading"))

    }

    const changeDisabledState = () => {
        setDisabled(!disabled);
    }



    const onSubmit = async (data: ProfileEditorValues) => {
        user.email = data.email ?? user.email;
        user.name = data.name ?? user.name;
        user.surname = data.surname ?? user.surname;
        user.telephoneNumber = data.telephoneNumber ?? user.telephoneNumber;


        const res = fetch(`http://localhost:8080/api/v1/customer/${user.id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        toast.promise(res, {
            loading: 'Updating profile',
            success: ' Profile updated',
            error: 'There was an error while updating your profile'
        })

    }




    return (
        <Modal Icon={UserCog} description="Manage your personal information" title="Edit profile" onClose={onClose} isOpen={isOpen} >
            <div className="space-y-4 py-2 pb-4">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">



                        <div className="grid grid-cols-2 gap-8 ">

                            <FormField
                                control={form.control}
                                name="name"
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">Name</FormLabel>
                                        <FormControl>
                                            <Input id="name" placeholder="Product name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="surname"
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Surname</FormLabel>
                                        <FormControl>
                                            <Input id="surname" placeholder="Size name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input id="email" type="email" placeholder="Size name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="telephoneNumber"
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Size name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="pt-6 flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                {disabled ? <LockIcon onClick={changeDisabledState} className="hover:bg-slate-200 rounded-md" /> : <UnlockIcon onClick={changeDisabledState} className="hover:bg-slate-200 rounded-md" />}
                                <Button variant="outline" type="button" disabled={disabled} onClick={() => { resetPassword(user?.email ?? "") }}>
                                    Reset password
                                </Button>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="outline" type="button" onClick={onClose}> Cancel</Button>
                                <Button type="submit"> Continue </Button>
                            </div>
                        </div>

                    </form>
                </Form>


            </div>
        </Modal>
    )

}

export default ProfileForm;