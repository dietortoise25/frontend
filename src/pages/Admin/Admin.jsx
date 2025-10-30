import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productManageService";
import useToast from "@/hooks/useToast";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";

function Admin() {
  const { showSuccess, showError } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = async (newProduct) => {
    try {
      await createProduct(newProduct);
      const response = await getProducts();
      setProducts(response.data);
      setIsAddModalOpen(false);
      showSuccess("产品添加成功！");
    } catch (err) {
      setError(err);
      showError(`产品添加失败: ${err.message}`);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct);
      const response = await getProducts();
      setProducts(response.data);
      setIsEditModalOpen(false);
      setSelectedProduct(null);
      showSuccess("产品更新成功！");
    } catch (err) {
      setError(err);
      showError(`产品更新失败: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      const response = await getProducts();
      setProducts(response.data);
      showSuccess("产品删除成功！");
    } catch (err) {
      setError(err);
      showError(`产品删除失败: ${err.message}`);
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

  const handleEditClick = (product) => {
    setSelectedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">产品管理</h2>

      {loading && (
        <div className="mb-8 text-center">
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      )}
      {error && (
        <p className="text-center text-red-500">错误: {error.message}</p>
      )}

      {!loading && !error && (
        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
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

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {selectedProduct && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateProduct={handleUpdateProduct}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}

export default Admin;
