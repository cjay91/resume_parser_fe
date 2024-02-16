import React, { useEffect, useState } from "react";

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

    const handleDownload = (filename) => {
        // Implement your download logic here, e.g., open a new window or initiate a download
        alert(`Downloading file: ${filename}`);
    };

    return (
        <div>
            <div className="upload-space"></div>

            <table className='table' style={{ width: '800px', margin: 'auto', borderCollapse: 'collapse' }}>
                <thead>
                    <tr key='id' style={{ backgroundColor: '#f2f2f2' }}>
                        <td>Rank</td>
                        <td>Filename</td>
                        <td>Download</td>
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
                                    <button className="user-friendly-button" onClick={() => handleDownload(record.Filename)}>
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default YourReactComponent;
