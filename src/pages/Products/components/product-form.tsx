import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from 'uuid';

interface ProductFormProps {
    initialData: Product | null
    categories: Category[]
    colors: Color[]
    sizes: Size[]
    images: Image[]
}

const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({
        url: z.string(),
        productID: z.string().min(1),
    }).array(),
    storeID: z.string().min(1),
    price: z.coerce.number().min(1),
    categoryID: z.string().min(1),
    colorID: z.string().min(1),
    sizeID: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
    id: z.optional(z.string().min(1)),
    createdAt: z.optional(z.unknown()),
    updatedAt: z.optional(z.unknown()),
})



type ProductFormValues = z.infer<typeof formSchema>;

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    colors,
    sizes,
    images
}) => {



    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const title = initialData ? "Edit Product" : "Create Product";
    const description = initialData ? "Edit Product" : "Add a new Product";
    //  const toastMessage = initialData ? "Product uptaded" : "Product created.";
    const action = initialData ? "Save Changes" : "Create Product";


    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price)),
            images: images
        } : {
            id: uuidv4(),
            name: '',
            images: [],
            price: 0,
            isFeatured: false,
            isArchived: false,
            storeID: params.storeID,
        },
    })


    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);


            await fetch("http://localhost:8080/api/v1/product/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });


            fetch("http://localhost:8080/api/v1/image/addList", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data.images),
            });


            setTimeout(() => {
                toast.dismiss();
                toast.success(`${initialData?.name} has been succesfully deleted`);
                setTimeout(() => {
                    navigate(`/${params.storeID}/products`);
                }, 500);
            }, 2000);


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

            fetch(`http://localhost:8080/api/v1/Product/${params.storeID}/${params.ProductID}/delete`, {
                method: 'DELETE',
            });

            fetch(`http://localhost:8080/api/v1/image/${params.ProductID}/delete`, {
                method: 'DELETE',
            });
            toast.loading(`Deleting ${initialData?.name}...`);

            setTimeout(() => {
                toast.dismiss();
                toast.success(`${initialData?.name} has been succesfully deleted`);
                setTimeout(() => {
                    navigate(`/${params.storeID}/products`);
                }, 1000);
            }, 3000);


        } catch (error) {
            toast.error("Make sure you removed categories that use this Product first.")
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

                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel  >Images</FormLabel>

                                <FormControl>
                                    <ImageUpload value={field.value.map((image) => image.url)}
                                        disabled={loading}
                                        onchange={(url) => field.onChange([...field.value, { url, productID: initialData ? initialData.id : form.getValues("id") }])}
                                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    />
                                </FormControl>
                                <FormDescription>Please upload one image at the time</FormDescription>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-3 gap-8 ">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryID"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>

                                    <Select
                                        disabled={loading}
                                        onValueChange={(selectedCategoryID) => {
                                            const selectedCategory = categories.find((category) => category.id === selectedCategoryID);
                                            if (selectedCategory) {
                                                form.setValue('categoryID', selectedCategory.id);
                                            }
                                        }}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id} >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sizeID"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={(selectedSizeID) => {
                                            // Find the selected size within the 'sizes' array
                                            const selectedSize = sizes.find((size) => size.id === selectedSizeID);
                                            if (selectedSize) {
                                                form.setValue('sizeID', selectedSize.id);
                                            }
                                        }}
                                        value={field.value}
                                        defaultValue={field.value}

                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a size" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sizes.map((size) => (
                                                <SelectItem key={size.id} value={size.id}>
                                                    {size.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="colorID"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={(selectedColorID) => {
                                            const selectedColor = colors.find((color) => color.id === selectedColorID);
                                            if (selectedColor) {
                                                form.setValue('colorID', selectedColor.id);
                                            }
                                        }}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {colors.map((color) => (
                                                <SelectItem key={color.id} value={color.id}>
                                                    {color.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>

                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            This product will appear on the home page
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Archived
                                        </FormLabel>
                                        <FormDescription>
                                            This product will not appear anywhere on the store
                                        </FormDescription>
                                    </div>
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