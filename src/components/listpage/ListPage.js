import React from 'react';
import {MusicItem} from "../musicItem/MusicItem";

function ListPage(props) {
    function returnLists() {
        const name=props.name
        const id=props.id
        const path = ["Sor","Mesafe","Dünyadan Uzak","Yara"]

        return (
            <div style={{display: "flex"}}>
                <h4> {name} </h4>
                <div>
                    {path.map((element, index) =>
                        <div style={{margin: "10px"}} key={index}>
                            <MusicItem name={element}></MusicItem>
                        </div>)
                    }
                </div>

            </div>
        )
    }

    return (
        <div style={{
            margin: "20px",
            left: '30%'
        }}>

            {returnLists()}
        </div>
    );
}

export default ListPage;