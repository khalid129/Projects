import React, { Fragment, useRef, useState, useEffect } from 'react';
import "./LoginSignUp.css";
import profile from '../../images/Profile.png';
import { Link } from "react-router-dom";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FaceIcon from '@mui/icons-material/Face';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Loader from "../layout/Loader/Loader"
import { register,login, clearErrors } from "../../actions/userActions";

const LoginSignUp = () => {

    const dispatch = useDispatch();

    const history = useNavigate();

    const { error, loading, isAuthenticated } = useSelector(state => state.loginUser, state=>state.registerUser);


    const loginTab = useRef(null);
    const registerTab = useState(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(profile);

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        dispatch(register(myForm));
    }

    const registeredDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: [e.target.value] });
        }
    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            history(`/account`);
        }
    }, [dispatch, history, error, isAuthenticated])

    return (
        <Fragment>
            {
                loading ? (<Loader />) : (
                    <Fragment>
                        <div className="LoginSignupContainer">
                            <div className="LoginSignupBox">
                                <ToastContainer />
                                <div>
                                    <div className="login_Signup_toggle">
                                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                    </div>
                                    <button ref={switcherTab}></button>
                                </div>

                                {/* Login Form */}
                                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                    <div className="loginEmail">
                                        <EmailOutlinedIcon />
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder='Email'
                                            required
                                            value={loginEmail}
                                            onChange={(e) => { setLoginEmail(e.target.value) }}
                                        />
                                    </div>
                                    <div className="loginPassword">
                                        <LockOpenOutlinedIcon />
                                        <input
                                            type="password"
                                            name='password'
                                            placeholder='Password'
                                            required
                                            value={loginPassword}
                                            onChange={(e) => { setLoginPassword(e.target.value) }}
                                        />
                                    </div>
                                    <Link to="/password/forgot">Forgot Password ?</Link>
                                    <input type="submit" value="login" className="loginBtn" />
                                </form>

                                {/* Registration Form */}
                                <form
                                    className='signUpForm'
                                    ref={registerTab}
                                    encType="multipart/form-data"
                                    onSubmit={registerSubmit}
                                >
                                    <div className="signUpName">
                                        <FaceIcon />
                                        <input
                                            type="text"
                                            placeholder='Name'
                                            required
                                            name='name'
                                            value={name}
                                            onChange={registeredDataChange}
                                        />
                                    </div>
                                    <div className="signUpEmail">
                                        <EmailOutlinedIcon />
                                        <input
                                            type="email"
                                            name='email'
                                            placeholder='Email'
                                            required
                                            value={email}
                                            onChange={registeredDataChange}
                                        />
                                    </div>
                                    <div className="signUpPassword">
                                        <LockOpenOutlinedIcon />
                                        <input
                                            type="password"
                                            name='password'
                                            placeholder='Password'
                                            required
                                            value={password}
                                            onChange={registeredDataChange}
                                        />
                                    </div>
                                    <div id="registerImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name='avatar'
                                            accept='image/*'
                                            onChange={registeredDataChange} />
                                    </div>
                                    <input type="submit" value="Register" className='signUpBtn' />
                                </form>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default LoginSignUp