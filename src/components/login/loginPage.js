import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Formik} from "formik";
import './loginPage.css'
import loginSchema from "./LoginValidations";
import axios from "axios";

function LoginPage() {
    const uid = ""
    document.body.style.backgroundColor = "gray";
    const id = localStorage.getItem('id')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(()=>{
        if (id!==null) {
            window.location.href = '/MainPage'
        }
    }, [isLoggedIn])
    const formik = {
        initialValues: {
            email: "",
            password: ""
        }, onSubmit: values => {
            if (values.email !== null && values.password !== null) {
                const userData = {email: values.email, password: values.password};
                axios.post('http://127.0.0.1:8000/login', userData).then(response => {
                    if (response.status === 200) {
                        localStorage.setItem('id', JSON.stringify(response.data.id[0].id))
                        window.location.href = '/mainPage'
                    } else {
                        window.alert(response.data.message)
                        console.log(response.status, response.data.message)
                    }
                }).catch(error => {
                    console.error('There was an error!', error);
                    window.alert("Girdiğiniz Şifre veya email Hatalıdır")
                });
            }

            /*console.log("here")
            if( values.email==="admin@admin.com"&&values.password==="adminadmin"){
                localStorage.setItem("uid", 191104090)
                window.location.href = '/mainPage'
            }else{
                const errorMessage="Girdiğiniz Şifre veya email Hatalıdır"
                window.alert(errorMessage)
                console.log( errorMessage)
            }
            console.log(JSON.stringify(values, null, 2))*/
        }, validationSchema: loginSchema
    }

    return (
        <div className="card " id={"logIn"}>
            <br/>
            <div id="baslik">YOUTIFY</div>
            <Formik {...formik} >
                {formik =>
                    (<form onSubmit={formik.handleSubmit}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            name="email"
                            placeholder="example@example.com"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}/>
                        {formik.errors.email && formik.touched.email &&
                            (<div className={"error"}>{formik.errors.email}</div>)}
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            placeholder="*******"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}/>
                        {formik.errors.password && formik.touched.password &&
                            (<div className={"error"}>{formik.errors.password}</div>)}
                        <button className={"btn_submit"} type="submit" onSubmit={() => formik.handleSubmit()}>Submit
                        </button>
                    </form>)}
            </Formik>
            <div id="link_login">
                You don't have an account?<Link to="/signUp"> Press to Sign Up</Link>
            </div>
        </div>
    );


}

export default LoginPage;