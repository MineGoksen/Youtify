import React, {useEffect, useState} from 'react';
import './MusicPage.css'
import axios from "axios";
import {Formik} from "formik";
import {Link} from "react-router-dom";

function MusicPage(props) {
    const [selectedOption, setSelectedOption] = useState();
    const id = localStorage.getItem('id')
    const [songs,setSongs]=useState([]);
    const [lists, setLists] = useState([])

    const [songsChanged,setSongsChanged]=useState([]);
    useEffect(()=>{
        if (id===null)
            window.location.href = '/'
        const formData = {search:""}
        axios.post('http://127.0.0.1:8000/search',formData).then(response => {
            if (response.status === 200) {
                console.log(response.data.songs)
                setSongs(response.data.songs)
            } else {
                window.alert(response.data.message)
                console.log(response.status, response.data.message)
            }
        }).catch(error => {
            console.error('There was an error!', error);
            window.alert("Liste Oluşturulamadı.")
        });

        axios.get('http://127.0.0.1:8000/lists/' + id).then(response => {
            if (response.status === 200) {
                var listNames = []
                for (let i = 0; i < response.data[0].length; i++) {
                    listNames.push({name: response.data[0][i].Name, id: response.data[0][i].id})
                }
                setLists([...listNames])
                if(listNames.length!==0) {
                    setSelectedOption(listNames[0].id)
                }
                // window.location.href = '/listPage/:listId'
            } else {
                window.alert(response.data.message)
                console.log(response.status, response.data.message)
            }
        }).catch(error => {
            console.error('There was an error!', error);
            window.alert("Liste Oluşturulamadı.")
        });

    }, [songsChanged])

    function addSong(song_id) {
        const formData = {song_id:song_id,list_id:selectedOption}
        axios.post('http://127.0.0.1:8000/songAddToList',formData).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                window.alert(response.data.message)
            } else {
                window.alert(response.data.message)
                console.log(response.status, response.data.message)
            }
        }).catch(error => {
            console.error('There was an error!', error);
            window.alert("Liste Oluşturulamadı.")
        });
    }

    function returnLists() {
        document.body.style.backgroundColor = "gray";
        const formik = {
            initialValues: {
                song_name: ""
            }, onSubmit: values => {
                const formData = {search:values.song_name}
                axios.post('http://127.0.0.1:8000/search',formData).then(response => {
                    if (response.status === 200) {
                        console.log(response.data.songs)
                        setSongs(response.data.songs)
                    } else {
                        window.alert(response.data.message)
                        console.log(response.status, response.data.message)
                    }
                }).catch(error => {
                    console.error('There was an error!', error);
                    window.alert("Liste Oluşturulamadı.")
                });
            },
        }

        return (
            <>
                <div id={"userpart"}>
                    <center>
                        <Formik {...formik} >
                            {formik =>
                                (<form id={"search"} onSubmit={formik.handleSubmit}>
                                    <input style={{marginTop:"10px"}}
                                        name="song_name"
                                        placeholder="Search"
                                        onChange={formik.handleChange}
                                        value={formik.values.song_name}/>
                                </form>)
                            }
                        </Formik>
                    </center>
                </div>
                <div>
                    <div className="custom-select" style={{width:"200px"}}>
                        <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>>
                            {lists.length !== 0 && (lists.map((element, index) =>
                               <>  <option key={index} value={element.id}>{element.name}</option></>))
                            }
                        </select>
                    </div>

                </div>
                    <div>
                        {songs.length!==0?  (songs.map((element, index) =>
                            <div style={{margin: "10px",fontSize:"20px",paddingLeft:"10px"}}  key={index}>
                                <p style={{width:"640px" ,height:"60px",paddingTop:"12px",fontSize:"20px",paddingLeft:"10px",border:"solid 2px",color:"black"
                                ,backgroundColor:"white"}}>
                                    {element.Name} from {element.Artist_fname +" "+element.Artist_lname}
                                    <button style={{width:"50px" ,height:"40px",marginLeft:"30px",
                                    border:"none",backgroundColor:"white"}} onClick={()=>addSong(element.Song_id)}>
                                    <img style={{width:"40px" ,height:"40px"}} src={require("./add_icon.png")}/>
                                    </button>
                                    <button style={{width:"40px" ,height:"40px",marginLeft:"40px",border:"solid 2px green",borderRadius:"8px"
                                        ,backgroundColor:"lightgreen"}} type="submit"
                                            onClick={() => window.location.href = '/CommentPage/' + element.Song_id}> ...
                                    </button>
                                </p >
                            </div>)):<h1>There is no such song!</h1>
                        }
                    </div>

            </>
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

export default MusicPage;