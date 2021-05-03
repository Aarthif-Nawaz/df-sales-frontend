import React, { Component, useState, useRef, useEffect } from "react";
import "../Assets/Style/login.css";
import Logo from "../Assets/Images/logo.png";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Alert from "../components/alert.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authetication } from "../App";
import Navbar from "../components/navbar";

toast.configure();

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const inputProps = {
    step: 300,
  };

  useEffect(() => {
    sessionStorage.removeItem("name");
  }, []);

  const responseGoogle = (response) => {
    const email = response.profileObj.email;
    const name = response.profileObj.name;

    const user = {
      email: email,
      name: name,
    };
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    axios
      .post("https://flask-312609.df.r.appspot.com/loginGoogle", user, options)
      .then((response) => {
        console.log(response);
      });

    toast.success("Login Successfull !", {
      position: toast.POSITION_TOP_RIGHT,
    });
    sessionStorage.setItem("name", phone);
      props.history.push({
        pathname: "/home",
      });
    // if (sessionStorage.getItem("heart") === "heart") {
    //   props.history.push({
    //     pathname: "/heart",
    //   });
    // } else if (sessionStorage.getItem("malaria") === "malaria") {
    //   props.history.push({
    //     pathname: "/malaria",
    //   });
    // } else {
    //   sessionStorage.setItem("name", phone);
    //   props.history.push({
    //     pathname: "/home",
    //   });
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (phone === "" || password === "") {
      setLoading(false);
      toast.warn("Please Fill In All The Fields !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    } else {
      const user = {
        phone: phone,
        password: password,
      };

      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      axios
        .post("https://flask-312609.df.r.appspot.com/users/login", user, options)
        .then((response) => {
          setLoading(false);
          if (response.data.result == "No results found") {
            toast.warn("You are not registered", {
              position: toast.POSITION_TOP_RIGHT,
            });
            props.history.push({
              pathname: "/register",
            });
          } else if (response.data.error == "Invalid username and password") {
            toast.error("Invalid Username and password", {
              position: toast.POSITION_TOP_RIGHT,
            });
          } else {
          sessionStorage.setItem("name", phone);
            props.history.push({
              pathname: "/home",
            });
            // if (sessionStorage.getItem("heart") === "heart") {
            //   props.history.push({
            //     pathname: "/heart",
            //   });
            // } else if (sessionStorage.getItem("malaria") === "malaria") {
            //   props.history.push({
            //     pathname: "/malaria",
            //   });
            // } else {
            //   sessionStorage.setItem("name", phone);
            //   props.history.push({
            //     pathname: "/home",
            //   });
            // }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
  };

  const move = () => {
    let path = `/register`;
    history.push(path);
  };

  const responseGoogleFail = (response) => {
    console.log(response)
  };
  return (
    <div>
      <Navbar home="Home" />
      <div className="login-logo">
        <div className="logo">
          <img
          className="imgs"
            src={Logo}
            alt="logo"
            style={{ width: "200px", height: "200px" }}
          />
          <h1
          className="h1s"
            style={{
              
            }}
          >
            Sales Forecast
          </h1>
        </div>
      </div>
      <div className="login-form">
        <h1>
          Login
        </h1>
        <form validate onSubmit={handleSubmit}>
          <FormLabel id="form1"
            filled={true}
            focused={true}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"65px",
              marginLeft:"30px",
              fontSize: "20px",
            }}
          >
            Enter Mobile Number
          </FormLabel> 
          <PhoneInput id="form2"
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
              marginTop:"105px",
              marginLeft:"30px",
              fontSize: "10px",
              width: 200,
            }}
          />
          {/* <TextField
            autoFocus={true}
            id="number"
            size="medium"
            type="text"
            helperText="81+12-345-6789"
            inputProps={inputProps}
            style={{
              color: "black",
              position: "absolute",
              top: "28%",
              left: "72%",
              fontSize: "30px",
              width: 400,
            }}
          /> */}
          <FormLabel id="form3"
            filled={true}
            focused={true}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"165px",
              marginLeft:"30px",
              fontSize: "20px",
            }}
          >
            Enter Password
          </FormLabel>
          <TextField className="form5"
            id="password"
            size="medium"
            type="password"
            helperText="covid-19$"
            defaultValue={password}
            inputProps={inputProps}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              color: "black",
              position: "absolute",
              marginTop:"185px",
              marginLeft:"30px",
              fontSize: "30px",
              width: "300px",
            }}
          />
          <Fab className="form6"
            variant="extended"
            color="primary"
            disabled={loading}
            onClick={handleSubmit}
            style={{
              margin: "5px",
              width: 200,
              fontSize: "16px",
              color: "white",
              position: "absolute",
              marginTop:"255px",
              marginLeft:"135px",
            }}
          >
            {loading && <i className="fa fa-cog fa-spin"></i>}
            {loading && <span> Logging In </span>}
            {!loading && <span> Login </span>}
          </Fab>
          <Fab className="form6"
            variant="extended"
            color="primary"
            onClick={move}
            style={{
              margin: "5px",
              width: 200,
              fontSize: "16px",
              color: "white",
              position: "absolute",
              marginTop:"325px",
              marginLeft:"135px",
            }}
          >
            Register
          </Fab>
          <div className="form7"
            style={{
              margin: "5px",
              fontSize: "16px",
              color: "white",
              position: "absolute",
              marginTop:"400px",
              marginLeft:"135px"
            }}
          >
            <GoogleLogin
              clientId="296569840060-6rrg0oluuqu7ft8t36v1rhoin1g54rgo.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
            ></GoogleLogin>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
