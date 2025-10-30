import React, { useEffect, useState } from 'react';
import { getProducts } from "../services/productService";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h2 className="text-2xl font-bold mb-4">产品列表</h2>

      {loading && <p className="text-center">加载中...</p>}
      {error && (
        <p className="text-center text-red-500">错误: {error.message}</p>
      )}

      {!loading && !error && (products.length === 0 ? (
        <p className="text-center">暂无产品</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>名称</th>
                <th>类别</th>
                <th>价格</th>
                <th>描述</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Product;