import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import User from "../layout/User";
import Home from "../pages/User/Home";
import Login from "../pages/Admin/Login";
import Auth from "./Auth";
import Admin from "../layout/Admin";
import Category from "../pages/Admin/Category";
import Product from "../pages/Admin/Product";
import CategoryPage from "../pages/User/CategoryPage";
import ProductDetail from "../pages/User/ProductDetail";
import BasketPage from "../pages/User/BasketPage";

export const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<User />}>
        <Route index element={<Home />}></Route>
        <Route path="/category/:categoryId" element={<CategoryPage/>} />
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/basket" element={<BasketPage/>}/>
      </Route>
      <Route
        path="/admin"
        element={
          <Auth>
            <Admin />
          </Auth>
        }
      >
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/product" element={<Product />} />
      </Route>
    </>
  )
);