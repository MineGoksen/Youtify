import React, {useEffect, useState} from 'react';
import "./CommentPage.css"
import {Formik} from "formik";
import axios from "axios";
import {useParams} from "react-router-dom";


function CommentPage(props) {
    document.body.style.backgroundColor = "gray";
    const id = localStorage.getItem('id');
    const song_id = useParams().songId
    const [comments,setComments]=useState([]);
    const [likeNum,setLikeNum]=useState(0);

    const [commentAdded,setCommentAdded]= useState(false)
    useEffect(()=>{
        if (id===null)
            window.location.href = '/'
        axios.get('http://127.0.0.1:8000/getComment/'+song_id).then(response => {
            if (response.status === 200) {
                var com=[]
                for (let i = 0; i < response.data.length; i++) {
                    com[i]=([{comment:response.data[i].Comment_text, user:response.data[i].User_name}])
                }
                setComments(com)
            } else {
                window.alert(response.data.message)
                console.log(response.status, response.data.message)
            }
        }).catch(error => {
            console.error('There was an error!', error);
            window.alert("Liste Oluşturulamadı.")
        });
        axios.get('http://127.0.0.1:8000/getLikes/'+song_id).then(response => {
            if (response.status === 200) {
                setLikeNum(response.data.like_count)
            } else {
                window.alert(response.data.message)
                console.log(response.status, response.data.message)
            }
        }).catch(error => {
            console.error('There was an error!', error);
            window.alert("Liste Oluşturulamadı.")
        });
    }, [commentAdded])

    function like(){
        const userData = {user_id: parseInt(id), song_id: song_id};
        axios.post('http://127.0.0.1:8000/song_like',userData).then(response => {
            if (response.status === 200) {
                setCommentAdded(!commentAdded)
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

        const formik = {
            initialValues: {
                comment: ""
            }, onSubmit: values => {
                if (values.comment !== null) {
                    const userData = {user_id: id, song_id: song_id,comment:values.comment};
                    axios.post('http://127.0.0.1:8000/addComment', userData).then(response => {
                        if (response.status === 200) {
                            setCommentAdded(!commentAdded)
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
                <div id="parentc">
                    <div className="childc">
                        <Formik {...formik} >
                            {formik =>
                                (<form onSubmit={formik.handleSubmit} id="comment">
                                    <textarea
                                        id="space"
                                        type="text"
                                        name="comment"
                                        placeholder="Enter Your Comment"
                                        onChange={formik.handleChange}
                                        value={formik.values.comment}/>
                                    {formik.errors.comment && formik.touched.comment &&
                                        (<div className={"error"}>{formik.errors.comment}</div>)}
                                    <button id="buton" className={"btn_submit"} type="submit" onSubmit={() => formik.handleSubmit()}>
                                        Submit
                                    </button>
                                </form>)}
                        </Formik>
                    </div>
                    <div className="childc" style={{
                        position: 'absolute', left: '55%', top: '15%',
                        transform: 'translate(-50%, -50%)'
                    }}> <button ><img src={require('./review.png')}
                                      alt="my image" width={"32px"} onClick={()=>like()}  /></button> : {likeNum}</div>

                </div>
                <div style={{display: "flex"}}>
                    <div>
                        {comments.length!==0?  (comments.map((element, index) =>
                            <div style={{margin: "10px"}}  key={index}>
                                {element[0].user}
                                <div className='card' style={{width:"640px" ,height:"80px"}}> {element[0].comment}   </div>
                            </div>)):<div/>
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
        }}>

            {returnLists()}
        </div>
    );
}

export default CommentPage;