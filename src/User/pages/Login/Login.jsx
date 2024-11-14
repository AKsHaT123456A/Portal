import React, { useEffect, useState } from "react";
import "./Login.css";
import LoginGif from "../../assets/loginImage.png";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Person } from "@mui/icons-material";
import Cookies from "js-cookie";
import { deleteCookies } from "../../../Admin/utils/updateCookies";
import Loader from "../../../Loader/Loader";

export let isLoggedin = false;
export let isAdmin = false;

const Login = ({ handleLogin }) => {
  const [initialValues, setInitialValues] = useState({
    student_no: "",
    password: "",
  });
  const [res, setRes] = useState({});
  // const handleUserAdmin = (userType) => {
  //   handleAdmin(userType);
  // };
  // const handleUserLogin=(login)=>{
  //   handleLogin(login);
  // }
  useEffect(() => {
    toast.info("The login credentials are system-generated. Please refer to the name  in the password to check the associated rank.", {
      position: "top-right",
      autoClose: 8000, // Close after 8 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);
  const onSubmit = (values) => {
    // console.log(values);
    values.password=initialValues.password;
        setLoader(false);
        // console.log(res);
        Cookies.set("isLoggedIn", true); // Set isLoggedIn cookie
        isLoggedin = true;
        localStorage.setItem("studentNo", res.studentNo);
        localStorage.setItem("id", res._id);

        if (res.isAdmin === true) {
          Cookies.set("isAdmin", true);
          Cookies.set("apage1", true);
          navigate("/admin");
        } else if (res.isSubmit === true) {
          Cookies.set("spage4", true);
          navigate("/Thankyou");
        } else if (res.logintime !== 0) {
          localStorage.setItem("savedTime", res.logintime.toString());
          localStorage.setItem("language", res.category || "C");
          Cookies.set("spage2", true);
          navigate("/test");
        } else {
          Cookies.set("spage1", true);
          navigate("/instruction");
        }
  };
  const formik = useFormik({
    initialValues,
    validate: (values) => {
      let errors = {};
      if (!values.student_no) {
        errors.student_no = "Please Enter Student Number";
      } else if (!values.student_no) {
        errors.student_no = "Enter Correct Student Number";
      }
      if (!values.password) {
        errors.password = "Please Enter Password";
      } else if (!values.password) {
        errors.password = "Invalid Password";
      }
      return errors;
    },
    onSubmit
});
  useEffect(() => {
    const cookie = Cookies.get("spage2");
    if (cookie) navigate("/test");
  }, []);
  useEffect(() => {
    setLoader(true);
    console.log("Fetching user data...");
    axios
      .get(`${import.meta.env.VITE_APP_NODE_URL}/user-test/`)
      .then((res) => {
        // Set initial form values using the response data
        setRes(res.data);
        console.log("Initial values fetched: ", res.data);
        
        // Set the formik values to the fetched data
        formik.setValues({
          student_no: res.data.studentNo,
          password: res.data.password,
        });

        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        toast.error("Error fetching user data");
      });
  }, []); // Empty dependency array to run only once when the component mounts


  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    const cookie = Cookies.get("spage2");
    if (cookie) navigate("/test");
    else {
      localStorage.removeItem("timer");
      deleteCookies();
    }
  }, []);

  const navigate = useNavigate();



  // const validate = (values) => {
  //   let errors = {};
  //   if (!values.student_no) {
  //     errors.student_no = "Please Enter Student Number";
  //   } else if (
  //     !/^[2][2](([x]{3})|[0-9]{2,3})([0-9]){3}(-d)?$/i.test(values.student_no)
  //   ) {
  //     errors.student_no = "Enter Correct Student Number";
  //   }
  //   if (!values.password) {
  //     errors.password = "Please Enter Password";
  //   } else if (
  //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/i.test(
  //       values.password
  //     )
  //   ) {
  //     errors.password = "Invalid Password";
  //   }

  //   return errors;
  // };



  const adminLogin = () => {
    // console.log(res);
    Cookies.set("isLoggedIn", true);
    isLoggedin = true;
    Cookies.set("isAdmin", true);
    Cookies.set("apage1", true);
    navigate("/admin");
  };

  return (
    <div>
    <ToastContainer/>
      <div className="loginPage">
        {/* <img src="/Images/csiLogo.svg"
          style={{ height: 70, width: 50 }}
          alt="login"
          className="loginLogo"
        /> */}
        <div className="login">
          <form className="formSection" onSubmit={formik.handleSubmit}>
            <div elevation={3} className="login_form">
              <h3 className="login_form_header">Login Here!</h3>
              <div className="input_field">
                <TextField
                  label="Enter Your Student Number"
                  variant="outlined"
                  name="student_no"
                  sx={{ width: "80%" }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.student_no}
                  InputProps={{
                    style: {
                      borderRadius: "8px 4px 4px 8px",
                      borderLeft: "4px solid #543BA0",
                    },
                  }}
                />
                {formik.touched.student_no && formik.errors.student_no ? (
                  <p className="error">{formik.errors.student_no}</p>
                ) : null}
              </div>
              <div className="input_field">
                <FormControl
                  sx={{
                    borderRadius: "8px",
                    borderLeft: "4px solid #543BA0",
                    width: "80%",
                  }}
                  className="login_field"
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    className="login_field"
                    type={showPassword ? "text" : "password"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {formik.touched.password && formik.errors.password ? (
                  <p className="error">{formik.errors.password}</p>
                ) : null}
              </div>
              <Button
                variant="contained"
                className="login_btn"
                type="submit"
                sx={{
                  backgroundColor: "#543BA0",
                  "&:hover": { backgroundColor: "#543BA0" },
                  margin: "1rem 0",
                }}
              >
                LOGIN
              </Button>

              <p className="text-xs text-gray-600"> or</p>

              <Button
                variant="contained"
                className="login_btn"
                type="button"
                onClick={adminLogin}
                sx={{
                  backgroundColor: "#ff7e67",
                  "&:hover": { backgroundColor: "#ff7e67" },
                  margin: "0.5rem",
                }}
              >
                Login As Admin
              </Button>
            </div>
          </form>
          <div className="imageSection">
            <img
              src={LoginGif}
              style={{ height: "90vh", mixBlendMode: "darken" }}
              alt="login"
            />
          </div>
        </div>
        <ToastContainer />
      </div>
      <div
        className="absolute top-0"
        style={{ marginLeft: "-2rem", display: loader ? "" : "none" }}
      >
        <Loader />
      </div>
    </div>
  );
};

export default Login;
