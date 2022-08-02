import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import {Link} from "react-router-dom";
import SignInValidation from "./signUpValidation";
import './signUpPage.css'
import axios from "axios";

function SignUpPage() {
    const id = localStorage.getItem('id')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (id!==null) {
            window.location.href = '/MainPage'
        }
    }, [isLoggedIn])

    document.body.style.backgroundColor = "gray";
    const formik = {
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
        }, onSubmit: values => {
            if (values.firstName !== null && values.lastName !== null
                && values.email !== null && values.userName !== null && values.password !== null) {
                const userData = {
                    first_name: values.firstName, last_name: values.lastName,
                    email: values.email, user_name: values.userName, password: values.password
                };
                axios.post('http://127.0.0.1:8000/userAdd', userData).then(response => {
                    console.log(response, "here")
                    if (response.status === 200) {
                        window.alert("Basari ile kayit oldunuz. Simdi giris yapabilirsiniz.")
                        window.location.href = '/'
                    } else {
                        window.alert(response.data.message)
                        console.log(response.status, response.data.message)
                    }
                }).catch(error => {
                    console.error('There was an error!', error);
                    window.alert(error.message)
                });
            }
        }, validationSchema: SignInValidation
    }


    return (
        <div>
            <div className="card " id={"signUp"}>
                <br/>
                <div id="baslik">SIGN UP YOUTIFY</div>
                <Formik {...formik} >
                    {formik =>
                        (<form onSubmit={formik.handleSubmit}>
                            <label htmlFor="fname">First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                type="text"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="firstName"/>
                            {formik.errors.firstName && formik.touched.firstName &&
                                (<div className={"error"}>{formik.errors.firstName}</div>)}
                            <label htmlFor="lname">Last Name</label>
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                name="lastName"
                                placeholder="lastName"
                                type="text"/>
                            {formik.errors.lastName && formik.touched.lastName &&
                                (<div className={"error"}>{formik.errors.lastName}</div>)}
                            <label htmlFor="userName">User Name</label>
                            <input
                                name="userName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userName}
                                placeholder="userName"
                                type="text"/>
                            {formik.errors.userName && formik.touched.userName &&
                                (<div className={"error"}>{formik.errors.userName}</div>)}
                            <label htmlFor="email">Email Address</label>
                            <input
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder="email"
                                type="email"/>
                            {formik.errors.email && formik.touched.email &&
                                (<div className={"error"}>{formik.errors.email}</div>)}
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="password"
                                type="password"/>
                            {formik.errors.password && formik.touched.password &&
                                (<div className={"error"}>{formik.errors.password}</div>)}
                            <button className={"btn_submit"} type="submit"
                                    onSubmit={() => formik.handleSubmit()}>Submit
                            </button>
                        </form>)}
                </Formik>
                <div id="link_login">
                    You have account?<Link to="/"> Press to Login</Link>
                </div>
            </div>

        </div>
    );


}

export default SignUpPage;