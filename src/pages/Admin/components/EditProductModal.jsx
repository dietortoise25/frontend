import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import uploadImageToSupabase from "@/services/apiStorage";
import { getPublicImageUrl } from "@/utils/supabaseStorage";
import InputField from "@/components/InputField";

const EditProductModal = ({
  isOpen,
  onClose,
  onUpdateProduct,
  selectedProduct,
}) => {
  const [editedProduct, setEditedProduct] = useState(null);
  const [uploading, setUploading] = useState("");
  const [priceInputType, setPriceInputType] = useState("single"); // 'single' or 'range'

  useEffect(() => {
    if (isOpen && selectedProduct) {
      const initialProductState = {
        ...selectedProduct,
        picture: selectedProduct.picture || "",
        price_min: selectedProduct.price_min || 0,
        price_max: selectedProduct.price_max || 0,
      };
      setEditedProduct(initialProductState);
      setPriceInputType("single");
    } else {
      setEditedProduct(null);
    }
  }, [isOpen, selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdateProduct(editedProduct);
  };

  const handleFileChange = async (e) => {
    console.log("handleFileChange triggered");
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    setUploading("uploading");

    const fileName = `${Date.now()}`;
    const path = await uploadImageToSupabase(file, fileName);

    if (path) {
      const fullPath = getPublicImageUrl(path);
      if (fullPath) {
        setEditedProduct((prev) => {
          const updated = { ...prev, picture: fullPath };
          return updated;
        });
      }
    }
    setUploading("done");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="编辑产品"
    >
      {editedProduct && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <InputField
            label="产品名称"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            required={true}
          />

          <InputField
            label="标签"
            id="tag"
            name="tag"
            value={editedProduct.tag}
            onChange={handleChange}
            required={true}
          />

          {/* Price Input Type Toggle */}
          <div className="flex items-center">
            <label className="mr-2">
              <input
                type="radio"
                name="priceInputType"
                value="single"
                checked={priceInputType === "single"}
                onChange={() => setPriceInputType("single")}
                className="mr-1"
              />
              单价格
            </label>
            <label className="mr-2">
              <input
                type="radio"
                name="priceInputType"
                value="range"
                checked={priceInputType === "range"}
                onChange={() => setPriceInputType("range")}
                className="mr-1"
              />
              价格范围
            </label>
          </div>
          {priceInputType === "single" && (
            <InputField
              label="价格"
              id="price"
              name="price"
              type="number"
              placeholder="价格"
              value={editedProduct.price}
              onChange={handleChange}
            />
          )}

          {priceInputType === "range" && (
            <div className="flex space-x-4">
              <div className="form-control flex-1">
                <InputField
                  label="最低价格"
                  id="price_min"
                  name="price_min"
                  type="number"
                  placeholder="最低价格"
                  value={editedProduct.price_min}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control flex-1">
                <InputField
                  label="最高价格"
                  id="price_max"
                  name="price_max"
                  type="number"
                  placeholder="最高价格"
                  value={editedProduct.price_max}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div>
            <InputField
              label="描述"
              id="description"
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
              required={true}
              isTextarea={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">图片上传</label>
            <label
              htmlFor="image-upload-edit"
              className="btn btn-primary"
            >
              选择图片
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="image-upload-edit"
              disabled={uploading === "uploading"}
              className="hidden"
            />

            {uploading === "uploading" && (
              <span className="loading loading-spinner loading-lg ml-2 "></span>
            )}
            {uploading === "done" && (
              <span className="text-success ml-2">上传成功</span>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              取消
            </button>
            <button
              type="submit"
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                uploading === "uploading"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
              disabled={uploading === "uploading"}
            >
              {uploading === "uploading" ? "图片上传中" : "更新"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditProductModal;
