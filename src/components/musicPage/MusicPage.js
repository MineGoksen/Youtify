import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './MusicPage.css'
import axios from "axios";
import {Formik} from "formik";


function musicPage(props) {
    const [comments,setComments]=usesdadasdas
    /*useEffect(() => {
        axios.get('http://127.0.0.1:8000/search/').then(response => {
            if (response.status === 200) {
                console.log("hello")
            } else {
                window.alert(response.data.message)
                console.log(response.status, response.data.message)
            }
        }).catch(error => {
            console.error('There was an error!', error);
            window.alert("Liste Oluşturulamadı.")
        });
    }, )*/

    function returnLists() {
        document.body.style.backgroundColor = "gray";
        const formik = {
            initialValues: {
                song_name: ""
            }, onSubmit: values => {
                const formData = {search:values.song_name}
                axios.post('http://127.0.0.1:8000/search',formData).then(response => {
                    if (response.status === 200) {
                        console.log(response)
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
                                    <input
                                        name="song_name"
                                        placeholder="Search"
                                        onChange={formik.handleChange}
                                        value={formik.values.song_name}/>
                                </form>)
                            }
                        </Formik>
                    </center>
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

export default musicPage;