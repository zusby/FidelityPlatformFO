import React, { useEffect } from "react";
import { Button } from "./button";
import { ImagePlus } from "lucide-react";

interface CloudinaryUploadWidgetProps {
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpload: (result: any) => void;
  uploadPreset: string;
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({
  disabled,
  onUpload,
  uploadPreset,
}) => {



  useEffect(() => {
    const cloudName = import.meta.env.CLOUDINARY_CLOUDNAME;

    //@ts-expect-error cloudinary error
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,

      },
      (error: unknown, result: { event: string; info: { secure_url: string } }) => {
        if (!error && result && result.event === "success") {

          document?.getElementById("uploadedimage")?.setAttribute("src", result.info.secure_url);
          onUpload(result);
          myWidget.close();
        }
      }
    );

    const buttonElement = document.getElementById("upload_widget");


    buttonElement?.removeEventListener("click", openWidget);

    function openWidget() {
      myWidget.open();
    }

    buttonElement?.addEventListener("click", openWidget, false);

    return () => {
      buttonElement?.removeEventListener("click", openWidget);
    };
  }, [onUpload, uploadPreset]);

  return (
    <Button id="upload_widget" className="sticky" disabled={disabled} variant="secondary" onClick={(event) => { event.preventDefault() }}>
      <ImagePlus className="h-4 w-4 mr-2" />
      Upload an Image
    </Button>
  );
};

export default CloudinaryUploadWidget;