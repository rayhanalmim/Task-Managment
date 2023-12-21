import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";

const SingIn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const { singIn, singInWithGoogle, looding, singInWithTwitter } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    if (looding) {
        return <div className="flex justify-center"><span className="loading loading-spinner loading-md"></span></div>;
    }


    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        singIn(email, password)
            .then(() => {
                e.target.reset();
                toast.success('log in successfully', {
                    position: "top-left",
                    theme: "dark",
                });
                e.target.reset();
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                const errorMessage = error.message;
                const errorCode = error.code;
                console.error(errorCode);
                toast.error(errorMessage, {
                    position: "top-left",
                    theme: "dark",
                });
            })
    }

    const handleGoogleLogin = () => {

        singInWithGoogle()
            .then(() => {
                toast.success('log in successfully', {
                    position: "top-left",
                    theme: "dark",
                });
                navigate(location?.state ? location.state : '/')

            })
            .catch(error => {
                const errorMessage = error.message;
                console.error(errorMessage);
                toast.error(errorMessage, {
                    position: "top-left",
                    theme: "dark",
                });
            })
    }

    const handleTwitterLogin = () => {

        singInWithTwitter()
            .then(() => {
                toast.success('log in successfully', {
                    position: "top-left",
                    theme: "dark",
                });
                navigate(location?.state ? location.state : '/')


            })
            .catch(error => {
                const errorMessage = error.message;
                console.error(errorMessage);
                toast.error(errorMessage, {
                    position: "top-left",
                    theme: "dark",
                });
            })
    }

    return (
        <div className="pb-8">
            <div className="flex flex-col lg:flex-row gap-7 justify-center pt-4">
                <div className="w-1/2 hidden lg:block mx-auto pt-5">
                    <img src="https://i.ibb.co/vXVXVQD/illustration-people-login.png" alt="" />
                </div>

                <div className="w-full lg:w-1/2 pb-14 mx-auto flex-1 max-w-sm p-4 bg-gray-100 text-black border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  dark:border-gray-700">
                    <form onSubmit={handleLogIn} className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 ">Sign in to our platform</h5>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " placeholder="name@company.com" required />
                        </div>
                        <div className="relative">
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Create a password</label>
                            <input

                                type={!showPassword ? "password" : "text"}
                                name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 " required />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute bottom-3.5 hidden md:block left-72">

                                {
                                    showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye ></AiFillEye>
                                }

                            </span>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <Link to='/SingUp' href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                        </div>
                    </form>
                    <div className="flex justify-center items-center pt-5">
                        <button onClick={handleGoogleLogin} className="btn text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"><span><FcGoogle className="text-xl"></FcGoogle></span> Google</button>

                        <button onClick={handleTwitterLogin} className="btn text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"><span><FaTwitter className="text-xl"></FaTwitter></span> Twitter</button>
                    </div>
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default SingIn;