import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { getProductSelector } from "./products.slice";
import axios from "axios";

interface Product {
  name: string;
  quantity: number;
  rate: number;
}

const AddProducts: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Please log in");
    }
  }, [user, navigate]);

  // const products = useSelector(getProductSelector);

  const [product, setProduct] = useState<Product>({
    name: "",
    quantity: 0,
    rate: 0,
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: productList } = await axios.get("/add-products");
        setProducts(productList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, quantity, rate } = product;

    try {
      const { data: product } = await axios.post("/add-products", {
        name,
        quantity,
        rate,
      });
      if (product.error) {
        toast.error(product.error);
      } else {
        setProduct({ ...product, name: "", quantity: 0, rate: 0 });
        console.log(product);
        toast.success("Product Added");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1>Levitation Invoive Generator</h1>

      <form onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1">
          Name
          <input
            type="text"
            placeholder="name"
            className="p-3 rounded-lg"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1">
          Quantity
          <input
            type="number"
            placeholder="quantity"
            className="p-3 rounded-lg"
            value={product.quantity.toString()}
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
          />
        </label>
        <label className="flex flex-col gap-1">
          Rate
          <input
            type="number"
            placeholder="rate"
            className="p-3 rounded-lg"
            value={product.rate.toString()}
            onChange={(e) => setProduct({ ...product, rate: e.target.value })}
          />
        </label>

        <button type="submit">submit</button>
      </form>

      <ul>
        {products.map((item) => (
          <li key={item.name}></li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
};

export default AddProducts;
