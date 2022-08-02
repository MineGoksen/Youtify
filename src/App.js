import logo from './logo.svg';
import './App.css';
import LoginPage from "./components/login/loginPage";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import SignUpPage from "./components/signUp/signUpPage";
import MainPage from "./components/mainPage/MainPage";
import CommentPage from "./components/CommentPage/CommentPage";
import ListPage from "./components/listpage/ListPage";
import MusicPage from "./components/musicPage/MusicPage";


function App() {
    return (
        <div>
            <div id="whole_page">
                <div>
                    <Router>
                        <Routes>
                            <Route path="/signUp" element={<SignUpPage/>}/>
                            <Route path="/mainPage" element={<MainPage/>}/>
                            <Route exact path="/CommentPage/:songId" element={<CommentPage/>}/>
                            <Route exact path="/listPage/:listName/:listId" element={<ListPage/>}/>
                            <Route path="/musicPage" element={<MusicPage/>}/>
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