import React, {useState} from 'react';
import {MusicItem} from "../musicItem/MusicItem";
import {Link, useParams} from "react-router-dom";
import "./ListPage.css"
import ReactPlayer from "react-player";


function ListPage(props) {
    const listId = useParams().listId
    document.body.style.backgroundColor = "gray";
    const [url, setUrl] = useState("https://www.youtube.com/watch?v=xY0FShMyHEg");
    const [playing, setPlaying] = useState(false);

    function returnLists() {
        const name = props.name
        const id = props.id
        const path = ["Sor", "Mesafe", "Dünyadan Uzak", "Yara"]
        const urls = ["https://www.youtube.com/watch?v=xY0FShMyHEg", "https://www.youtube.com/watch?v=wgsWR2dpPyg",
            "https://www.youtube.com/watch?v=wgsWR2dpPyg", "https://www.youtube.com/watch?v=wgsWR2dpPyg"]
        return (
            <>
                <div className="topnav">
                    <p>YOUTIFY</p>
                </div>

                <div id="parentt">
                    <div className="childd"><ReactPlayer url={url} width={"300px"} height={"inherit"} playing={playing} onPlay={()=>setPlaying(true)}
                                                         on/></div>
                    <div className="childd">PLAYLIST<h1> {listId}</h1></div>

                </div>
                <div style={{display: "flex"}}>

                    <div>
                        {path.map((element, index) =>
                            <div id="parent2" style={{margin: "10px", display:"flex",border:"solid 2px "}} key={index} >
                                <div className="childd" style={{padding:"20px"}} onClick={() => setUrl(urls[index])}>{index + 1}. {element}</div>
                                <div id="xyz" className="childd"><button className={"btn_submit"} type="submit" onClick={ () => 1 }> ...
                                </button></div>
                            </div>)
                        }
                    </div>

                </div>

            </>
        )
    }

    return (
        <div style={{
            margin: "30px",
            left: '40%'
        }} id="song">

            {returnLists()}
        </div>
    );
}

export default ListPage;