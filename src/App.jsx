import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Layout from "./component/Layout";
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
