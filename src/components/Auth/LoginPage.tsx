
import { ReactComponent as UserIcon } from '@/components/ui/user.svg'
import * as React from "react"
import { Icons } from "../ui/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth'
import { Auth } from '@/lib/FireBase'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { RegistrationDialog } from './RegistrationPage'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function LoginPage({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)


    const formSchema = z.object({
        email: z.string().email("invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters long")
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const SignIn = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        signInWithEmailAndPassword(Auth, values.email, values.password)
            .then((userCredential: UserCredential) => {
                const user = userCredential.user;
                if (!user.emailVerified) {

                    Auth.updateCurrentUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem('photoURL', user.photoURL ? user.photoURL : '');
                    console.log(Auth.currentUser);

                }
            }).catch((error) => console.log(error.message));

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)

    }



    return (
        <div className={cn("grid gap-3 justify-center ", className)} {...props}>



            <Card>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(SignIn)}>
                        <CardContent className=' h-auto w-auto py-1.5'>

                            <div className="grid gap-4">
                                <CardTitle className=' w-ful left-1 flex '>Sign-in</CardTitle>
                                <div className='flex justify-center align-middle '>
                                    <UserIcon className=' w-1/2   shadow-black'></UserIcon>
                                </div>
                                <FormField
                                    name='email'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className=' '>
                                            <FormLabel className='align-text-top'>Email Address:</FormLabel>
                                            <FormControl className='w-full'>
                                                <Input {...field} autoFocus required id='email' autoComplete='email' name='email' placeholder='example@info.com' className='w-full' />
                                            </FormControl>
                                        </FormItem>)}
                                />
                                <FormField
                                    name='password'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Passwrod</FormLabel>
                                            <FormControl>
                                                <Input {...field} required type='password' id='password' autoComplete='password' name='password' placeholder='Insert your password' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>)}
                                />
                                <div className="grid gap-1">

                                    <a href='' className='  text-slate-500 flex left-0 bottom-0 '>Forgot Password?</a>
                                </div>
                                <CardFooter className='w-full grid '>
                                    <div>
                                        <Button disabled={isLoading} className='w-full grid-auto-flow scale-105'>
                                            {isLoading && (<Icons.spinner className="animate-spin" />)}
                                            Sign In
                                        </Button>
                                    </div>
                                    <div className='grid-flow-col gap-1 py-3 row-auto '>
                                        <RegistrationDialog />
                                    </div>

                                </CardFooter>
                            </div>
                        </CardContent>
                    </form>
                </Form>



            </Card>

        </div>
    )
}