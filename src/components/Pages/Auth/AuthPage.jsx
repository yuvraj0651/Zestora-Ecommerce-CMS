import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser, registerUser } from "../../Services/AuthThunk";
import toast from "react-hot-toast";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        role: "admin",
    });
    const [loginErrors, setLoginErrors] = useState({});

    const [registerData, setRegisterData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
    });
    const [registerErrors, setRegisterErrors] = useState({});
    const [showPassword, setShowPassword] = useState({
        login: false,
        register: false,
        confirmPassword: false,
    });

    const { loginLoading, registerLoading } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginChangeHandler = useCallback((e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
        setLoginErrors((prev) => ({ ...prev, [name]: "" }));
    }, []);

    const registerChangeHandler = useCallback((e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({ ...prev, [name]: value }));
        setRegisterErrors((prev) => ({ ...prev, [name]: "" }));
    }, []);

    const toggleLoginPassword = useCallback(() => {
        setShowPassword(prev => ({ ...prev, login: !prev.login }));
    }, []);

    const toggleRegisterPassword = useCallback(() => {
        setShowPassword(prev => ({ ...prev, register: !prev.register }));
    }, []);

    const toggleConfirmPassword = useCallback(() => {
        setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }));
    }, []);

    const emailRegex = useMemo(() => /\S+@\S+\.\S+/, []);

    const validateLogin = useCallback(() => {
        let loginDataErrors = {};

        if (!loginData.email.trim()) {
            loginDataErrors.email = "Email is required";
        } else if (!emailRegex.test(loginData.email)) {
            loginDataErrors.email = "Invalid email format";
        }

        if (!loginData.password) {
            loginDataErrors.password = "Password is required";
        } else if (loginData.password.length < 6) {
            loginDataErrors.password = "Password must be at least 6 characters";
        }

        if (!loginData.role) {
            loginDataErrors.role = "Please select a role";
        }

        return loginDataErrors;
    }, [loginData, emailRegex]);

    const validateRegister = useCallback(() => {
        let registerDataErrors = {};

        if (!registerData.fullName.trim()) {
            registerDataErrors.fullName = "Full name is required";
        }

        if (!registerData.email.trim()) {
            registerDataErrors.email = "Email is required";
        } else if (!emailRegex.test(registerData.email)) {
            registerDataErrors.email = "Invalid email format";
        }

        if (!registerData.password) {
            registerDataErrors.password = "Password is required";
        } else if (registerData.password.length < 6) {
            registerDataErrors.password = "Password must be at least 6 characters";
        }

        if (!registerData.confirmPassword) {
            registerDataErrors.confirmPassword = "Confirm your password";
        } else if (registerData.confirmPassword !== registerData.password) {
            registerDataErrors.confirmPassword = "Passwords do not match";
        }

        if (!registerData.role) {
            registerDataErrors.role = "Please select a role";
        }

        return registerDataErrors;
    }, [registerData, emailRegex]);

    const handleLoginSubmit = useCallback((e) => {
        e.preventDefault();

        const loginValidateErr = validateLogin();
        setLoginErrors(loginValidateErr);

        if (Object.keys(loginValidateErr).length === 0) {
            dispatch(loginUser(loginData))
                .unwrap()
                .then(() => {
                    toast.success("User Logged In Successfully")

                    setLoginData({
                        email: "",
                        password: "",
                        role: "admin",
                    });
                    setLoginErrors({});

                    setTimeout(() => {
                        navigate("/home");
                    }, 500);
                }).catch((error) => {
                    toast.error(error || "Something went wrong");
                })
        };
    }, [loginData, dispatch, navigate, validateLogin]);

    const handleRegisterSubmit = useCallback((e) => {
        e.preventDefault();

        const registerValidateErr = validateRegister();
        setRegisterErrors(registerValidateErr);

        if (Object.keys(registerValidateErr).length === 0) {
            dispatch(registerUser(registerData))
                .unwrap()
                .then(() => {
                    toast.success("User Registered Successfully");

                    setRegisterData({
                        fullName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        role: "admin",
                    });
                    setRegisterErrors({});
                    setIsLogin(true);
                }).catch((error) => {
                    toast.error(error || "something went wrong")
                })
        }
    }, [registerData, dispatch, validateRegister]);

    return (
        <div className="min-h-screen flex bg-gray-50">

            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-500 to-red-500 dark:from-purple-800 dark:to-indigo-700 items-center justify-center p-12">
                <div className="text-white max-w-md">
                    <h1 className="text-4xl font-extrabold mb-4">Zestora CMS</h1>
                    <p className="text-lg opacity-90">
                        Complete control over your food ordering platform.
                        Manage routes, pages, roles & features easily.
                    </p>
                </div>
            </div>

            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 dark:bg-slate-700">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 dark:bg-slate-600">

                    <div className="lg:hidden text-center mb-6">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Zestora CMS
                        </h1>
                    </div>

                    <div className="flex bg-gray-100 rounded-lg p-1 mb-6 dark:bg-purple-200">
                        <button
                            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition ${isLogin
                                ? "bg-white shadow text-orange-600 dark:bg-purple-600 dark:text-slate-50"
                                : "text-gray-500 dark:text-purple-700"
                                }`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>

                        <button
                            className={`w-1/2 py-2 rounded-lg text-sm font-medium transition ${!isLogin
                                ? "bg-white shadow text-orange-600 dark:bg-purple-600 dark:text-slate-50"
                                : "text-gray-500 dark:text-purple-700"
                                }`}
                            onClick={() => setIsLogin(false)}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">

                        {!isLogin && (
                            <div>
                                <label className="text-sm text-gray-600 dark:text-slate-50">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={registerData.fullName}
                                    onChange={registerChangeHandler}
                                    placeholder="Enter your name"
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none dark:bg-slate-500 dark:border-slate-600 dark:text-slate-50 dark:focus:ring-purple-600"
                                />
                                {
                                    registerErrors.fullName && (
                                        <p className="pl-2 font-[500] tracking-wide text-red-700 text-[0.9rem]">*{registerErrors.fullName}</p>
                                    )
                                }
                            </div>
                        )}

                        <div>
                            <label className="text-sm text-gray-600 dark:text-slate-50">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={isLogin ? loginData.email : registerData.email}
                                onChange={isLogin ? loginChangeHandler : registerChangeHandler}
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none dark:bg-slate-500 dark:border-slate-600 dark:text-slate-50 dark:focus:ring-purple-600"
                            />
                            {
                                isLogin
                                    ? loginErrors.email && (
                                        <p className="pl-2 font-[500] tracking-wide text-red-700 text-[0.9rem]">*{loginErrors.email}</p>
                                    )
                                    : registerErrors.email && (
                                        <p className="pl-2 font-[500] tracking-wide text-red-700 text-[0.9rem]">*{registerErrors.email}</p>
                                    )
                            }
                        </div>

                        <div className="relative">
                            <label className="text-sm text-gray-600 dark:text-slate-50">Password</label>
                            <input
                                type={isLogin ? (showPassword.login ? "text" : "password") : (showPassword.register ? "text" : "password")}
                                name="password"
                                value={isLogin ? loginData.password : registerData.password}
                                onChange={isLogin ? loginChangeHandler : registerChangeHandler}
                                placeholder="Enter your password"
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none dark:bg-slate-500 dark:border-slate-600 dark:text-slate-50 dark:focus:ring-purple-600"
                            />
                            <span
                                onClick={isLogin ? toggleLoginPassword : toggleRegisterPassword}
                                className="absolute top-[2.3rem] right-4 tracking-wide capitalize font-[600] text-[0.85rem] cursor-pointer text-amber-600 dark:text-purple-300">
                                {isLogin ? (showPassword.login ? "Hide" : "Show") : (showPassword.register ? "Hide" : "Show")}
                            </span>
                            {
                                isLogin
                                    ? loginErrors.password && (
                                        <p className="pl-2 font-[500] tracking-wide text-red-700 text-[0.9rem]">*{loginErrors.password}</p>
                                    )
                                    : registerErrors.password && (
                                        <p className="pl-2 font-[500] tracking-wide text-red-700 text-[0.9rem]">*{registerErrors.password}</p>
                                    )
                            }
                        </div>

                        {!isLogin && (
                            <div className="relative">
                                <label className="text-sm text-gray-600 dark:text-slate-50">Confirm Password</label>
                                <input
                                    type={showPassword.confirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={registerData.confirmPassword}
                                    onChange={registerChangeHandler}
                                    placeholder="Confirm your password"
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none dark:bg-slate-500 dark:border-slate-600 dark:text-slate-50 dark:focus:ring-purple-600"
                                />
                                <span
                                    onClick={toggleConfirmPassword}
                                    className="absolute top-[2.3rem] right-4 tracking-wide capitalize font-[600] text-[0.85rem] cursor-pointer text-amber-600 dark:text-purple-300">
                                    {
                                        showPassword.confirmPassword ? "Hide" : "Show"
                                    }
                                </span>
                                {
                                    registerErrors.confirmPassword && (
                                        <p className="pl-2 font-[500] tracking-wide text-red-700 text-[0.9rem]">*{registerErrors.confirmPassword}</p>
                                    )
                                }
                            </div>
                        )}

                        <div>
                            <label className="text-sm text-gray-600 dark:text-slate-50">Role</label>
                            <select
                                name="role"
                                value={isLogin ? loginData.role : registerData.role}
                                onChange={isLogin ? loginChangeHandler : registerChangeHandler}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none bg-white dark:bg-slate-500 dark:border-slate-600 dark:text-slate-50 dark:focus:ring-purple-600"
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                            </select>
                            {
                                isLogin
                                    ? loginErrors.role && (
                                        <p className="pl-2 font-[500] tracking-wide text-red-700 text-[0.9rem]">*{loginErrors.role}</p>
                                    )
                                    : registerErrors.role && (
                                        <p className="pl-2 font-[500] tracking-wide text-red-700 text-[0.9rem]">*{registerErrors.role}</p>
                                    )
                            }
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-red-500 dark:from-purple-600 dark:to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            {isLogin ? (loginLoading ? "Logging You In..." : "Login to Dashboard") : (registerLoading ? "Registering You In..." : "Create Account")}
                        </button>
                    </form>

                    <p className="text-xs text-gray-400 text-center mt-6">
                        © {new Date().getFullYear()} Zestora CMS
                    </p>

                </div>
            </div >
        </div >
    );
};

export default AuthPage;
