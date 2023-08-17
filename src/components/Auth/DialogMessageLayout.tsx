import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


export function AlertDestructive(props: { message: string; title: string; }) {
    const { message, title } = props;


    return (
        <div className="fixed bottom-4 left-4 z-50 w-60">
            <Alert variant="destructive" className=" p-2 rounded bg-slate-900" >
                <AlertCircle className="h-8 w-8" />
                <AlertTitle >{title}</AlertTitle>
                <AlertDescription className="text-white">
                    {message}.
                </AlertDescription>
            </Alert>
        </div>
    )
}
