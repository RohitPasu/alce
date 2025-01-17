import React from 'react';
import Papa from 'papaparse';

const ImportButton = ({ onDataImported }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (results) => {
        onDataImported(results.data);
      },
      header: true,
    });
  };

  return (
    <div className="text-center bg-gray-100 p-2.5 text-gray-700 rounded font-mono hover:bg-gray-200">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="csv-upload"
      />
      <label htmlFor="csv-upload">
        <button onClick={() => document.getElementById('csv-upload').click()} 
        className="w-full h-full" >
          Import CSV instead
        </button>
      </label>
    </div>
  );
};

export default ImportButton;
