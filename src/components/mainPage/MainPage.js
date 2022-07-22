import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './MainPage.css'
import axios from "axios";
import loginSchema from "../login/LoginValidations";
import {Formik} from "formik";


function MainPage(props) {
    const id = localStorage.getItem('id')
    const [lists,setLists]= useState([])
    const [listAdded,setListAdded]= useState(false)
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/lists/'+id).then(response => {
            if (response.status === 200) {
                console.log(response.data[0][1])
                var listNames=[]
                for (let i = 0; i < response.data[0].length; i++) {
                    listNames[i]=([...lists,response.data[0][i].Name])
                }
                setLists(listNames)
                // window.location.href = '/listPage/:listId'
            } else {
                window.alert(response.data.message)
                console.log(response.status, response.data.message)
            }
        }).catch(error => {
            console.error('There was an error!', error);
            window.alert("Liste Oluşturulamadı.")
        });
    }, [listAdded])
    function getLists(){

    }
    function returnLists() {
        document.body.style.backgroundColor = "gray";

        const formik = {
            initialValues: {
                list_name: ""
            }, onSubmit: values => {
                if (values.list_name !== null) {

                    const userData = {list_name: values.list_name, user_id: id};
                    axios.post('http://127.0.0.1:8000/listAdd', userData).then(response => {
                        console.log(response, "res")
                        if (response.status === 200) {
                            setLists([...lists,values.list_name])
                        } else {
                            window.alert(response.data.message)
                            console.log(response.status, response.data.message)
                        }
                    }).catch(error => {
                        console.error('There was an error!', error);
                        window.alert("Liste Oluşturulamadı.")
                    });
                }
            },
        }

        return (
            <>
                <div id={"userpart"}>
                    <i className="glyphicon glyphicon-user"></i>
                    Username çekip yazacagız
                </div>
                <Formik {...formik} >
                    {formik =>
                        (<form onSubmit={formik.handleSubmit}>
                            <label htmlFor="Name">Oluşturulacak Liste Adı</label>
                            <input
                                name="list_name"
                                placeholder="ListName"
                                onChange={formik.handleChange}
                                value={formik.values.list_name}/>
                            {formik.errors.list_name && formik.touched.list_name &&
                                (<div className={"error"}>{formik.errors.list_name}</div>)}
                            <button className={"btn_submit"} type="submit" onSubmit={() => formik.handleSubmit()}>Add
                            </button>
                        </form>)}
                </Formik>

                <div style={{display: "flex"}}>
                    <div>
                        {lists.length!==0?  (lists.map((element, index) =>
                            <div style={{margin: "10px"}} key={index}>
                                <Link to={'/listPage/' + element}>
                                    <div id={"abc"}>{element}</div>
                                </Link>
                            </div>)):<div/>
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