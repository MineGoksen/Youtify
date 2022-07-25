import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './MainPage.css'
import axios from "axios";
import {Formik} from "formik";


function MainPage(props) {
    const id = localStorage.getItem('id')
    const [lists, setLists] = useState([])
    const [listAdded, setListAdded] = useState(false)
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/lists/' + id).then(response => {
            if (response.status === 200) {
                var listNames = []
                for (let i = 0; i < response.data[0].length; i++) {
                    listNames.push({name: response.data[0][i].Name, id: response.data[0][i].id})
                }
                setLists([...listNames])
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

    function returnLists() {
        document.body.style.backgroundColor = "gray";

        const formik = {
            initialValues: {
                list_name: ""
            }, onSubmit: values => {
                if (values.list_name !== null) {
                    const userData = {list_name: values.list_name, user_id: id};
                    axios.post('http://127.0.0.1:8000/listAdd', userData).then(response => {
                        if (response.status === 200) {
                            setListAdded(!listAdded)
                            values.list_name=""
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

        function deleteList(id) {
            const data = {list_id:id};
            axios.post('http://127.0.0.1:8000/listDelete',data).then(response => {
                if (response.status === 200) {
                    setListAdded(!listAdded)
                } else {
                    window.alert(response.data.message)
                    console.log(response.status, response.data.message)
                }
            }).catch(error => {
                console.error('There was an error!', error);
                window.alert("Liste Oluşturulamadı.")
            });
        }

        return (
            <>
                <div id={"userpart"}>
                    <div id="parentt">
                        <div className="childd"> YOUTIFY</div>
                        <div className="childd">
                            <Formik {...formik} >
                                {formik =>
                                    (<form id="search">
                                        <input
                                            placeholder="Search"
                                        />
                                    </form>)
                                }
                            </Formik>
                        </div>
                    </div>
                </div>
                <Formik {...formik} >
                    {formik =>
                        (<form onSubmit={formik.handleSubmit}>
                            <label htmlFor="Name"><b>Add List</b></label>
                            <input id={"form"}
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
                        {lists.length !== 0 ? (lists.map((element, index) =>
                            <div style={{margin: "10px",display:"flex"}} key={index}>
                                <img src={require('./remove.png')}
                                     alt="my image"
                                     style={{border: "none", borderRadius: '10px', width: "20px",height:"20px", cursor: "pointer",margin:"6px"}}
                                     onClick={() => deleteList(element.id)}/>
                                <Link to={'/listPage/' + element.name}>
                                    <div id={"abc"}>{element.name}</div>
                                </Link>
                            </div>)) : <div/>
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