import { LucideIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean
    onClose: () => void;
    children?: React.ReactNode;
    Icon: LucideIcon

}
export const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children,
    Icon
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <Icon />
                    <div className="flex items-center">

                        <DialogTitle>{title}</DialogTitle>
                    </div>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}