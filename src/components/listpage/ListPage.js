import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import "./ListPage.css"
import ReactPlayer from "react-player";
import axios from "axios";


function ListPage(props) {
    const listName = useParams().listName
    const listId = useParams().listId
    const id = localStorage.getItem('id');

    document.body.style.backgroundColor = "gray";
    const [url, setUrl] = useState("https://www.youtube.com/watch?v=xY0FShMyHEg");
    const [playing, setPlaying] = useState(false);
    const [songsChanged, setSongsChanged] = useState(false);
    const [songs, setSongs] = useState([]);


    useEffect(() => {
        if (id === null)
            window.location.href = '/'
        const postData = {list_id: listId};
        axios.post('http://127.0.0.1:8000/listSongs', postData).then(response => {
            if (response.data[0].length !== 0)
                setUrl(response.data[0][0].url)
            setSongs(response.data[0])
            console.log(response.data)
        }).catch(error => {
            console.error('There was an error!', error);
            window.alert("Liste Oluşturulamadı.")
        });
    }, [songsChanged])


    function returnLists() {

        return (
            <>
                <div className="topnav">
                    <p>YOUTIFY</p>
                </div>

                <div id="parentt">
                    <div className="childd">
                        {songs.length !== 0 &&
                            <ReactPlayer url={url} width={"300px"} height={"inherit"} playing={playing}
                                         onPlay={() => setPlaying(true)} on/>}
                    </div>
                    <div className="childd">PLAYLIST<h1> {listName}</h1></div>

                </div>
                <div style={{display: "flex"}}>

                    <div>
                        {songs.map((element, index) =>
                            <div id="parent2" style={{margin: "10px", display: "flex", border: "solid 2px "}}
                                 key={index}>
                                <div className="childd" style={{padding: "20px"}}
                                     onClick={() => setUrl(element.url)}>{index + 1}. {element.Name}</div>
                                <div id="xyz" className="childd">
                                    <button className={"btn_submit"} type="submit"
                                            onClick={() => window.location.href = '/CommentPage/' + element.Song_id}> ...
                                    </button>
                                </div>
                            </div>)
                        }
                        {songs.length===0&& <div style={{fontSize:"28px", marginLeft:"300px",marginRight:"300px"}}>Bu listede Şarkı Bulunmamaktadır</div>}
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