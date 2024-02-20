import React, { useEffect, useState } from "react";
import axios from "axios";

const YourReactComponent = () => {
    const [cvScoreData, setCvScoreData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get_data');
                const data = await response.json();
                const newArray = data.map(jsonString => JSON.parse(jsonString));

                console.log(newArray)
                setCvScoreData(newArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs once on mount



    const downloadFile = async (filename) => {
        try {
            // Encode the filename to ensure safe URL usage
            const encodedFilename = encodeURIComponent(filename);
    
            // Make a GET request with the filename as a parameter
            const response = await axios.get(`http://127.0.0.1:5000/send_file_data/${encodedFilename}`, {
                responseType: 'arraybuffer', // Important to handle binary data
            });
    
            const blob = new Blob([response.data], { type: 'application/pdf' });
            // Create a data URL from the Blob
            const dataUrl = URL.createObjectURL(blob);

            // Open the PDF in a new tab
            const newTab = window.open(dataUrl, '_blank');

            // Check if the new tab is blocked by the browser's popup blocker
            if (!newTab || newTab.closed) {
                alert('The browser blocked opening a new tab. Please check your popup blocker settings.');
            }
    
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    const handleChange= async(filename) =>{
        var selected = [];


        selected.push(filename);
        console.log(selected)
        
        // do whatever you want with isChecked value
      }
      

    return (
        <div>
            <div className="upload-space"></div>

            <table className='table' style={{ width: '800px', margin: 'auto', borderCollapse: 'collapse' }}>
                <thead>
                    <tr key='id' style={{ backgroundColor: '#f2f2f2' }}>
                        <td>Rank</td>
                        <td>Filename</td>
                        <td>View PDF</td>
                        <td>Shortlist CV</td>
                    </tr>
                </thead>
                <tbody>
                    {cvScoreData
                        .sort((a, b) => b.Score - a.Score)
                        .map((record, index) => (
                            <tr key={record.id}>
                                <td>{index + 1}</td>
                                <td>{record.Filename}</td>
                                <td>
                                    <button className="user-friendly-button" onClick={() => downloadFile(record.Filename)}>
                                        View
                                    </button>
                                </td>
                                <td>
                                <input onClick={() => handleChange(record.Filename)} type="checkbox" value="Text" />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default YourReactComponent;
