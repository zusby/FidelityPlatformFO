import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { sendPasswordResetEmail } from "firebase/auth";
import { Auth } from "@/lib/FireBase";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {

    const formSchema = z.object({
        email: z.string().email("invalid email"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const res = sendPasswordResetEmail(Auth, data.email);
        toast.promise(res, {
            loading: "Sending password reset link",
            success: "Reset password sent succesfully",
            error: (res) => res.code
        })
    }


    return (
        <div className="space-y-4 py-2 pb-4">
            <Toaster />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        name='email'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className=' '>
                                <FormLabel className='align-text-top'>Email Address:</FormLabel>
                                <FormControl>
                                    <Input {...field} autoFocus required id='email' autoComplete='email' name='email' placeholder='example@info.com' className='w-full' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                    />
                    <div className='pt-6 space-x-2 flex items-center justify-center w-full'>
                        <Button  >Submit</Button>
                    </div>

                </form>
            </Form>

        </div>
    )

}

export default ForgotPassword;