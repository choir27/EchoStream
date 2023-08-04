import {BrowserRouter} from "react-router-dom"
import {Route, Routes} from "react-router"
import React, {Suspense} from "react"
import "react-toastify/dist/ReactToastify.css"

export default function App(){

    const Home = React.lazy(()=>import("./pages/Home.tsx"));
    const About = React.lazy(()=>import("./pages/About.tsx"));
    const Demo = React.lazy(()=>import("./pages/Demo.tsx"));
    const Auth = React.lazy(()=>import(("./pages/Auth.tsx")));

 return(
    <Suspense fallback ={<h1>Loading...</h1>}>
        <BrowserRouter>
            <Routes>
                <Route path = "/" exact element = {<Home/>}/>
                <Route path = "/about" exact element = {<About/>}/>
                <Route path = "/demo" element = {<Demo/>}/>
                <Route path = "/auth" element = {<Auth/>}/>
            </Routes>
        </BrowserRouter>
    </Suspense>
 )   
}