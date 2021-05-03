import React, { Component, useState, useRef, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import ParticleBackground from '../components/particleBackground'
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import '../Assets/Style/heart.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "../components/alert";
import ReactLoading from "react-loading";
import Chart from "react-apexcharts";

toast.configure();
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://aarthif-nawaz.github.io/">
        Aarthif Nawaz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    marginLeft: "700px",
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    float: "left",
    width: "100%", // Fix IE 11 issue.
    marginLeft: "20px",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  select: {
    marginTop: theme.spacing(2),
  },
}));

function Form(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [sel, setSel] = useState(false);
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [quantity, setQuantity] = useState('')
  const [file, SetFile] = useState('')
  const [series, setSeries] = useState()
  const [opt, setOpt] = useState()
  const [sin, setSin] = useState(false)
  const [results, setResults] = useState([])

  const onFileChange = (e) => {
    SetFile(e.target.files[0])
    setDay('')
    setMonth('')
    setYear('')
    setQuantity('')
  }

  const download = () => {
    const data = {
      prediction: results,
      file: file.name
    }
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    axios
      .post("https://flask-312609.df.r.appspot.com/download", data, options)
      .then((response) => {
        setLoading(false);
        console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Predictions.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((e) => {
        console.log(e)
      });

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(day)
    if (!day.trim().length || !month.trim().length || !year.trim().length || !quantity.trim().length) {
      console.log("hello")
      const formData = new FormData();
      formData.append(
        "file",
        file,
        file.name
      );
      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      axios
        .post("https://flask-312609.df.r.appspot.com/sales", formData, options)
        .then((response) => {
          setSin(false)
          setResults([...response.data.result])
          setLoading(false);
          setOpt({
            options: {
              chart: {
                id: "basic-line"
              },
              xaxis: {
                type: 'category',
                categories: [],
                labels: {
                  show: true,
                  rotate: -45,
                  rotateAlways: false,
                  hideOverlappingLabels: true,
                  showDuplicates: false,
                  trim: false,
                  minHeight: undefined,
                  maxHeight: 120,
                  style: {
                    colors: [],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label',
                  },
                  offsetX: 0,
                  offsetY: 0,
                  format: undefined,
                  formatter: undefined,
                  datetimeUTC: true,
                  datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd MMM',
                    hour: 'HH:mm',
                  },
                },
                axisBorder: {
                  show: true,
                  color: '#78909C',
                  height: 1,
                  width: '100%',
                  offsetX: 0,
                  offsetY: 0
                },
                axisTicks: {
                  show: true,
                  borderType: 'solid',
                  color: '#78909C',
                  height: 6,
                  offsetX: 0,
                  offsetY: 0
                },
                tickAmount: undefined,
                tickPlacement: 'between',
                min: undefined,
                max: undefined,
                range: undefined,
                floating: false,
                position: 'bottom',
                title: {
                  text: undefined,
                  offsetX: 0,
                  offsetY: 0,
                  style: {
                    color: undefined,
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-title',
                  },
                },
                crosshairs: {
                  show: true,
                  width: 1,
                  position: 'back',
                  opacity: 0.9,
                  stroke: {
                    color: '#b6b6b6',
                    width: 0,
                    dashArray: 0,
                  },
                  fill: {
                    type: 'solid',
                    color: '#B1B9C4',
                    gradient: {
                      colorFrom: '#D8E3F0',
                      colorTo: '#BED1E6',
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    },
                  },
                  dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 1,
                    opacity: 0.4,
                  },
                },
                tooltip: {
                  enabled: true,
                  formatter: undefined,
                  offsetY: 0,
                  style: {
                    fontSize: 0,
                    fontFamily: 0,
                  },
                },
              }
            }
          })
          setSeries({
            series: [
              {
                name: "Sales Forecast",
                data: response.data.result
              }
            ]
          })
          setSel(true)
          console.log(series.series.name)

          console.log(response.data.result);
        })
        .catch((e) => {
          console.log(e)
        });

    }
    else {
      const Sales = {
        day: day,
        month: month,
        year: year,
        quantity: quantity
      };

      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      axios
        .post("https://flask-312609.df.r.appspot.com/sales_one", Sales, options)
        .then((response) => {
          setLoading(false);
          setSel(false)
          setPrediction(response.data.result[0])
          setSin(true)
          console.log(response.data.result);
        })
        .catch((e) => {
          console.log(e)
        });
    }

  };




  return (
    <Container maxWidth="xl" className="Heartform">
      <CssBaseline />
      {loading ? (
        <div style={{ marginLeft: "550px", marginTop: "100px" }}>
          <ReactLoading
            type="bars"
            color="#C58121"
            height="350px"
            width="350px"
          />
          <h1 style={{ marginLeft: "80px", fontSize: "40px" }}>Forecasting</h1>
        </div>
      ) : (
        <div>
          <div className={classes.paper}>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: "20px", marginLeft: "600px" }}
            >
              Sales Forecasting
            </Typography>
            <form className="heartForm" onSubmit={handleSubmit}>
              <Grid
                component={Paper}
                elevation={10}
                style={{ paddingLeft: "20px" }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="day"
                      label="Day"
                      name="day"
                      type="number"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      autoComplete="63"
                      autoFocus
                      helperText="Enter Day"
                    />
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="month"
                      label="Month"
                      name="month"
                      type="number"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      autoComplete="63"
                      autoFocus
                      helperText="Enter Month"
                    />
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="year"
                      label="Year"
                      name="year"
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      autoComplete="63"
                      autoFocus
                      helperText="Enter Year"
                    />
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="quantity"
                      label="Quantity"
                      name="quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      autoComplete="63"
                      autoFocus
                      helperText="Enter Qunantity"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="label"
                    disabled={loading}
                    style={{ width: "250px", height: "40px", marginLeft: "5px" }}
                  >
                    Select CSV File
                    <input style={{ display: 'None' }} type="file" onChange={onFileChange} />
                  </Button>
                </Grid>

                <Button
                  id="btn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={handleSubmit}
                  style={{ width: "250px", alignSelf: 'center', height: "40px", marginBottom: "40px", marginTop: 40 }}
                  className="submitbtn"
                >
                  {/* {loading && <i className="fa fa-cog fa-spin"></i>}
                  {loading && <span> Analyzing </span>}
                  {!loading && <span> Analyze </span>} */}
                  Forecast
                </Button>
              </Grid>
            </form>
            {sel ?
              <div className="graph">
                <Chart
                  options={opt.options}
                  series={series.series}
                  type="line"
                />
                <Button
                  variant="contained"
                  color="primary"
                  component="label"
                  disabled={loading}
                  onClick={download}
                  style={{ width: "250px", height: "40px", alignContent: 'center', alignSelf: 'center' }}
                >
                  Download CSV
                  </Button>
              </div> : <></>}
            {sin ? <div className="prediction"><h1> Sales Prediction : <b> <i> $ {prediction} </i></b> </h1></div> : <></>}
          </div>
        </div>
      )}
    </Container>
  );
}
export default Form;
