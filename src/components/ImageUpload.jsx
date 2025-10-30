import { useState } from "react";
import uploadImageToSupabase from "@/services/apiStorage";
import { getPublicImageUrl } from "@/utils/supabaseStorage";

const ImageUpload = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}`;
    const path = await uploadImageToSupabase(file, fileName);

    if (path) {
      const publicUrl = getPublicImageUrl(path);
      console.log("publicUrl:", publicUrl);
      setImagePreview(publicUrl);
      onImageUpload(publicUrl);
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
        disabled={uploading}
      />
      <label
        htmlFor="image-upload"
        className={`cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {uploading ? "上传中..." : "选择图片"}
      </label>
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="max-w-xs max-h-48 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
