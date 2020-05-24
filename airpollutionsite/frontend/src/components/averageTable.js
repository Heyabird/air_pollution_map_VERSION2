import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableHeader from '@material-ui/core/TableHeader';
// import TableHeaderColumn from '@material-ui/core/TableHeaderColumn';
// import TableRowColumn from '@material-ui/core/TableRowColumn';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

// filling in the table
const averageTable = props => {

const averagePM = props.averageData;

function renderTableData() {
  // let tableData = props.cityData.tableData[0];
  console.log("props.averageData:", props.averageData)
  return props.averageData.map((value, index) => {
     const { id, average_2018, average_2019, average_2020 } = value //destructuring

     return (
        <tr key={id}>
           <td>{id}</td>
           <td>{average_2018}</td>
           <td>{average_2019}</td>
           <td>{average_2020}</td>
        </tr>
     )
  })
}

function renderTableHeader() {
  let header = ["", 2018, 2019, 2020]
  return header.map((key, index) => {
     return <th key={index}>{key}</th>
  })
}

  return (
    <>
      {/* <div> */}
        <table id='averageTable'>
            <tbody>
            <tr>{renderTableHeader()}</tr>
              {renderTableData()}
            </tbody>
        </table>
      {/* </div> */}
      <h5 id='title'>Average PM2.5 Levels</h5>
     
    </>
  );

}

export default averageTable