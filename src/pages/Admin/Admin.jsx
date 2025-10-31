import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
} from "../../services/productManageService";
import useToast from "@/hooks/useToast";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";
import { Plus, Edit, Trash2 } from "lucide-react";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import formatPrice from "../../utils/formatPrice";

function Admin() {
  const { showSuccess, showError } = useToast();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // 每页显示x个产品
  const [totalProducts, setTotalProducts] = useState(0); // 新增：产品总数
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 新增：搜索关键词
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // 新增：防抖搜索关键词
  const [productCache, setProductCache] = useState({}); // 新增：产品缓存

  // 防抖处理
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 500ms 防抖延迟

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const refreshProductData = async (search = "", forceRefresh = false) => {
    const cacheKey = `${currentPage}-${productsPerPage}-${search}`;
    if (!forceRefresh && productCache[cacheKey]) {
      setProducts(productCache[cacheKey].products);
      setTotalProducts(productCache[cacheKey].totalProducts);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const productsResponse = await getProducts(
        currentPage,
        productsPerPage,
        search
      );

      setProducts(productsResponse.data);
      const countResponse = await getProductCount(search);
      setTotalProducts(countResponse.data);
      setProductCache((prevCache) => ({
        ...prevCache,
        [cacheKey]: {
          products: productsResponse.data,
          totalProducts: countResponse.data,
        },
      }));
    } catch (err) {
      setError(err);
      console.error("Error refreshing product data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await createProduct(newProduct);
      setIsAddModalOpen(false);
      setProductCache({});
      await refreshProductData(true); // Force refresh after adding a product
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct);
      setProductCache({}); // 清空缓存
      await refreshProductData(true); // Force refresh after updating a product
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
      setProductCache({}); // 清空缓存
      await refreshProductData(true); // Force refresh after deleting a product
      showSuccess("产品删除成功！");
    } catch (err) {
      setError(err);
      showError(`产品删除失败: ${err.message}`);
    }
  };

  useEffect(() => {
    refreshProductData(debouncedSearchTerm); // 调用抽离的函数，并传入防抖后的搜索关键词
  }, [currentPage, productsPerPage, debouncedSearchTerm, products]);

  const handleEditClick = (product) => {
    setSelectedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <div className="mb-4 flex justify-end gap-2">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                ></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button
            className="btn hover:bg-primary hover:text-white"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus />
            添加
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>图片</th>
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
                  <td>
                    {/* <img
                      src={
                        product.picture ||
                        "https://dummyimage.com/200x200/000/eee"
                      }
                      alt={product.name || "Placeholder"}
                      className="w-16 h-16 object-cover"
                    /> */}
                    <ImageViewer
                      src={
                        product.picture ||
                        "https://dummyimage.com/200x200/000/eee"
                      }
                      alt={product.name || "Placeholder"}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.tag}</td>
                  <td>{formatPrice(product.price, product.price_min, product.price_max)}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info mr-2"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className="join mt-4 flex justify-center">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`join-item btn ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
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
