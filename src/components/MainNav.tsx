import { cn } from "@/lib/utils";
import { Link, useLocation, useParams } from "react-router-dom";

export default function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathName = useLocation(); //.pathname
    const params = useParams(); //storeID

    const routes = [
        {
            href: `/${params.storeID}`,
            label: 'Overview',
            active: pathName.pathname === `/${params.storeID}`
        },
        {
            href: `/${params.storeID}/billBoards`,
            label: 'BillBoards',
            active: pathName.pathname === `/${params.storeID}/billBoards`
        },

        {
            href: `/${params.storeID}/category`,
            label: 'Categories',
            active: pathName.pathname === `/${params.storeID}/category`
        },
        {
            href: `/${params.storeID}/sizes`,
            label: 'Sizes',
            active: pathName.pathname === `/${params.storeID}/sizes`
        },
        {
            href: `/${params.storeID}/colors`,
            label: 'Colors',
            active: pathName.pathname === `/${params.storeID}/colors`
        },
        {
            href: `/${params.storeID}/products`,
            label: 'Products',
            active: pathName.pathname === `/${params.storeID}/products`
        },
        {
            href: `/${params.storeID}/orders`,
            label: 'Orders',
            active: pathName.pathname === `/${params.storeID}/orders`
        },
        {
            href: `/${params.storeID}/settings`,
            label: 'Settings',
            active: pathName.pathname === `/${params.storeID}/settings`
        },
    ];


    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-4", className)}
            {...props}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    to={route.href}
                    className={cn("text-sm  font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white" : "text-muted-foreground ")}>
                    {route.label}
                </Link>
            ))}

        </nav>
    )
}