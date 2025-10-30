import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';

const EditProductModal = ({ isOpen, onClose, onUpdateProduct, selectedProduct }) => {
  const [editedProduct, setEditedProduct] = useState(selectedProduct);

  useEffect(() => {
    setEditedProduct(selectedProduct);
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdateProduct(editedProduct.id, editedProduct);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="编辑产品">
      {selectedProduct && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">产品名称</label>
            <input
              type="text"
              id="name"
              name="name"
              value={selectedProduct.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700">标签</label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={selectedProduct.tag}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">价格</label>
            <input
              type="number"
              id="price"
              name="price"
              value={selectedProduct.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">描述</label>
            <textarea
              id="description"
              name="description"
              value={selectedProduct.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
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