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
    const cloudName = "durpaps2k"; // replace with your own cloud name

    //@ts-expect-error cloudinary error
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,

      },
      (error: unknown, result: { event: string; info: { secure_url: string } }) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          document?.getElementById("uploadedimage")?.setAttribute("src", result.info.secure_url);
          onUpload(result); // Call the onUpload function with the result
        }
      }
    );

    const buttonElement = document.getElementById("upload_widget");

    // Remove existing event listeners before adding a new one
    buttonElement?.removeEventListener("click", openWidget);

    function openWidget() {
      myWidget.open();
    }

    buttonElement?.addEventListener("click", openWidget, false);

    return () => {
      // Clean up the event listener when the component unmounts
      buttonElement?.removeEventListener("click", openWidget);
    };
  }, [onUpload, uploadPreset]);

  return (
    <Button id="upload_widget" className="sticky" disabled={disabled} variant="secondary" >
      <ImagePlus className="h-4 w-4 mr-2" />
      Upload an Image
    </Button>
  );
};

export default CloudinaryUploadWidget;