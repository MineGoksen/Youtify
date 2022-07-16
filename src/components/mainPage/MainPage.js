import React from 'react';
import {MusicItem} from "../musicItem/MusicItem";
import ListPage from "../listpage/ListPage";

function MainPage(props) {
    function returnLists() {
    const lists=["List1","List2","List3"]

        return (
            <div style={{display: "flex"}}>
                <div>
                    {lists.map((element, index) =>
                        <div style={{margin: "10px"}} key={index}>

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

export default MainPage;