import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import User from "../layout/User";
import Men from "../pages/User/Men";
import Women from "../pages/User/Women";
import Home from "../pages/User/Home";

export const route = createBrowserRouter(
    createRoutesFromElements(
        <>
       <Route path="/" element={<User/>} >
        <Route index element={<Home/>}/>
        <Route path="/men" element={<Men/>}></Route>
        <Route path="/women" element={<Women/>}></Route>
       </Route>
        </>
    )
)