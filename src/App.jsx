import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomePage from "./page/Home";
import WishlistPage from "./page/Wishlist";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/wishlist" element={<WishlistPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
