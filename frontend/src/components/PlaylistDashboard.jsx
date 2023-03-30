import axios from "axios"
import {useContext,
        useState, 
        useEffect} from "react"
import {GetUser,
        GetPlaylist} from "../hooks/FetchHooks"
import {Link} from "react-router-dom"
import {MyContext} from "../middleware/Context"


const PlaylistDashboard = () =>{

  const userContext = useContext(MyContext);

  const [choosePlaylist, setChoosePlaylist] = useState({});
  const [playlistID, setPlaylistID] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [list, setList] = useState([]);


  useEffect(()=>{

    const handleSubmit = e => {
      try{

        e.preventDefault();
        axios.put(`http://localhost:8000/choosePlaylist/${choosePlaylist}`)
          .then(res=>console.log(res))
              .catch(err=>{
              console.error(err);
              return;
            })
        window.location.reload();

      }catch(err){
        console.error(err);
        return;
      }
      
    }

    const handleDelete = e => {
      try{
        e.preventDefault();
        
        axios
          .delete(`http://localhost:8000/deletePlaylist/${playlistID}`)
          .then(res=>{
            axios
            .put(`http://localhost:8000/deleteCurrentPlaylist`)
            .then(data=>console.log(res))  
          })
          .catch(error=>{
            console.error(error);
            return;
          });

      
        window.location.reload();
        
      }catch(err){
        console.error(err);
        return;
      }
      

    }

    try{
      GetPlaylist.then(data=>{
        GetUser.then(user=>{
            userContext.then(currentUser=>{
          setPlaylist(data)
          let playlists = []
              data.forEach(ele=>{
                user.forEach(element=>{
                    if(element._id === ele.user){
                      playlists.push(
                          <tr key = {ele._id}>
                              <td>
                                  <form onSubmit = {handleSubmit}>
                                      <input name = 'choosePlaylist' value = {ele._id} className = "hidden" readOnly = {true}></input>
                                      <button className = 'button' onClick = {setChoosePlaylist(ele._id)}>{ele.name}</button>
                                  </form>
                              </td>
                        
                        {currentUser._id === ele.user ? 
                              <td>
                                  <input name = "editPlaylist" value = {ele._id} className = "hidden" readOnly = {true}></input>
                                  <Link to = {`/editPlaylist`}
                                  onClick = {localStorage.setItem('playlistID', ele._id)} 
                                  className = "fa-solid small fa-pen-to-square button"></Link>
                              </td>
                    :
                    <td></td>    
                         }
                        {currentUser._id === ele.user ? 
                              <td>
                                  <form onSubmit = {handleDelete}>
                                      <button
                                          onClick = {setPlaylistID(ele._id)}
                                          className="button small fa-solid fa-trash" 
                                          type="submit">    
                                      </button>
                                  </form>
                              </td>
                              :
                              <td></td>
                                        }
                              
                             <td>
                                {element._id === ele.user ? element.userName : ""}
                              </td>
                          </tr>
                      )
                        }
                    })
              })
              setList(playlists)
            })
            })
        })

    }catch(err){
      console.error(err);
      return;
    }
   

  }, [playlist, 
      playlistID, 
      choosePlaylist, 
      userContext])


return(
  <div className = "table-wrapper">
    <h2 className = "tableHeading">Playlists</h2>

    <table>
      <thead>
        <tr>
          <th>Playlist Name</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {list}  
      </tbody>
    </table>
  </div>
)

}




export default PlaylistDashboard