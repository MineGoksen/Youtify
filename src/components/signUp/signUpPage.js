import React from 'react';
import {Formik} from "formik";
import {Link} from "react-router-dom";
import SignInValidation from "./signUpValidation";

class SignUpPage extends React.Component {
    render() {
        const formik = {
            initialValues: {
                firstName: "",
                lastName: "",
                email: "",
                userName: "",
                password: "",
            }, onSubmit: values => {
              } , validationSchema: SignInValidation
        }

        return (
            <div>
                <div className="card " id={"signUp"}>
                    <h3 id="title_login">TO DO LIST</h3>
                    <Formik {...formik} >
                        {formik =>
                            (<form onSubmit={formik.handleSubmit} className="container">
                                <input className="row"
                                       name="firstName"
                                       type="text"
                                       type="text"
                                       value={formik.values.firstName}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       placeholder="firstName"/>
                                {formik.errors.firstName && formik.touched.firstName&&
                                    (<div className={"error"}>{formik.errors.firstName}</div>)}
                                <input className="row"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.lastName}
                                       name="lastName"
                                       placeholder="lastName"
                                       type="text"/>
                                {formik.errors.lastName &&formik.touched.lastName&&
                                    (<div className={"error"}>{formik.errors.lastName}</div>)}
                                <input className="row"
                                       name="userName"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.userName}
                                       placeholder="userName"
                                       type="text"/>
                                {formik.errors.userName &&formik.touched.userName&&
                                    (<div className={"error"}>{formik.errors.userName}</div>)}
                                <input className="row"
                                       name="email"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.email}
                                       placeholder="email"
                                       type="email"/>
                                {formik.errors.email &&formik.touched.email&&
                                    (<div className={"error"}>{formik.errors.email}</div>)}
                                <input className="row"
                                       name="password"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       value={formik.values.password}
                                       placeholder="password"
                                       type="password"/>
                                {formik.errors.password &&formik.touched.password&&
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


}

export default SignUpPage;