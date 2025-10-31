import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import uploadImageToSupabase from "@/services/apiStorage";
import { getPublicImageUrl } from "@/utils/supabaseStorage";

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    tag: "",
    price: 0,
    description: "",
    picture: "",
    price_min: 0,
    price_max: 0,
  });
  const [uploading, setUploading] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setNewProduct({
        name: "",
        tag: "",
        price: 0,
        description: "",
        picture: "",
        price_min: 0,
        price_max: 0,
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddProduct(newProduct);
    onClose();
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
    console.log("uploadImageToSupabase path:", path);
    if (path) {
      const fullPath = await getPublicImageUrl(path);
      console.log("Image upload successful, fullPath:", fullPath);
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        picture: fullPath,
      }));
    }
    setUploading("done");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="添加产品"
    >
      {newProduct && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              产品名称
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700"
            >
              标签
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={newProduct.tag}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              价格
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              描述
            </label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              图片上传
            </label>
            <label
              htmlFor="image-upload-add"
              className="btn btn-primary"
            >
              选择图片
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="image-upload-add"
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
          <div>
            <label
              htmlFor="price_min"
              className="block text-sm font-medium text-gray-700"
            >
              最低价格
            </label>
            <input
              type="number"
              id="price_min"
              name="price_min"
              value={newProduct.price_min}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="price_max"
              className="block text-sm font-medium text-gray-700"
            >
              最高价格
            </label>
            <input
              type="number"
              id="price_max"
              name="price_max"
              value={newProduct.price_max}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              添加
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default AddProductModal;
