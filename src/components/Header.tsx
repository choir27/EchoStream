import React, {useMemo, useCallback} from "react"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import api from "../api/api"

interface header{
    idName?: string,
    id?: string,
    toggleClose?: boolean,
    toggleNav?: boolean,
    setToggleNav: (e:boolean) => void,
    setToggleClose: (e:boolean) => void
}

export default function Header(props: header){

    const navigate = useNavigate();	
	const logout = useCallback(async(e:any) => {
	    e.preventDefault();
		sessionStorage.removeItem("auth");
        const data = await api.deleteCurrentSession();
		navigate("/");	
		if(data){
			window.location.reload();
		}
	},[navigate]);	

    useMemo(()=>{
        sessionStorage.getItem("auth") ? props.setToggleNav(true) : props.setToggleNav(false)
      },[props])

	return ( 
        <>

        {sessionStorage.getItem("auth") ?
        
        <header id = {props.id} className = "flex column">

		{props.toggleClose ?
			<i 
			className="fa-solid fa-x fa-2xl" 
			id ="close"
			onClick = {()=>{
				props.setToggleClose(false);
				props.setToggleNav(true);
			}}></i>
			:
			""
		}

		<div>
			<Link to = "/"><h1>EchoStream</h1></Link>
	  	</div> 

        <nav id={props.idName} className = "flex column">

			<ul className="flex navBar">
              	<li><Link to="/">Home</Link></li>
				<li><Link to = "/about">About</Link></li>
				<li><Link to = "/account">Account</Link></li>
				<li><Link to = "/addAudio">Add Audio</Link></li>
				<li><Link to = "/" onClick = {(e)=>logout(e)}>Logout</Link></li>
			</ul>

		
		</nav>
		
	</header>
        
        
        
        
        :
        
        <header id = {props.id} className = "flex column">

        {
        props.toggleClose ?
            <i 
            className="fa-solid fa-x fa-2xl" 
            id ="close"
            onClick = {()=>{
                props.setToggleClose(!props.toggleClose);
                props.setToggleNav(!props.toggleNav);
            }}></i>
        :
            ""
        }

        <div>
            <Link to = "/"><h1>EchoVerse</h1></Link>
          </div> 

        <nav id={props.idName} className = "flex column">

        <ul className = "flex navBar">
              <li><Link to = "/">Home</Link></li>
            <li><Link to = "/about">About</Link></li>
            <li><Link to = "/demo">Demo</Link></li>
            <li><Link to = "/auth">Register/Login</Link></li>
        </ul>
        
        </nav>

    </header>
        }
        
        </>
		
	)
}
