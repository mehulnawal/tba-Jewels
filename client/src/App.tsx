import Loader from "./components/Loader";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetails";
import ProductsPage from "./pages/ProductPage";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

export default function App() {
  return (
    <ReactQueryProvider>
      <Loader />
      <HomePage />
      {/* <ProductsPage />  */}
      {/* <ProductDetailPage /> */}
    </ReactQueryProvider>
  );
}
