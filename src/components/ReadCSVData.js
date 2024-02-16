import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [records, setRecords] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_data")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRecords(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <table className='table'>
        <thead>
          <tr key='id'>
            {/* Assuming you have a unique identifier like 'id' for each column
            {columns.map((column) => (
              <th key={column.id}>{column.title}</th>
            ))} */}
            <td>id</td>
            <td>Filename</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.Filename}</td>
              <td>{record.Score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComponent;
