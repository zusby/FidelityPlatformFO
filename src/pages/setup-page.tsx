import { useEffect } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { StoreModal } from "@/components/Modals/store-modal";
import Navbar from "@/components/Navbar";

const SetupPage = () => {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);


    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <>
            <Navbar />
            <StoreModal />
        </>
    );
};

export default SetupPage;