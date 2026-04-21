import React, { useState, useEffect } from 'react';
import '../Login/Login.css';
import environment from '../../Environment/Environment';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Box from '@mui/material/Box';
// import divLogo from '../../Assets/Images/hospital.jpg';

function Login() {
    const navigate = useNavigate();
    const [deviceId, setDeviceId] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        devicesId: deviceId,
        status: 'Windows',
    });

    // useEffect(() => {
    //     // Initialize an agent at application startup.
    //     FingerprintJS.load().then(fp => {
    //         // Get the visitor identifier when you need it.
    //         fp.get().then(result => {
    //             setDeviceId(result.visitorId);
    //         });
    //     });

    // }, []);

    useEffect(() => {
        if (deviceId) {
            setFormData(prev => ({
                ...prev,
                devicesId: deviceId
            }));
        }
    }, [deviceId]);


    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios({
            url: `${environment.config.apiBaseUrl}user/login`,
            method: "POST",
            data: {
                ...formData,
            }
        })
            .then((res) => {
                if (res && res.data) {
                    const token = res.data.token;
                    console.log(
                        deviceId
                    )
                    if (token && deviceId) {
                        // if (token) {
                        const accessToken = jwtDecode(token);
                        localStorage.setItem("authToken", JSON.stringify(accessToken));
                        toast.success('Login successful!');
                        setFormData({ username: '', password: '' });
                        setTimeout(() => {
                            navigate('/dashboard');
                            setLoading(false);
                        }, 500);
                    } else {
                        toast.error("Token not received!");
                        setLoading(false);
                    }
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data || "Login failed!");
                setLoading(false);
            });
    };

    return (<>
        {/* {loading && (
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10000,
                }}
            >
                <CircularProgress />
            </Box>
        )} */}
        <div className='container-fluid login-container'>
            <div className='row h-100'>
                <div className=' d-none d-md-block image-container'></div>
                <div className=' loginform-container'>
                    {/* <div className='mb-5'>
                        <img src={divLogo}></img>
                    </div> */}
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="User Name"
                                value={formData.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                required
                            />
                            <label htmlFor="username">User Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg shadow-sm"
                        >
                            Login
                        </button>
                    </form>
                    <div className='lgn-footer'>
                        Developed by
                        <a
                            // href="https://www.divandsection.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Sammed
                        </a>
                    </div>
                </div>

            </div>
            <ToastContainer position="top-right" />
        </div>
    </>
    );
}

export default Login;
