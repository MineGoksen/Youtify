import React from 'react';
import {MusicItem} from "../musicItem/MusicItem";
import {useParams} from "react-router-dom";
import "./ListPage.css"


function ListPage(props) {
    const listId=useParams().listId
    document.body.style.backgroundColor = "gray";

    function returnLists() {
        const name=props.name
        const id=props.id
        const path = ["Sor","Mesafe","Dünyadan Uzak","Yara"]

        return (
            <>
                <div className="topnav">
                    <p>YOUTIFY</p>
                </div>

                <div id="parent">
                    <div className="child"> <img src={require("./deneme.jpg")} width="300" height="200" /></div>
                    <div className="child">PLAYLIST<h1> {listId}</h1></div>
                </div>
                <div style={{display: "flex"}} >

                    <div >
                        {path.map((element, index) =>
                            <div id="parent2" style={{margin: "10px"}} key={index}>
                                <div  className="child">{index+1}.    {element}</div>
                                <div  className="child"><audio controls>
                                    <source src="https://ia801007.us.archive.org/15/items/MattGetsBlue/01MensLiberation.mp3" />
                                </audio></div>
                            </div>)
                        }
                    </div>

                </div></>
        )
    }

    return (
        <div style={{
            margin: "30px",
            left: '40%'
        }} id="song">

            {returnLists()}
        </div >
    );
}

export default ListPage;