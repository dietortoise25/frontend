import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";

const EditProductModal = ({
  isOpen,
  onClose,
  onUpdateProduct,
  selectedProduct,
}) => {
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    if (isOpen && selectedProduct) {
      setEditedProduct({
        ...selectedProduct,
        picture: selectedProduct.picture || "",
        price_min: selectedProduct.price_min || 0,
        price_max: selectedProduct.price_max || 0,
      });
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
              value={editedProduct.name}
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
              value={editedProduct.tag}
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
              value={editedProduct.price}
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
              value={editedProduct.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="picture"
              className="block text-sm font-medium text-gray-700"
            >
              图片 URL
            </label>
            <input
              type="text"
              id="picture"
              name="picture"
              value={String(editedProduct.picture)}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
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
              value={String(editedProduct.price_min)}
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
              value={String(editedProduct.price_max)}
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
              更新
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditProductModal;
