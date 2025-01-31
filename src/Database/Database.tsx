import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import ApiComponent from '../components/ApiComponent';
import FormAI from '../components/SearchAI/FormAI';
import DatabaseTable from './DatabaseTable';

const header = "InsertLogo"
const listItems = ["Home", "Analytics", "Database"]

function Database() {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  
  return (
    <div>
      <Sidebar header={header} listItems={listItems} />
      <div className="flex-1 pl-72 p-8">
        <h1 className="text-xl font-bold font-mono mb-4">
          <Link to="/" className="text-blue-500 hover:underline">Home</Link> / Database
        </h1>
        <ApiComponent setHeaders={setHeaders} setData={setData} />
        {headers.length > 0 && data.length > 0 && (
          <DatabaseTable headers={headers} data={data} />
        )}
      </div>
    </div>
  );
}

export default Database;
