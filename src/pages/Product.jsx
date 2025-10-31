import { useEffect, useState } from "react";
import { getProducts, getProductCount } from "@/services/productService";
import ImageViewer from "../components/ImageViewer/ImageViewer";
import formatPrice from "../utils/formatPrice";

function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Productos por página
  const [totalProducts, setTotalProducts] = useState(0); // Nuevo: Total de productos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(""); // Nuevo: Término de búsqueda
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Nuevo: Término de búsqueda con debounce
  const [productCache, setProductCache] = useState({}); // Nuevo: Caché de productos

  // Manejo de Debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 1000ms de retraso para debounce

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
      console.error("Error al actualizar los datos del producto:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProductData(debouncedSearchTerm); // Llamar a la función extraída y pasar el término de búsqueda con debounce
  }, [currentPage, productsPerPage, debouncedSearchTerm, products]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>

      {loading && (
        <div className="mb-8 text-center">
          <span className="loading loading-spinner loading-lg "></span>
        </div>
      )}
      {error && (
        <p className="text-center text-red-500">Error: {error.message}</p>
      )}

      {!loading && !error && (
        <div className="mb-4 flex justify-end">
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
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
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
    </div>
  );
}

export default Product;
