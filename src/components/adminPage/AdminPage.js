import React from 'react';
import {Formik} from "formik";
import './AdminPage.css'
import axios from "axios";

class AdminPage extends React.Component {

    render() {
        document.body.style.backgroundColor = "gray";

        const formik = {
            initialValues: {
                Type: "",
                Name: "",
                Artist_fname: "",
                Artist_lname: "",
                Album_name: "",
                Album_date: "",
                url: "",
            }, onSubmit: values => {
                if (values.type !== null && values.Name !== null && values.Album_name !== null
                    && values.url !== null && values.Album_date !== null) {
                    const userData = {
                        type: values.Type, name: values.Name,
                        Artist_Fname: values.Artist_fname, Artist_Lname: values.Artist_lname, AlbumName: values.Album_name,
                        AlbumDate: values.Album_date , url: values.url
                    };
                    axios.post('http://127.0.0.1:8000/song', userData).then(response => {
                        console.log(response, "here")
                        if (response.status === 200) {
                            window.alert("Basari ile sarki eklendi")
                        } else {
                            window.alert(response.data.message)
                            console.log(response.status, response.data.message)
                        }
                    }).catch(error => {
                        console.error('There was an error!', error);
                        window.alert(error.message)
                    });
                }
            }
        }

        return (
            <div>

                <div className="card " id={"addsong"}>
                    <br/><button className={"btn_submit2"} type="submit"
                                 onClick={() => {
                                     localStorage.removeItem('id')
                                     localStorage.removeItem('manager')
                                     window.location.href = '/'
                                 }}>
                    <img style={{width:"40px" ,height:"40px"}} src={require("./logout.png")}/>
                </button>
                    <div id="baslik">VERİTABANINA ŞARKI EKLE</div>
                    <Formik {...formik} >
                        {formik =>
                            (<form onSubmit={formik.handleSubmit}>
                                <label htmlFor="Type">Type</label>
                                <input
                                    name="Type"
                                    type="text"
                                    value={formik.values.Type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Song Type"/>
                                {formik.errors.Type && formik.touched.Type &&
                                    (<div className={"error"}>{formik.errors.Type}</div>)}
                                <label htmlFor="Name">Name</label>
                                <input
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Name}
                                    name="Name"
                                    placeholder="Song Name"
                                    type="text"/>
                                {formik.errors.Name && formik.touched.Name &&
                                    (<div className={"error"}>{formik.errors.Name}</div>)}
                                <label htmlFor="Artist_fname">Artist_fname</label>
                                <input
                                    name="Artist_fname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Artist_fname}
                                    placeholder="Artist First Name"
                                    type="text"/>
                                {formik.errors.Artist_fname && formik.touched.Artist_fname &&
                                    (<div className={"error"}>{formik.errors.Artist_fname}</div>)}
                                <label htmlFor="Artist_lname">Artist_lname</label>
                                <input
                                    name="Artist_lname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Artist_lname}
                                    placeholder="Artist Last Name"
                                    type="text"/>
                                {formik.errors.Artist_lname && formik.touched.Artist_lname &&
                                    (<div className={"error"}>{formik.errors.Artist_lname}</div>)}
                                <label htmlFor="Album_name">Album_name</label>
                                <input
                                    name="Album_name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Album_name}
                                    placeholder="Album Name"
                                    type="text"/>
                                {formik.errors.Album_name && formik.touched.Album_name &&
                                    (<div className={"error"}>{formik.errors.Album_name}</div>)}
                                <label htmlFor="Album_date">Album_date</label>
                                <input
                                    name="Album_date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Album_date}
                                    placeholder="Album Date"
                                    type="date"/>
                                {formik.errors.Album_date && formik.touched.Album_date &&
                                    (<div className={"error"}>{formik.errors.Album_date}</div>)}
                                <label htmlFor="url">url</label>
                                <input
                                    name="url"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.url}
                                    placeholder="url"
                                    type="text"/>
                                {formik.errors.url && formik.touched.url &&
                                    (<div className={"error"}>{formik.errors.url}</div>)}
                                <button className={"btn_submit"} type="submit"
                                        onSubmit={() => formik.handleSubmit()}>Add
                                </button>
                            </form>)}
                    </Formik>
                </div>

            </div>
        );
    }


}

export default AdminPage;