import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const ImportButton = ({ onDataImported }) => {

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (fileExtension === 'csv') {
    Papa.parse(file, {
      complete: (results) => {
        onDataImported(results.data);
      },
      header: true,
    });
  } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      onDataImported(jsonData);
    };

    reader.readAsArrayBuffer(file);
  } else {
    alert('Unsupported file type. Please upload a .csv, .xls, or .xlsx file.');
  }
};


  return (
    <div className="text-center bg-gray-100 p-2.5 text-gray-700 rounded font-mono hover:bg-gray-200">
      <input
        type="file"
        accept=".csv, .xls, .xlsx"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="csv-upload"
      />
      <label htmlFor="csv-upload">
        <button onClick={() => document.getElementById('csv-upload').click()} 
        className="w-full h-full" >
          Import from CSV or Excel instead
        </button>
      </label>
    </div>
  );
};

export default ImportButton;
