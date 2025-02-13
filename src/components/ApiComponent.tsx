import { useState } from 'react';
import Dropdown from './Dropdown';
import ImportButton from './ImportButton';
import ApiHeaders from './ApiHeaders';
import Playground from './SearchAI/PlaygroundAI';

const ApiComponent = ({ setHeaders, setData }) => {
    const HTTPmethods = [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" },
        { value: "PUT", label: "PUT" },
        { value: "PATCH", label: "PATCH" },
        { value: "DELETE", label: "DELETE" },
      ];
    const options = [
        { value: "api1", label: "API 1" },
        { value: "api2", label: "API 2" },
        { value: "api3", label: "API 3" },
      ];
    const [source, setSource] = useState();
    const [url, setUrl] = useState();
    const [method, setMethod] = useState('GET');
    const [apiHeaders, setApiHeaders] = useState([{ key: '', value: '' }]);

    const handleSourceChange =  (selectedValue) => {
        setSource(selectedValue);
    };
    const handleUrlChange = (e) => setUrl(e.target.value);
    const handleMethodChange = (selectedValue) => {
        setMethod(selectedValue);
    };

    const handleDataImported = (importedData) => {
        if (importedData && importedData.length > 0) {
            setHeaders(Object.keys(importedData[0]));
            setData(importedData);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(url, { method });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-4">
            <Dropdown
                options={options}
                value={source}
                onChange={handleSourceChange}
            />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-grow space-x-2">
                    <Dropdown
                        options={HTTPmethods}
                        value={method}
                        onChange={handleMethodChange}
                        className="w-32"
                    />
                    <input 
                        type="text" 
                        value={url} 
                        onChange={handleUrlChange}
                        placeholder="https://your_site_address.com/api/v1/endpoint_name"
                        className="flex-grow p-2 border rounded font-mono"
                    />
                </div>
                <h3 className="font-mono"> URL parameters </h3>
                <ApiHeaders apiHeaders={apiHeaders} setApiHeaders={setApiHeaders} />
                <div className="flex space-x-8">
                    <button 
                        type="submit"
                        className="w-1/2 p-2 bg-blue-500 text-white rounded font-mono hover:bg-blue-600"
                    >
                        Send Request
                    </button>
                    <div className="w-1/4">
                        <ImportButton onDataImported={handleDataImported} />
                    </div>

                    <button 
                        type="submit"
                        className="w-1/4 p-2 border rounded font-mono hover:bg-gray-100"
                    >
                        Save Data
                    </button>
                    <Playground />
                </div>
            </form>
        </div>
    );
};

export default ApiComponent;
