import React, { Component, useState, useRef, useEffect } from "react";
import "../Assets/Style/login.css";
import { useHistory } from "react-router-dom";
import Logo from "../Assets/Images/logo.png";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Alert from "../components/alert.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import firebase from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../components/navbar";

toast.configure();
function Signup(props) {

  const [loading,setLoading] = useState(false)
  const [phone, setPhone] = useState("");
  const [newPass,setnPass] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const inputProps = {
    step: 300,
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        // other options
      }
    );
  });

  const pushto = () => {
    let path = `/login`;
    history.push(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    if (
      phone === "" ||
      fname === "" ||
      lname === "" ||
      email === "" ||
      password == ""
    ) {
      setLoading(false)
      toast.warn("Please Fill In All The Fields !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    } else if (password !== newPass){
      setLoading(false)
      toast.warn("Password do not match !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    } 
    else {
      setLoading(true)
      const recap = window.recaptchaVerifier;
      let number = "+" + phone;
      firebase
        .auth()
        .signInWithPhoneNumber(number, recap)
        .then(function (e) {
          setLoading(false)
          let code = prompt("Enter OTP", "");
          setLoading(true)
          if (code == null) {
            setLoading(false)
            console.log("error");
            toast.error("Invalid OTP", {
              position: toast.POSITION_TOP_RIGHT,
            });
          }
          setLoading(false)
          e.confirm(code)
            .then(function (result) {
              console.log(result.user, "user");
              toast.success("Phone Verified", {
                position: toast.POSITION_TOP_RIGHT,
              });
              const user = {
                firstName: fname,
                lastName: lname,
                phone: phone,
                email: email,
                password: password,
              };
              
              setLoading(true)
              axios
                .post("https://flask-312609.df.r.appspot.com/users/register", user)
                .then((response) => {
                  console.log(response)
                  setLoading(false)
                  if (response.data.result == "User already exists") {
                    toast.error("User already exists", {
                      position: toast.POSITION_TOP_RIGHT,
                    });
                  } else {
                    props.history.push({
                      pathname: "/login",
                    });
                  }
                }).catch((error) => {
                  console.log(error);
                });
            })
            .catch((e) => {
              console.log(e);
            });
        });
    }
  };

  return (
    <div>
      <Navbar home="Home" />
      <div className="login-logo">
        <div className="logo">
          <img
            src={Logo}
            alt="logo"
            style={{ width: "200px", height: "200px" }}
          />
          <h1
            style={{
              position: "absolute",
              top: "25%",
              left: "20%",
              color: "white",
              fontSize: "70px",
              fontWeight: "bold",
              fontFamily: "Sansita Swashed",
            }}
          >
            Sales Forecast
          </h1>
        </div>
      </div>
      <div className="login-form">
        <h1
        >
          Register
        </h1>
        <form>
          <FormLabel className="form9"
            filled={true}
            focused={true}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"45px",
              marginLeft:"30px",
              fontSize: "20px",
            }}
          >
            Enter First Name
          </FormLabel>
          <TextField className="form9"
            autoFocus={true}
            id="fname"
            size="medium"
            type="text"
            helperText="Mag"
            defaultValue={fname}
            onChange={(e) => setFName(e.target.value)}
            inputProps={inputProps}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"65px",
              marginLeft:"30px",
              fontSize: "30px",
              width: 300,
            }}
          />
          <FormLabel className="form9"
            filled={true}
            focused={true}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"135px",
              marginLeft:"30px",
              fontSize: "20px",
            }}
          >
            Enter Last Name
          </FormLabel>
          <TextField className="form9"
            id="fname"
            size="medium"
            type="text"
            helperText="Madden"
            defaultValue={lname}
            onChange={(e) => setLName(e.target.value)}
            inputProps={inputProps}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"165px",
              marginLeft:"30px",
              fontSize: "30px",
              width: 300,
            }}
          />
          <FormLabel className="form9"
            filled={true}
            focused={true}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"225px",
              marginLeft:"30px",
              fontSize: "20px",
            }}
          >
            Enter Phone Number
          </FormLabel>
          <PhoneInput className="form9" 
            country={"jp"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            autoFocus={true}
            inputStyle={{ width: "300px" }}
            id="number"
            size="medium"
            type="number"
            enableSearch={true}
            placeholder="Enter Phone Number"
            disableSearchIcon={true}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"265px",
              marginLeft:"30px",
              fontSize: "10px",
              width: 300,
            }}
          />
          <FormLabel className="form9"
            filled={true}
            focused={true}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"325px",
              marginLeft:"30px",
              fontSize: "20px",
            }}
          >
            Enter Email
          </FormLabel>
          <TextField className="form9"
            id="email"
            size="medium"
            type="email"
            helperText="mag@gmail.com"
            inputProps={inputProps}
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"345px",
              marginLeft:"30px",
              fontSize: "30px",
              width: 300,
            }}
          />
          <FormLabel className="form9"
            filled={true}
            focused={true}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"425px",
              marginLeft:"30px",
              fontSize: "20px",
            }}
          >
            Enter Password
          </FormLabel>
          <TextField className="form9"
            id="password"
            size="medium"
            type="password"
            helperText="password"
            inputProps={inputProps}
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"445px",
              marginLeft:"30px",
              fontSize: "30px",
              width: 300,
            }}
          />
          <FormLabel className="form9"
            filled={true}
            focused={true}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"505px",
              marginLeft:"30px",
              fontSize: "20px",
            }}
          >
            Confirm Password
          </FormLabel>
          <TextField className="form9"
            id="password"
            size="medium"
            type="password"
            helperText="password"
            inputProps={inputProps}
            defaultValue={newPass}
            onChange={(e) => setnPass(e.target.value)}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"525px",
              marginLeft:"30px",
              fontSize: "30px",
              width: 300,
            }}
          />

          <Fab className="form8"
            id="recaptcha-container"
            variant="extended"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              margin: "5px",
              width: 200,
              fontSize: "16px",
              color: "white",
              position: "absolute",
              marginTop:"585px",
              marginLeft:"30px",
            }}
          >
             {loading && <i className="fa fa-cog fa-spin"></i>}
             {loading && <span> Regsitering </span>}
             {!loading && <span> Regsiter </span>}
          </Fab>
          <Fab className="form8"
            variant="extended"
            color="primary"
            onClick={pushto} 
            style={{
              margin: "5px",
              width: 200,
              fontSize: "16px",
              color: "white",
              position: "absolute",
              marginTop:"645px",
              marginLeft:"30px",
            }}
          >
            Login
          </Fab>
        </form>
      </div>
    </div>
  );
}

export default Signup;
