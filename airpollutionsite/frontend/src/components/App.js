import React from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import TimeSeriesChart from './timeSeriesChart';
import AverageTable from './averageTable';
// import 'bootstrap/dist/css/bootstrap.min.css';

// mapbox token; remove this later into .env
mapboxgl.accessToken = 'pk.eyJ1IjoiaGV5YWJpcmQiLCJhIjoiY2s5ZWl0c3M0MDJzdDNnbzE2dXB5bDRhdSJ9.bNbukgXKDz5ZbTc9gQ4-bQ';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // starting data for average table
      averageData: [
        { id: 'March', average_2018: '❓', average_2019: '❓', average_2020: '❓' },
        { id: 'April', average_2018: '❓', average_2019: '❓', average_2020: '❓'},
        { id: 'May', average_2018: '❓', average_2019: '❓', average_2020: '❓' }
      ],
      // starting data for time-series chart
      cityData: {
        city: 'Los Angeles',
        // making dummy data for time series chart...
        chartData: [{2004:30},{2005:30},{2006:30},{2007:30},{2008:30},{2009:30},{2010:30},{2011:30},{2012:30},{2013:30},{2014:30},{2015:30},{2016:30},{2017:30},{2018:30},{2019:30},{2020:30}]
      },
      arrTime: [],
      arrPM: [],
      cityName: "",
      lng: -100,
      lat: 35,
      zoom: 2,
      city: "_________________",
    };
    this.getCityData = this.getCityData.bind(this);
    this.getAverageData = this.getAverageData.bind(this);
    }
  

  // receive city data from Django
  getCityData(city) {
    console.log("get city activated!:", city)
    let id;
    // match each city to the id param for url 
    if (city === "Beijing Shi, China") {
      id = 1
    } else if (city==="Chicago, Illinois, United States") {
      id = 2
    } else if (city === "Houston, Texas, United States") {
      id = 3
    } else if(city === "Los Angeles, California, United States") {
      id = 4
    } else if (city === "New Delhi, Delhi, India") {
      id = 5
    } else if (city === "New York, New York, United States") {
      id = 6
    } else if (city === "San Diego, California, United States") {
      id = 7
    } else if (city === "San Francisco, California, United States") {
      id = 8
    }

    // receive the data from the url using axios
    var uri = `http://localhost:8000/data/${id}`
    axios.get(uri)
    .then(response => {
      console.log("retrieving city data: ", response.data)
      var arrPM = [];
      var arrTime = [];
      var objPM = {};
      var key_value = {};
      // extract all the PM2.5 values from the city data per week(=168hours) and put into an array
      for(let i=0; i<response.data.data.length; i+=168) {
        // get time as year.month.day and put it in an array
        var time = response.data.data[i].year + "." + response.data.data[i].month
        arrTime.push(time)
        // get all the pm2.5 values into an array
        arrPM.push(response.data.data[i].pm)
      }

      // zipping the time values with the pm values as key-value pairs inside an object
      var result = {};
      arrTime.forEach((arrTime, i) => result[arrTime] = arrPM[i]);
      console.log("result: ", result);
      console.log()
      
      // update the time-series chart data
      this.setState({
        cityData: {
          city: this.state.city,
          chartData: result,
        },
        arrTime: arrTime,
        arrPM: arrPM
      }, () => console.log("chartData: ", this.state.cityData.chartData))
    })
    .catch(function(err){
      console.log(err)
    })
  }

  // receive average pm2.5 values for march, april, may 2018-2020 
  getAverageData(city) {
    console.log("get average data activated!")
    let id;
    if (city === "Beijing Shi, China") {
      id = 11
    } else if (city==="Chicago, Illinois, United States") {
      id = 22
    } else if (city === "Houston, Texas, United States") {
      id = 33
    } else if(city === "Los Angeles, California, United States") {
      id = 44
    } else if (city === "New Delhi, Delhi, India") {
      id = 55
    } else if (city === "New York, New York, United States") {
      id = 66
    } else if (city === "San Diego, California, United States") {
      id = 77
    } else if (city === "San Francisco, California, United States") {
      id = 88
    }

    // receive the data from the url via axios
    var uri = `http://localhost:8000/data/${id}`
    axios.get(uri)
    .then(response => {
      console.log("retrieving average data: ", response.data);
      var avgArr = response.data.avgs
      this.setState({
        // store average pm2.5 values from the data object in the back-end
        averageData: [
          { id: 'March', average_2018: (avgArr[0].average_pm).toFixed(2), average_2019: (avgArr[3].average_pm).toFixed(2), average_2020: (avgArr[6].average_pm).toFixed(2) },
          { id: 'April', average_2018: (avgArr[1].average_pm).toFixed(2), average_2019: (avgArr[4].average_pm).toFixed(2), average_2020: (avgArr[7].average_pm).toFixed(2)},
          { id: 'May', average_2018: (avgArr[2].average_pm).toFixed(2), average_2019: (avgArr[5].average_pm).toFixed(2), average_2020: (avgArr[8].average_pm).toFixed(2) }
        ]
    })
    // .catch(function(err){
    //   console.log(err)
    // })
  })
}

  selectCity(city) {
    this.getCityData(feature.properties.place_name);
    this.getAverageData(feature.properties.place_name);
    this.setState({
      city: feature.properties.place_name
    });
  }
  


  
  // Set map and pop up whenever the page loads
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/heyabird/ckaa8st6z07nr1ilousemiggu',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
      });
      // Add zoom and rotation controls to the map
      map.addControl(new mapboxgl.NavigationControl());
      
    // activate pop up function
    map.on('click', (e) => {
      var features = map.queryRenderedFeatures(e.point, {
        // call the layer of 8 cities that I made on mapbox studio
        layers: ['8-cities']
      });
      if (!features.length) {
        return;
      }
      var feature = features[0];
      this.setState({
        cityName: feature.properties.place_name.split(",")[0]
      })
      // make a pop up function
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        // the content inside the pop up will be just the name of the city
        .setHTML('<h3>' + this.state.cityName + '</h3>')
        .addTo(map);
      console.log("testing");
      // receive time-series and average table data everytime the page loads
      this.getCityData(feature.properties.place_name);
      this.getAverageData(feature.properties.place_name);
      this.setState({
        city: feature.properties.place_name,
      });
    });
  }

  render() {   
    // destructuring states
    const { city, cityData, averageData, cityName, arrTime, arrPM } = this.state;
    return (
      <>
        <div id="pagetitle">
          {/* make the title of the page change once the city is clicked */}
          <h3>I want to see the <a href="https://www.health.ny.gov/environmental/indoors/air/pmq_a.htm" target="_blank">PM2.5 Values</a> <span id="city"> in <span style={{color: "rgb(243, 69, 69)"}}><strong>{city}</strong></span>.</span></h3>
          <h5><strong>To choose a city, click on one of the red markers in the map.</strong></h5>
        </div>
        {/* mapContainer ref specifies that map should be drawn to the HtML page in a new <div> element */}
        <div ref={el => this.mapContainer = el} className="mapContainer" 
        // style={{height:"150px"}}
        /> 
        <br/>
        <div id="graphs">
          <TimeSeriesChart 
            city={city}
            cityData={cityData}
            cityName={cityName}
            arrTime={arrTime}
            arrPM={arrPM}/>
          <AverageTable 
            city={city}
            averageData={averageData}
            cityData={cityData}
            city={city}
            cityName={cityName}
            />
        </div>
      </>
    );
  }
}

export default App;

// This has to stay in the bottom
const container = document.getElementById("app");
render(<App />, container);