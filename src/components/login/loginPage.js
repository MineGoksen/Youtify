import React from 'react';
import {Link} from "react-router-dom";
import {Formik} from "formik";
import './loginPage.css'
import loginSchema from "./LoginValidations";

function LoginPage() {
    const uid = ""
    document.body.style.backgroundColor = "gray";
    const handleLogin = () => {
    }

    const formik = {
        initialValues: {
            email: "",
            password: ""
        }, onSubmit: values => {
            console.log("here")
            if( values.email==="admin@admin.com"&&values.password==="adminadmin"){
                localStorage.setItem("uid", 191104090)
                window.location.href = '/mainPage'
            }else{
                const errorMessage="Girdiğiniz Şifre veya email Hatalıdır"
                window.alert(errorMessage)
                console.log( errorMessage)
            }
            console.log(JSON.stringify(values, null, 2))
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
                        {formik.errors.email &&formik.touched.email&&
                            (<div className={"error"}>{formik.errors.email}</div>)}
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            placeholder="***"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}/>
                        { formik.errors.password &&formik.touched.password&&
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