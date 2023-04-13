import {Link} from "react-router-dom"

const Header = ({idName, id, setToggleClose, toggleClose, setToggleNav}) => {

	return ( 
		<header id = {id}>

			{
			toggleClose ?
				<i 
				className="fa-solid fa-x fa-2xl" 
				id ="close"
				onClick = {()=>{
					setToggleClose(false);
					setToggleNav(true);
				}}></i>
			:
				""
			}

			<div id = "intro" >
				<Link to = "/"><h1>K-pop Wired</h1></Link>
		  	</div> 

    	    <nav id={idName} className = "className">
				<ul className="links">
    	          	<li><Link to = "/">Home</Link></li>
    	          	<li><Link to = "/about">About</Link></li>
					<li><Link to = "/dashboard">Dashboard</Link></li>
					<li><Link to = "/register">Register</Link></li>
					<li><Link to = "/login">Login</Link></li>
				</ul>
				
				<ul className="icons alt">
					<li>
						<a 
						rel="noreferrer" 
						target = "_blank" 
						href="https://twitter.com/choir241"
						 className="icon fa-twitter"
						>
							<p className = "hidden">Twitter</p>
						</a>
					</li>

					<li>
						<a 
						rel="noreferrer" 
						target = "_blank" 
						href="https://www.linkedin.com/in/richard-choir/" 
						className="icon fa-linkedin"
						>
							<p className = "hidden">LinkedIn</p>
						</a>
					</li>

					<li>
						<a 
						rel="noreferrer" 
						target = "_blank" 
						href="https://www.instagram.com/225kh_drw/?hl=en" 
						className="icon fa-instagram"
						>
							<p className = "hidden">Instagram</p>
						</a>
					</li>

					<li>
						<a 
						rel="noreferrer" 
						target = "_blank" 
						href="https://github.com/choir27" 
						className="icon fa-github"
						>
							<p className = "hidden">Github</p>
						</a>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;
