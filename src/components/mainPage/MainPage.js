import React from 'react';
import {Link} from "react-router-dom";
import './MainPage.css'


function MainPage(props) {
    function returnLists() {
        const lists = ["List1", "List2", "List3"]
        return (
            <>
                <button></button>
                <div id={"userpart"}>
                    <i className="glyphicon glyphicon-user"></i>
                    Username çekip yazacagız
                </div>

                <div style={{display: "flex"}} >
                    <div>
                        {lists.map((element, index) =>
                            <div style={{margin: "10px"}} key={index}>
                                <Link to={'/listPage/' + element}  ><div id={"abc"}>{element}</div></Link>
                            </div>)
                        }
                    </div>
                </div>
            </>
        )
    }

    return (
        <div style={{
            margin: "20px",
            left: '30%'
        }} id={"listId"}>
            {returnLists()}
        </div>
    );
}

export default MainPage;