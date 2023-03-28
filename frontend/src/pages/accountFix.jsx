import Footer from "../components/Footer"
import UserHeader from "../components/UserHeader"
import {useContext, useEffect, useState} from "react"
import {MyContext} from "../middleware/Context"
import Post from "../components/Post"
import {default as MusicPlayer} from "../components/MusicPlayer.tsx"
import axios from "axios";
import {GetPlaylist, GetAudio} from "../hooks/FetchHooks"
import {Link} from "react-router-dom"

const Account = () => {

  const userContext = useContext(MyContext)
  const [user, setUser] = useState({})
  const [choosePlaylist, setChoosePlaylist] = useState({})
  const [playlistID, setPlaylistID] = useState('')
  const [list, setList] = useState([])
  const [rows, setRows] = useState([])

  useEffect(()=>{
    try{
      userContext.then(data=>setUser(data))


      
    const handleSubmit = (e) => {
        try{
          e.preventDefault();
          axios.put(`http://localhost:8000/choosePlaylist/${choosePlaylist}`)
              .then(res=>{
                console.log(res)
              if(res){
                window.location.reload();
              }})
              .catch(err=>{
                console.error(err);
                return;
              })
        }catch(err){
          console.error(err);
          return;
        }
    }
    
    const handleDelete = e => {
      e.preventDefault();
  
      try{
                
        axios
        .delete(`http://localhost:8000/deletePlaylist/${playlistID}`)
        .then(res=>{console.log(res)
          axios
          .put(`http://localhost:8000/deleteCurrentPlaylist`)
          .then(res=>{
            if(res){
              window.location.reload();
            }
          })
          .then(data=>console.log(data))
          .catch(error=>{
            console.error(error)
            return;
          })
          
        
        })
        .catch(error=>{
          console.error(error)
          return;
        })
      }catch(err){
        console.error(err)
        return;
      }
        }
    }catch(err){
      console.error(err)
    }



    GetPlaylist.then(data=>{
        let playlists = []
            data.forEach(ele=>{
                if(ele.user === localStorage.getItem('id')){
                    playlists.push(
                        <tr key = {ele._id}>
                            <td>
                                <form onSubmit = {handleSubmit}>
                                    <input name = 'choosePlaylist' value = {ele._id} className = "hidden" readOnly = {true}></input>
                                    <button className = 'button' onClick = {()=>setChoosePlaylist(ele._id)}>{ele.name}</button>
                                </form>
                            </td>
                            <td>
                                <input name = "editPlaylist" value = {ele._id} className = "hidden" readOnly = {true}></input>
                                <Link to = {`/editPlaylist`}
                                onClick = {()=>localStorage.setItem('playlistID', ele._id)} 
                                className = "fa-solid small fa-pen-to-square button"></Link>
                            </td>
                            <td>
                                <form onSubmit = {handleDelete}>
                                    <button
                                        onClick = {()=>{
                                        setPlaylistID(ele._id)
                                        }}
                                        className="button small fa-solid fa-trash" 
                                        type="submit">    
                                    </button>
                                </form>
                            </td>
                        </tr>
                    )
                }
            })
        setList(playlists)
    })

    GetAudio.then(data=>{
      let audio = []
      data.forEach(ele=>{
          if(ele.user === localStorage.getItem('id')){
            audio.push(<Post userName = {user.userName} userID = {ele.user} id = {ele._id} text = {ele.name} key = {ele._id}/>)
          }
      })
      setRows(audio)
    })

    
    }, [userContext, user])




   

  return (
    <div>  
      <UserHeader />  
          <div id = 'main'>
            <article className = 'post'>
        <section className="major column flex">
        
        <h3>{user.userName}</h3>

        <MusicPlayer/>

    <section className = 'flex tables'>
    

        <div className = "table-wrapper">

        <h2 className = 'tableHeading'>Songs</h2>

        <table>
          <thead>
            <tr>
              <th>Song Name</th>
              <th>Playlist</th>
              <th>Delete</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
        </div>



<div className = "table-wrapper">
<h2 className = 'tableHeading'>Playlists</h2>

<table>
  <thead>
    <tr>
      <th>Playlist Name</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {list}  
  </tbody>
</table>
</div>


</section>

        </section>
        </article>
          </div>
        <Footer />
        <div id="copyright">
&copy; choir Design: HTML5 UP
</div>
    
    </div>
  )
}

export default Account
