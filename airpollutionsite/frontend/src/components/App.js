import React from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import TimeSeriesChart from './timeSeriesChart';
import AverageTable from './averageTable';
// import 'bootstrap/dist/css/bootstrap.min.css';

// remove this later into .env
mapboxgl.accessToken = 'pk.eyJ1IjoiaGV5YWJpcmQiLCJhIjoiY2s5ZWl0c3M0MDJzdDNnbzE2dXB5bDRhdSJ9.bNbukgXKDz5ZbTc9gQ4-bQ';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this is a dummy data... eventually want to turn the actual external data in to this particular object format so that it is easy to pull into charts
      averageData: [
        { id: 'March', average_2018: 4, average_2019: 3, average_2020: 5 },
        { id: 'April', average_2018: 3, average_2019: 2, average_2020: 9},
        { id: 'May', average_2018: 5, average_2019: 3, average_2020: 10 }
      ],
      cityData: {
        city: 'Los Angeles',
        chartData: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        tableData: [
          { id: 'March', average_2018:'❓', average_2019:'❓', average_2020:'❓'},
          { id: 'April', average_2018:'❓', average_2019:'❓', average_2020:'❓'},
          { id: 'May', average_2018:'❓', average_2019:'❓', average_2020:'❓'}
        ],
      },
      // externaldata takes in data from browser via axios call
      externaldata: "",
      // mockAveragePM: [
      //   ['March', 30, 40, 50],
      //   ['April', 10, 20, 30],
      //   ['May', 33, 22, 33]
      // ],  
      lng: -0,
      lat: 35,
      zoom: 1,
      city: "_________________",
    };
    this.getCityData = this.getCityData.bind(this);
    this.getAverageData = this.getAverageData.bind(this);
    // this.updateCityData = this.updateCityData.bind(this);
    }
  

  // receive city data from the server
  getCityData(city) {
    console.log("get city activated!:", city)
    let id;
    // need to refractor below code; shortening city names
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
      // extract all the PM2.5 values from the city data
      for(let i=0; i<response.data.data.length; i++) {
        arrPM.push(response.data.data[i].pm)
        // console.log("arrPM being pushed:", arrPM)
      }
      console.log("arrPM:", arrPM);
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

    // receive the data from the url
    var uri = `http://localhost:8000/data/${id}`
    axios.get(uri)
    .then(response => {
      console.log("retrieving average data: ", response.data)
      this.setState({
        averageData: [
          { id: 'March', average_2018: 1, average_2019: 1, average_2020: 1 },
          { id: 'April', average_2018: 1, average_2019: 1, average_2020: 1},
          { id: 'May', average_2018: 1, average_2019: 1, average_2020: 1 }
        ]
    })
    .catch(function(err){
      console.log(err)
    })
  })
}
  


  
  // Set map and pop up whenever the page loads
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/heyabird/ckaa8st6z07nr1ilousemiggu',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
      });
      
    // activate pop up function
    map.on('click', (e) => {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['8-cities']
      });
      if (!features.length) {
        return;
      }
      var feature = features[0];
      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.place_name + '</h3>')
        .addTo(map);
      console.log("testing");
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
          <h2>I want to see the <a href="https://www.health.ny.gov/environmental/indoors/air/pmq_a.htm" target="_blank">PM2.5 Values</a> in <span style={{color: "red"}}>{city}</span>.</h2>
          <h4><strong>To choose a city, click on one of the red markers in the map.</strong></h4>
        </div>
        <br/>
        {/* mapContainer ref specifies that map should be drawn to the HtML page in a new <div> element */}
        <div ref={el => this.mapContainer = el} className="mapContainer" /> 
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