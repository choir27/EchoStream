"use client"
import React, {useContext, useState} from "react"
import "../../css/global.css"
import Header from "../../components/Header"
import MusicPlayer from "../../components/MusicPlayer"
import Footer from "../../components/Footer"
import EmployeeSettings from "../../components/EmployeeSettings"
import {UserContext} from "../../middleware/Context"
import {State, Action} from "../../middleware/Type"
import {User} from "../../middleware/Interface"
import {useStore} from "../../middleware/Zustand"
import RenderPlaylist from "../../hooks/RenderPlaylist"

const Account = () =>{

    const user = useContext(UserContext) as User;
    const [currentPage, setCurrentPage] = useState(1);
    const playlist = useStore((state:State)=>state.listOfSongs);
    const songDisplay = useStore((state:State)=>state.songDisplay);
    const setSongDisplay = useStore((state:Action)=>state.setSongDisplay);
    const songs = useStore((state:State)=>state.song);

    return(
        <main className = "column flex">
		<Header/>
  
          <section id = "account" className = "main">

            <h1>Welcome {user?.name}</h1>

            <MusicPlayer/>

            <section className = "flex alignItems spaceEvenly">
            <EmployeeSettings/>
            <RenderPlaylist playlist = {playlist} setSongDisplay = {(e)=>setSongDisplay(e)} songDisplay = {songDisplay} songs = {songs} currentPage={currentPage} setCurrentPage={(e)=>setCurrentPage(e)}/>

            </section>  

   
          </section>
  
          <Footer/>
  
      </main>
    )
}

export default Account;