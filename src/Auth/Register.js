import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
function Register() {
    const [registration, setRegistration] = useState("");
    const [ShowPass, setShowPass] = useState(false);
    const [Message, setMessage] = useState({ "IsNameMsgActive": false, "IsPhoneMsgActive": false, "IsEmailMsgActive": false, "IsPassMsgActive": false, "msgVal": "" });
    const [UserLoading, setUserLoading] = useState(false)
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        "userName": "",
        "userPhone": "",
        "userEmail": "",
        "userPassword": "",
    });

    const handleChangeInput = (e) => {
        setMessage({ "IsNameMsgActive": false, "IsPhoneMsgActive": false, "IsEmailMsgActive": false, "IsPassMsgActive": false, "msgVal": "" });
        setUserDetails({
            ...userDetails, [e.target.name]: e.target.value
        });
    }

    const handleClickPassword = () => {
        setShowPass(!ShowPass);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (userDetails.userName.length === 0) {
            setMessage({ "IsNameMsgActive": true, "IsPhoneMsgActive": false, "IsEmailMsgActive": false, "IsPassMsgActive": false, "msgVal": "Name Can't Be Empty" });

        } else if (userDetails.userPhone.length === 0 || userDetails.userPhone.length < 10) {
            setMessage({ "IsNameMsgActive": false, "IsPhoneMsgActive": true, "IsEmailMsgActive": false, "IsPassMsgActive": false, "msgVal": "Provide Correct Phone Number" });

        } else if (userDetails.userEmail.length === 0) {
            setMessage({ "IsNameMsgActive": false, "IsPhoneMsgActive": false, "IsEmailMsgActive": true, "IsPassMsgActive": false, "msgVal": "Mail Can't Be Empty" });

        } else if (userDetails.userPassword.length === 0) {
            setMessage({ "IsNameMsgActive": false, "IsPhoneMsgActive": false, "IsEmailMsgActive": false, "IsPassMsgActive": true, "msgVal": "Password Can't Be Empty" });

        } else {
            setUserLoading(true);
            setRegistration("");
            axios.post("https://ecom-backend-t7c9.onrender.com/user/register", userDetails).then((res) => {
                setRegistration(res.data);
            });
        }
    }

    return (
        <>
            {UserLoading && <div className='registrationResponseContainer'>
                <div className="responseContainer">
                    {
                        registration?.resMsg ? <div className='responsebox'>
                            <h2 className='registrationMsg'>{registration.resMsg}</h2>
                            <button className='responseContainerButton' onClick={() => navigate("/user/login")}>Go To Log In</button>
                        </div>
                            :
                            <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
                                <circle id="c" fill="none" strokeWidth="4" strokeLinecap="round" stroke="white" cx="45" cy="45" r="43" />
                            </svg>
                    }
                </div>
            </div>
            }
            <div className="formBox registerFormBox">
                <h2 className='formBox--heading'>Register Here</h2>
                <form >
                    <div className="inputBox">
                        <input type="text" name='userName' id='userName' placeholder='Enter Your Name' className='inputFilelds' onChange={handleChangeInput} autoComplete='userName' />
                        {Message.IsNameMsgActive && <p className='inputErrorMsg'>{Message.msgVal} </p>}
                    </div>

                    <div className="inputBox">
                        <input type="number" name='userPhone' id='userPhone' placeholder='Enter Your Phone' className='inputFilelds' onChange={handleChangeInput} autoComplete='userPhone' />
                        {Message.IsPhoneMsgActive && <p className='inputErrorMsg'>{Message.msgVal} </p>}
                    </div>

                    <div className="inputBox">
                        <input type="email" name='userEmail' id='userEmail' placeholder='Enter Your Email' className='inputFilelds' onChange={handleChangeInput} autoComplete='userEmail' />
                        {Message.IsEmailMsgActive && <p className='inputErrorMsg'>{Message.msgVal} </p>}
                    </div>

                    <div className="inputBox">
                        <input type={ShowPass ? "text" : "password"} name='userPassword' id='userPassword' placeholder='Enter Your Password' className='inputFilelds' onChange={handleChangeInput} autoComplete='current-password' />
                        <i className={`fa-regular ${ShowPass ? "fa-eye-slash" : "fa-eye"} showPassBtnIcon`} onClick={handleClickPassword}></i>
                        {Message.IsPassMsgActive && <p className='inputErrorMsg'>{Message.msgVal} </p>}
                    </div>

                    <button className='formBox--Buttons' onClick={handleRegister}>Register</button>
                </form>
                <div className="continueContainer">
                    <button className='navigateButton' onClick={() => navigate("/user/login")}>Already have an account? Sign in</button>
                </div>
            </div>
        </>
    )
}
export default Register;
