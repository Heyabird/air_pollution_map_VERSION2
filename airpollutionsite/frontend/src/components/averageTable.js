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

// getMuiTheme,


// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// function createData(name, calories, fat, carbs) {
//   return { name, calories, fat, carbs};
// }

// filling in the table
const averageTable = props => {
  // const classes = useStyles();
  // const rows = [
  //   createData(averagePM[0][0], averagePM[0][1], averagePM[0][2], averagePM[0][3]),
  //   createData(averagePM[1][0], averagePM[1][1], averagePM[1][2], averagePM[1][3]),
  //   createData(averagePM[2][0], averagePM[2][1], averagePM[2][2], averagePM[2][3]),
  //   // createData('Cupcake', 305, 3.7, 67, 4.3),
  //   // createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

const averagePM = props.cityData.tableData;

// const customColumnStyle = { width: 12, backgroundColor: 'yellow' };

function renderTableData() {
  let tableData = props.cityData.tableData[0];
  console.log("props.averageData:", props.averageData)
  return props.cityData.tableData.map((value, index) => {
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
      <h4 id='title'>Average PM2.5 Levels!</h4>
     
    </>
  );

}

export default averageTable