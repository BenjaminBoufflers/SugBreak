import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const [product, setProduct] = useState({});
  const [productToModify, setProductToModify] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch("http://localhost:5000/product");
    const datas = await response.json();
    setProducts(datas);
  };

  const getProduct = async (filter, query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/product/search?${filter}=${query}`
      );
      const product = await response.json();
      setLoading(false);
      return product;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleProduct = (product) => {
    setProduct(product);
  };

  const handleProductToModify = (product) => {
    setProductToModify(product);
  };

  const updateProductToModify = (name, value) => {
    setProductToModify((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateProdut = async (id, data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/product/update/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const datas = await response.json();
      const productsUpdated = datas.products;
      setProducts(productsUpdated);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const datas = await response.json();
        const productsUpdated = datas.products;
        setProducts(productsUpdated);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await fetch("http://localhost:5000/product", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const datas = await response.json();
      const newProduct = datas.product;
      if (response.ok) {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        productToModify,
        products,
        getProducts,
        getProduct,
        addProduct,
        deleteProduct,
        updateProdut,
        handleProduct,
        handleProductToModify,
        updateProductToModify,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
