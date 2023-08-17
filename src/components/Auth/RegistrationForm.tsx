interface User {
    name: "string",
    surname: "string",
    telephoneNumber: "string",
    email: "string",
    address: {
        street: "string",
        zipCode: "string",
        city: "string",
        province: "string"
    },
    birthDate: "2023-08-08T21:44:56.810Z",
    rank: "CUSTOMER",
    id: "string"
}
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
//import { Auth } from '@/lib/FireBase.js'
import { Input } from '../ui/input';

import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
//import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '../ui/button';


export default function RegistrationForm() {


    const formSchema = z.object({
        name: z.string().min(1, { message: "Name cant be empty" }),
        surname: z.string().min(1, { message: "Surname cant be empty" }),
        telephoneNumber: z.string().min(1, { message: "telephone Number cant be empty" }),
        birthDate: z.date().min(new Date("1900-01-01"), { message: "Too old" }),
        email: z.string().email({ message: "invalid email" }),
        password: z.string().min(6, { message: "the password has a minimum length of 6" }),
        address: z.object({
            street: z.string().min(1, { message: "Empty address is not valid" }),
            zipCode: z.string().min(1, { message: "Empty address is not valid" }),
            city: z.string().min(1, { message: "Empty address is not valid" }),
            province: z.string().min(1, { message: "Empty address is not valid" }),
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            telephoneNumber: "",
            address: {},
            email: "",
            password: ""

        }
    })


    const submitRegistration = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }


    return (
        <>
            <div >
                <div className='m-12  flex flex-col px-1  items-center w-auto'>
                    {/*login form*/}
                    <h1>Sign in</h1>



                    <Form {...form}>
                        <form className='mt-10' onSubmit={form.handleSubmit(submitRegistration)}>
                            <FormField name='email'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className=' '>
                                        <FormLabel className='align-text-top'>Email Address:</FormLabel>
                                        <FormControl className='w-full'>
                                            <Input {...field} required id='email' autoComplete='email' name='email' placeholder='insert your email here' className='w-full' />
                                        </FormControl>
                                    </FormItem>)}
                            />
                            <FormField name='password'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>passwrod</FormLabel>
                                        <FormControl>
                                            <Input {...field} required id='password' autoComplete='password' name='password' autoFocus placeholder='insert your email here' />
                                        </FormControl>
                                    </FormItem>)}
                            />
                        </form>



                        <Button type="submit" className='w-full mt-3 mb-2' variant="default">
                            Sign up
                        </Button>

                        <div className="flex flex-col sm:flex-row justify-between">

                            <a href="#" className="text-sm text-blue-500 hover:underline mb-2 sm:mb-0">
                                Forgot password?
                            </a>

                            {/* Right side content */}

                        </div>
                    </Form>

                </div >
            </div >
        </>
    )
}


/*
    const submitRegistration = async (registrationForm: z.infer<typeof formSchema>) {
        createUserWithEmailAndPassword(Auth, values.email, values.password)
            .then((userCredencial) => {

                const user = userCredencial.user;
                if (user !== null) {
                    registerUser(registrationForm)
                    sendEmailVerification(Auth.currentUser);
                    setDiagMessage("Success!")
                    setErrorMessage("You have completed the registration succesfully! before logging in verify your email")
                    setErrorDialogOpen(true)

                }
            })
            .catch((error) => {
                setDiagMessage("Ops..")
                setErrorMessage(error.message)
                setErrorDialogOpen(true)
            })

    };
}


*/