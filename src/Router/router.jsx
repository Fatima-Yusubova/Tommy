import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import User from "../layout/User";
import Men from "../pages/User/Men";
import Women from "../pages/User/Women";
import Home from "../pages/User/Home";
import Login from "../pages/Admin/Login";
import Auth from "./Auth";
import Admin from "../layout/Admin";
import Category from "../pages/Admin/Category";

export const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<User />}>
        <Route index element={<Home />}></Route>
        <Route path="/men" element={<Men />}></Route>
        <Route path="/women" element={<Women />}></Route>
      </Route>
      <Route path="/admin" element={
        <Auth>
            <Admin/>
        </Auth>
      }>
        <Route path="/admin/category" element={<Category/>}/>
      </Route>
    </>
  )
);