import { Route, Routes } from "react-router-dom";
import Welcome from "./page/Welcome";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import IndexProduct from "./page/Products/Index";
import CreateProduct from "./page/Products/Create";
import ShowProduct from "./page/Products/Show";
import EditProduct from "./page/Products/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<IndexProduct />} />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="/product/:id" element={<ShowProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;
