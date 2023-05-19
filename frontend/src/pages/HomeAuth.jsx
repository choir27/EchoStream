import Footer from "../components/Footer"
import UserHeader from "../components/UserHeader"
import {MyContext} from "../middleware/Context"
import {useContext, 
		useEffect, 
		useState} from "react"
import {default as MusicPlayer} from "../components/MusicPlayer.tsx"
import NavPanel from "../components/NavPanel"

const HomeAuth = () => {

	const userContext = useContext(MyContext);

	const [user,setUser] = useState({});

	useEffect(()=>{
    	userContext.then(data=>{
    	  setUser(data)
    	})
  	},[user, userContext])


  return (
	<div id = "wrapper">
		<NavPanel />
		<UserHeader idName = "nav"/>
			<div id="main">
				<MusicPlayer/>
			</div>

		<Footer/>

		<div id="copyright">
			&copy; choir Design: HTML5 UP
		</div>

	</div>
  )
}

export default HomeAuth