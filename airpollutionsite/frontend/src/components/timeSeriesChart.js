import React from "react";

class TimeSeriesChart extends React.Component {
  constructor (props){
    super(props);
  

  this.state = {
     city: this.props.city,
    //  dummydata
     cityData: [12, 19, 3, 5],
   }
  this.makeChart = this.makeChart.bind(this);
  }

  makeChart(){
    // got the code below from chart js documentation
    // eventually want to convert to a more complex type of graph
    const ctx = document.getElementById('chart').getContext('2d');
    // make a list of numbers from 2004 to 2020
    var list = [0];
    // pushing in the length of chartData.
    for (var i=1; i<=this.props.cityData.chartData.length; i++) {
      list.push(i);
    }
    console.log(list);
    // currently, the xLabels are the length of chartData.
    // need to figure out a way to still use this label ticks while changing the label as year values
    const xLabels = list;
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xLabels,
            datasets: [{
                label: 'pm2.5',
                // make line tension 0 to not have any curves
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
                      // A way to change what the value looks like...  but not too flexible
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
    // whenever the state/prop updates, remake the Chart
    // this might be causing the bug where the chart randomly updates when the mouse hover overs certain points on the chart
    this.makeChart();
    }
    x = this.state.city;
  }


	render() {
    console.log("this.props.city: ", this.props.city);
    // var cityName = this.props.city
    // console.log("cityName: ", cityName)
    return (
			<>
      {/* hard to style canvas, so make a container and style that */}
        <div 
          // className="chart-container" 
          // style={{height: "70%", width: "90%", margin:'0px'}}
          >
          {/* canvas is the chart */}
          <canvas id="chart" 
          style={{
          height:"130px",
          // display:"inline-block", float: "left"
          }}
          ></canvas>
          <br/>
          <h5 id='title'><span style={{color: "rgb(243, 69, 69)"}}><strong>{this.props.cityName}</strong></span> - PM2.5 levels Over Time
          {/* {this.props.city} */}
        </h5>
        </div>

			</>		
	)
	}
}

export default TimeSeriesChart