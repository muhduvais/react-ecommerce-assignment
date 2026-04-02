import { useEffect } from "react";
import { getProducts } from "../services/productService";

function Home() {

  useEffect(() => {
    getProducts().then(console.log);
  }, []);

  return <div>Home Page</div>;
}
export default Home;