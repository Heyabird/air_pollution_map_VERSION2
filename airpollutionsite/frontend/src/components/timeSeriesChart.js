import React from "react";

class TimeSeriesChart extends React.Component {
	// const myChartRef = this.chartRef.current.getContext("2d");
  constructor (props){
    super(props);
  

  this.state = {
     city: this.props.city,
    //  dummydata
     cityData: [12, 19, 3, 5],
   }
  // this.cityNameOnly = this.cityNameOnly.bind(this);
  this.makeChart = this.makeChart.bind(this);
  }

  // // function to get only the city name -- 
  // cityNameOnly(city) {
  //   let arr = this.props.city.split(", ");
  //   this.setState({city: arr[0]})
  //   console.log(arr)
  //   console.log(this.state.city)}
  
  makeChart(){
    // got the code below from chart js documentation
    // eventually want to convert to a more complex type of graph
    const ctx = document.getElementById('chart').getContext('2d');
    // make a list of numbers from 2004 to 2020
    var list = [0];
    // for (var i = 2004; i <= 2020; i++) {
    //     list.push(i);
    // }
    for (var i=0; i<=this.props.cityData.chartData.length; i++) {
      list.push(i);
    }
    console.log(list);
    const xLabels = list;
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLabels,
            datasets: [{
                label: 'pm2.5',
                lineTension: 0,
                data: this.props.cityData.chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          scales: {
              xAxes: [{
                  ticks: {
                      // Include a dollar sign in the ticks
                      callback: function(value, index, values) {
                          return value ;
                      }
                  }
              }]
          }
      }
    });
  }

  // when the page loads, chart is made
  componentDidMount() {
    this.makeChart();
  }

  // need to improve this so that it doesnt randomly update
	componentDidUpdate() {
    var x;
    if (x!==this.state.city){
    this.makeChart();
    }
    x = this.state.city;
  }


	render() {
    console.log(this.state.city);

    return (
			<>
      {/* hard to style canvas, so make a container and style that */}
        <div 
          // className="chart-container" 
          // style={{height: "70%", width: "90%", margin:'0px'}}
          >
          {/* canvas is the chart */}
          <canvas id="chart" 
          // style={{width:"800px", height:"180px", display:"inline-block", float: "left"}}
          ></canvas>
          <br/>
          <h5 id='title'>PM2.5 levels Over Time!
          {/* {this.props.city} */}
        </h5>
        </div>

			</>		
	)
	}
}

export default TimeSeriesChart