import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productManageService";

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      const response = await getProducts();
      setProducts(response.data);
      document.getElementById("add_product_modal").close();
      setNewProduct({ name: "", price: 0, description: "" });
    } catch (err) {
      setError(err);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct({ ...product });
    document.getElementById("edit_product_modal").showModal();
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(selectedProduct.id, selectedProduct);
      const response = await getProducts();
      setProducts(response.data);
      document.getElementById("edit_product_modal").close();
      setSelectedProduct(null);
    } catch (err) {
      setError(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">产品管理</h2>

      {loading && <p className="text-center">加载中...</p>}
      {error && (
        <p className="text-center text-red-500">错误: {error.message}</p>
      )}

      {!loading && !error && (
        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={() =>
              document.getElementById("add_product_modal").showModal()
            }
          >
            添加产品
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>名称</th>
                <th>类别</th>
                <th>价格</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.tag}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info mr-2"
                      onClick={() => handleEditClick(product)}
                    >
                      编辑
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog
        id="add_product_modal"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">添加新产品</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleAddProduct}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">产品名称</span>
              </label>
              <input
                type="text"
                placeholder="产品名称"
                className="input input-bordered"
                required
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">类别</span>
              </label>
              <input
                type="text"
                placeholder="类别"
                className="input input-bordered"
                required
                value={newProduct.tag}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, tag: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">价格</span>
              </label>
              <input
                type="number"
                placeholder="价格"
                className="input input-bordered"
                required
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">描述</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="描述"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
              >
                添加
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("add_product_modal").close()
                }
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog
        id="edit_product_modal"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">编辑产品</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {selectedProduct && (
            <form onSubmit={handleUpdateProduct}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">产品名称</span>
                </label>
                <input
                  type="text"
                  placeholder="产品名称"
                  className="input input-bordered"
                  required
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">价格</span>
                </label>
                <input
                  type="number"
                  placeholder="价格"
                  className="input input-bordered"
                  required
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">描述</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="描述"
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  保存
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    document.getElementById("edit_product_modal").close()
                  }
                >
                  取消
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default Admin;
