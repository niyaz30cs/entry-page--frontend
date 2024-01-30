import React, { createRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../ReduxSlice/UserSlice';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setloginData] = useState("");
    const [UserLoading, setUserLoading] = useState(false)
    const [IsShowPass, setIsShowPass] = useState(false);
    const [Message, setMessage] = useState({ "IsPassMsgActive": false, "IsEmailMsgActive": false, "msgVal": "" });
    const userPasswordRef = createRef();
    const userEmailRef = createRef();
    const [userDetails, setUserDetails] = useState({
        "userEmail": "",
        "userPassword": "",
    });

    const handleSingInClick = (e) => {
        e.preventDefault();
        if (userDetails.userEmail.length === 0) {
            setMessage({ "msgValue": "Enter Your Email", "IsEmailMsgActive": true, "IsPassMsgActive": false })
            userEmailRef.current.focus();
        } else if (userDetails.userPassword.length === 0) {
            setMessage({ "msgValue": "Password Can't be Empty.", "IsPassMsgActive": true, "IsEmailMsgActive": false })
            userPasswordRef.current.focus();
        } else {
            setUserLoading(true);
            setloginData("");
            axios.post("https://ecom-backend-t7c9.onrender.com/user/login", userDetails).then((res) => {
                setloginData(res.data);
                if (res.data.resMsg === "User Logged In Successfully") {
                    dispatch(addUser(res.data.UserDetails));
                    localStorage.setItem(`token`, `${res.data.Your_TOKEN}`);
                }
            })
        }
    }

    const handleChange = (e) => {
        setMessage({ "msgValue": "", "IsEmailMsgActive": false, "IsPassMsgActive": false })
        setUserDetails({
            ...userDetails, [e.target.name]: e.target.value
        });
    }

    const handleTryAgain = () => {
        setUserLoading(false);
        userPasswordRef.current.focus();
        userPasswordRef.current.value = "";

    }

    const handleEmail = () => {
        setUserDetails({
            "userEmail": "",
            "userPassword": "",
        });
        setUserLoading(false);
        userEmailRef.current.focus();
        userEmailRef.current.value = "";
        userPasswordRef.current.value = "";

    }

    const handleClickPassword = () => {
        setIsShowPass(!IsShowPass);
    }

    return (
        <>
            {UserLoading && <div className='registrationResponseContainer'>
                <div className="responseContainer">
                    {
                        loginData?.resMsg ? <div className='responsebox'>
                            <h2 className='loginMsg'>{loginData.resMsg}</h2>
                            {
                                loginData.resMsg === "Password is not Correct" && <button onClick={handleTryAgain} className='responseContainerButton'>Try Again</button>
                            }

                            {
                                loginData.resMsg === "User Not Registred or Email Is Not Correct" && <>
                                    <button onClick={() => navigate("/user/register")} className='responseContainerButton'>Sign Up</button>
                                    <button onClick={handleEmail} className='responseContainerButton'>Try Again</button>
                                </>
                            }

                            {
                                loginData.resMsg === "User Logged In Successfully" && <button onClick={() => navigate("/home")} className='responseContainerButton'>Go To Home</button>
                            }

                        </div>
                            :
                            <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
                                <circle id="c" fill="none" strokeWidth="4" strokeLinecap="round" stroke="white" cx="45" cy="45" r="43" />
                            </svg>
                    }

                </div>
            </div>}
            <div className="formBox">
                <h2 className='formBox--heading'>Login Here</h2>
                <form>
                    <div className="inputBox">
                        <input type="email" name='userEmail' id='userEmail' placeholder='Enter Your Email' className='inputFilelds' onChange={handleChange} autoComplete='userEmail' ref={userEmailRef} />

                        {Message.IsEmailMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i></p>}
                    </div>

                    <div className="inputBox">
                        <input type={IsShowPass ? "text" : "password"} name='userPassword' id='userPassword' placeholder='Enter Your Password' className='inputFilelds' onChange={handleChange} autoComplete='current-password' ref={userPasswordRef} />

                        <i className={`fa-regular ${IsShowPass ? "fa-eye-slash" : "fa-eye"} showPassBtnIcon`} onClick={handleClickPassword}></i>
                        {Message.IsPassMsgActive && <p className='inputErrorMsg'>{Message.msgVal}<i className="fa-solid fa-triangle-exclamation"></i> </p>}
                    </div>
                    <button className='formBox--Buttons' onClick={handleSingInClick}>SignIn</button>
                </form>
                <div className="continueContainer">
                    <button className='navigateButton' onClick={() => navigate("/user/register")}>New Here? Create an account</button>
                </div>
            </div>
        </>
    )
}
export default Login;
