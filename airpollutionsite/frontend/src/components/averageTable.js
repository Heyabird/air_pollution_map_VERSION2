import React from 'react';

const averageTable = props => {

function renderTableData() {
  console.log("props.averageData:", props.averageData)
  return props.averageData.map((value, index) => {
     const { id, average_2018, average_2019, average_2020 } = value //destructuring

     return (
      //  Making the table; id is 'month'
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
  // table header
  let header = ["", 2018, 2019, 2020]
  return header.map((key, index) => {
     return <th key={index}>{key}</th>
  })
}

var cityName = props.city.split(",")[0]
console.log("cityName: ", cityName)

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
      <h5 id='title'><strong>{cityName}</strong> - Average PM2.5 Levels</h5>
     
    </>
  );

}

export default averageTable