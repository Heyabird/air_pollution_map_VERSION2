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
        chartData: [30,30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
      },
      // starting lng, lat, and zoom for the map
      // lng: -100,
      // lat: 35,
      // zoom: 0.5,
      lng: -100,
      lat: 35,
      zoom: 3,
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
      // extract all the PM2.5 values from the city data and put into an array
      for(let i=0; i<response.data.data.length; i++) {
        arrPM.push(response.data.data[i].pm)
        // console.log("arrPM being pushed:", arrPM)
      }
      console.log("arrPM:", arrPM);
      // update the time-series chart data
      this.setState({
        cityData: {
          city: this.state.city,
          chartData: arrPM,
        }
      }, () => console.log("update city data state"))
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
      // make a pop up function
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        // the content inside the pop up will be just the name of the city
        .setHTML('<h3>' + feature.properties.place_name.split(",")[0] + '</h3>')
        .addTo(map);
      console.log("testing");
      // receive time-series and average table data everytime the page loads
      this.getCityData(feature.properties.place_name);
      this.getAverageData(feature.properties.place_name);
      this.setState({
        city: feature.properties.place_name,
        // cityData:
      });
    });
  }

  render() {   
    // destructuring states
    const { city, cityData, averageData } = this.state;
    return (
      <>
        <div id="pagetitle">
          {/* make the title of the page change once the city is clicked */}
          <h3>I want to see the <a href="https://www.health.ny.gov/environmental/indoors/air/pmq_a.htm" target="_blank">PM2.5 Values</a> <span id="city"> in <span style={{color: "rgb(243, 69, 69)"}}><strong>{city}</strong></span>.</span></h3>
          <h5><strong>To choose a city, click on one of the red markers in the map.</strong></h5>
        </div>
        <br/>
        {/* mapContainer ref specifies that map should be drawn to the HtML page in a new <div> element */}
        <div ref={el => this.mapContainer = el} className="mapContainer" 
        // style={{height:"150px"}}
        /> 
        <br/>
        <div id="graphs">
          <TimeSeriesChart 
            city={city}
            cityData={cityData}/>
          <AverageTable 
            city={city}
            averageData={averageData}
            // averagePM={mockAveragePM}
            cityData={cityData}
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