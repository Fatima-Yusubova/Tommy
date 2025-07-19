import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import User from "../layout/User";
import Men from "../pages/User/Men";
import Women from "../pages/User/Women";
import App from "../App";

export const route = createBrowserRouter(
    createRoutesFromElements(
        <>
       <Route path="/" element={<User/>} >
        <Route index element={<App/>}/>
        <Route path="/men" element={<Men/>}></Route>
        <Route path="/women" element={<Women/>}></Route>
       </Route>
        </>
    )
)