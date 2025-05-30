import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const resizeImage = async (fileDataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = fileDataUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 600;
        const aspectRatio = img.width / img.height;

        canvas.width = maxWidth;
        canvas.height = maxWidth / aspectRatio;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("Error", "File size must be less than 2MB", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const resizedImage = await resizeImage(reader.result);
          setSelectedFile(resizedImage);
        } catch (error) {
          showToast("Error", "Image processing failed", "error");
        }
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please select an image file", "error");
      setSelectedFile(null);
    }
  };
  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
