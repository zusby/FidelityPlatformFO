import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z  from "zod";
import toast from "react-hot-toast"


interface settingsFormProps{
    initialData:Store
}

const formSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    vatNumber: z.string().min(1),
    shopOwners: z.array(z.string().min(1)),
    employees: z.optional(z.array(z.string().min(1))),

    cashBackRule: z.record(z.unknown()).nullable(),
    couponRule: z.record(z.unknown()).nullable(),
    pointsRule: z.record(z.unknown()).nullable(),
    levelsRule: z.record(z.unknown()).nullable(),
    prizes: z.optional(z.object({
        awards: z.array(z.object({
            cost: z.number().min(1),
            description: z.string(),
            characteristics: z.string(),
            id: z.string().min(1),
        }))
    })),
    catalogue: z.optional(z.object({
        catalogue: z.array(
            z.object({
                cost: z.number().min(1),
                description: z.string(),
                characteristics: z.string(),
                id: z.string().min(1),
            }),
        ),
    })),
    space: z.optional(z.object({
        description: z.string().min(1),
        shopTelephoneNumber: z.string().min(1),
        shopAddress: z.object({
            street: z.string().min(1),
            zipCode: z.string().min(1),
            city: z.string().min(1),
            province: z.string().min(1),
        }),
        email: z.string().email(),
    })),

})





type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm:React.FC<settingsFormProps> = ({
    initialData
})=>{

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
     
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    
    })

    const onSubmit = async (data: SettingsFormValues)=>{
        try {
            setLoading(true);
            console.log(form.formState); // Log validation errors

            console.log(data);
            fetch("http://localhost:8080/api/v1/shop/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            
        } catch (error) {
            toast.error("Something went wrong.");
        }finally{
            setLoading(false);
        }
    }
 
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                title="Settings"
                description="Manage store preferences"
                />
                <Button 
                disabled={loading}
                variant="destructive"
                size="icon"
                onClick={()=>setOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
            </div>
            <Separator /> 
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-1 gap-8 w-1/4">
                         <FormField
                         control={form.control}
                         name="name"
                         render={({ field })=>(
                            <FormItem>
                                <FormLabel > Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}  {...field}/>
                                </FormControl>
                                <FormDescription>
                                        The name that will be displayed of your Store
                                    </FormDescription>
                                <FormMessage/>
                            </FormItem>
                         )}
                         />
                         
                         <FormField
                         control={form.control}
                         name="space.email"
                         render={({ field })=>(
                            <FormItem>
                                
                                <FormLabel className="flex items-center gap-1"> 
                                <Mail size={20}/> Email
                                </FormLabel>
                                
                                <FormControl>
                                    
                                    <Input disabled={loading}  {...field}/>
                                </FormControl>
                                <FormDescription>
                                        The Email used to contact your store
                                    </FormDescription>
                                <FormMessage/>
                            </FormItem>
                         )}
                         />
                         <FormField
                         control={form.control}
                         name="vatNumber"
                         render={({ field })=>(
                            <FormItem>
                                <FormLabel> VAT Number</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}  {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                         )}
                         />
                         <FormField
                         control={form.control}
                         name="space.shopTelephoneNumber"
                         render={({ field })=>(
                            <FormItem>
                                <FormLabel className=" flex items-center gap-1">
                                    <Phone size={20}/>  Telephone Number</FormLabel>
                                <FormControl>
                                    <Input disabled={loading}  {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                         )}
                         />

                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit"  >
                    Save Changes    
                    </Button>

                </form>
            </Form>
        </>
    );
};