import logo from './logo.svg';
import './App.css';
import LoginPage from "./components/login/loginPage";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import SignUpPage from "./components/signUp/signUpPage";
import MainPage from "./components/mainPage/MainPage";
import CommentPage from "./components/CommentPage/CommentPage";
import ListPage from "./components/listpage/ListPage";

function App() {
    return (
        <div>
            <div id="whole_page">
                <div>
                    <Router>
                        <Routes>
                            <Route path="/signUp" element={<SignUpPage/>}/>
                            <Route path="/mainPage" element={<MainPage/>}/>
                            <Route exact path="/CommentPage/:song_id" element={<CommentPage/>}/>
                            <Route exact path="/listPage/:listId" element={<ListPage/>}/>
                            <Route exact path="/" element={<LoginPage/>}/>
                        </Routes>
                    </Router>

                </div>
                {/* <Footer/>*/}
            </div>
        </div>
    );
}

export default App;