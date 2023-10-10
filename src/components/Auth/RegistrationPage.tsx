/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './DatePicker.css'
import 'react-calendar/dist/Calendar.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "@/lib/FireBase";
import { useNavigate } from "react-router";
import { DateField, DatePicker } from "../ui/date-picker";
import { getLocalTimeZone } from "@internationalized/date";


export function RegistrationDialog() {

    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any


    const formSchema = z.object({
        name: z.string().min(1, { message: "Name cant be empty" }),
        rank: z.optional(z.string()),
        surname: z.string().min(1, { message: "Surname cant be empty" }),
        telephoneNumber: z.string().min(1, { message: "telephone Number cant be empty" }),
        birthDate: z.date().min(new Date("1900-01-01"), { message: "Too old" }),
        email: z.string().email({ message: "invalid email" }),
        password: z.string().min(6, "the password has a minimum length of 6"),
        address: z.object({
            street: z.string(),
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
            birthDate: new Date("1900-01-01"),
            telephoneNumber: "",
            address: {
                street: "",
                zipCode: "",
                province: "",
                city: ""
            },
            email: "",
            password: "",
            rank: "CUSTOMER"
        }
    })


    const submitRegistration = async (values: z.infer<typeof formSchema>) => {
        form.setValue('rank', 'CUSTOMER');
        createUserWithEmailAndPassword(Auth, values.email, values.password)
            .then((userCredencial) => {
                const user = userCredencial.user;
                if (user)
                    registerUser(values);

                navigate("/");
            }).catch((error) => console.log(error.message))


    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function registerUser(user: any) {
        fetch(`http://localhost:8080/api/v1/customer/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(user),
            }).catch((error) => console.error(error));
    }














    return (
        <Dialog>
            <DialogTrigger asChild className="">
                <a href="#">Dont have an account? <strong> Sign Up!</strong></a>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-screen fixed overflow-auto">
                <DialogHeader>
                    <DialogTitle>Create your account!</DialogTitle>
                    <DialogDescription>
                        Please fill in every requirement
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <Form {...form}>
                        <form className='mt-10 scroll-m-4' onSubmit={form.handleSubmit(submitRegistration)}>
                            <FormField name='name'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className=' '>
                                        <FormLabel className='align-text-top'>Name:</FormLabel>
                                        <FormControl className='w-full'>
                                            <Input {...field} required id='name' name='name' autoFocus placeholder='name' className='w-full' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField name='surname'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Surname:</FormLabel>
                                        <FormControl>
                                            <Input {...field} required id='surname' autoComplete='surname' name='surname' placeholder='surname' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField name='telephoneNumber'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telephone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} required id='telephoneNumber' autoComplete='telephoneNumber' name='telephoneNumber' placeholder='334...' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField name='birthDate'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Birth Date:</FormLabel>
                                        <FormControl>

                                            <DatePicker label="Pick a date" onChange={(date) => field.value = date.toDate(getLocalTimeZone())} >
                                                <DateField />
                                            </DatePicker>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField name='address.street'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} required id='street' autoComplete='street' name='street' placeholder='piazza garibaldi 3' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField name='address.zipCode'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Zip Code:</FormLabel>
                                        <FormControl>
                                            <Input {...field} required id='zipcode' autoComplete='zipcode' name='zipcode' placeholder='63900' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField name='address.city'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City:</FormLabel>
                                        <FormControl>
                                            <Input {...field} required id='city' autoComplete='city' name='city' placeholder='Roma' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField name='address.province'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Province:</FormLabel>
                                        <FormControl>
                                            <Input {...field} required id='province' autoComplete='province' name='province' placeholder='Roma' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField name='email'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input {...field} required id='email' autoComplete='email' name='email' placeholder='example@info.com' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                            />
                            <FormField name='password'
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

                            <DialogFooter>
                                <Button type="submit" className="w-full mt-6">Submit!</Button>
                            </DialogFooter>
                        </form>

                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
//<div className="grid grid-cols-4 items-center gap-4">