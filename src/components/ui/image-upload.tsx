import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { Trash } from "lucide-react";
import CloudinaryUploadWidget from "./cloudinary-upload-widget";

interface ImageUploadProps {
    disabled?: boolean;
    onchange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onchange,
    onRemove,
    value,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    const onUpload = (result: any) => {
        onchange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex flex-wrap gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <img src={url} className="object-cover w-full h-full" alt="Image" />
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <CloudinaryUploadWidget onUpload={onUpload} uploadPreset="nkobp9eh" disabled={disabled} />
            </div>
        </div>
    );
};

export default ImageUpload;