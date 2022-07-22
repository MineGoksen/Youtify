import React, {useState} from 'react';
import {MusicItem} from "../musicItem/MusicItem";
import {useParams} from "react-router-dom";
import "./CommentPage.css"
import ReactPlayer from "react-player";
import {Formik} from "formik";
import axios from "axios";
import loginSchema from "../login/LoginValidations";


function CommentPage(props) {
    document.body.style.backgroundColor = "gray";

    function returnLists() {
        const id = localStorage.getItem('id');
        const song_id = localStorage.getItem('song_id');
        const formik = {
            initialValues: {
                comment: ""
            }, onSubmit: values => {
                if (values.comment !== null) {
                    const userData = {comment: values.comment, user_id:id, song_id: song_id};
                    axios.post('http://127.0.0.1:8000/addComment/', userData).then(response => {
                        if (response.status === 200) {
                            localStorage.setItem('comment', JSON.stringify(response.data.comment))
                        } else {
                            window.alert(response.data.message)
                            console.log(response.status, response.data.message)
                        }
                    }).catch(error => {
                        console.error('There was an error!', error);
                        window.alert("Hata")
                    });
                }
            },
        }

        return (
            <>
                <Formik {...formik} >
                    {formik =>
                        (<form onSubmit={formik.handleSubmit} id="comment" >
                            <label htmlFor="comment">Enter Your Comment</label>
                            <input
                                id="space"
                                type="text"
                                name = "comment"
                                onChange={formik.handleChange}
                                value={formik.values.comment}/>
                            {formik.errors.comment && formik.touched.comment &&
                                (<div className={"error"}>{formik.errors.comment}</div>)}
                            <button className={"btn_submit"} type="submit" onSubmit={() => formik.handleSubmit()}>Submit
                            </button>
                        </form>)}
                </Formik>
            </>
        )
    }

    return (
        <div style={{
            margin: "30px",
            left: '40%'
        }} >

            {returnLists()}
        </div>
    );
}

export default CommentPage;