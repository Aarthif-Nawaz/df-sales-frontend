import React, { Component, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../Assets/Style/home.css";
import Card from "../components/card";
import Heart from "../Assets/Images/heart.jpg";
import Footer from '../components/footer'
import Button from "@material-ui/core/Button";
import { authetication } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function Home(props) {
    const history = useHistory();
    let navlink;
    if(sessionStorage.getItem('name')===null){
      navlink= <Navbar login="Login" signup="Register" />
    }
    else{
      navlink= <Navbar login="Logout" />
    }
    const heart = () => {
      if(sessionStorage.getItem('name')===null){
        // sessionStorage.setItem('heart',"heart")
        // sessionStorage.removeItem('malaria')
        toast.info("Please login to diagnose Heart disease", {
          position: toast.POSITION_TOP_RIGHT,
        });
      }
      else{
        let path = `/Sales`; 
        history.push(path);
      }
    }
      
    
  return (
    <div className="bg">
      {navlink}
      <div className="about">
        <h1 className="abtText">About Us</h1>
        <h4 style={{color:"#fff"}}>
          Sales Forecasting
          <br /> Sales Forecasting For CSV Files
          <br /> Sales Forecasting Based On Individual Predictions
        </h4>
      </div>
      <hr style={{width:400}} />
      <div className="over">
        <div className="card" id="sales">
          <Card
            image={Heart}
            title="Sales Forecasting"
            description="An AI Based Sales Forecasting Prediction"
          />
          <Button size="large" color="primary" onClick={heart}>
          Forecast
        </Button>
        </div>
        <div className="card" id="sales">
          <Card
            image={Heart}
            title="Sales Forecasting"
            description="An AI Based Sales Forecasting Prediction"
          />
           <Button size="large" color="primary" onClick={heart}>
          Forecast
        </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
