const ApiHeaders = ({ apiHeaders, setApiHeaders }) => {
    interface Header {
        key: string;
        value: string;
    }

    const addHeader = () => {
        setApiHeaders([...apiHeaders, { key: '', value: '' }]);
    };

    const removeHeader = (index: number) => {
        const newHeaders = apiHeaders.filter((_, i) => i !== index);
        setApiHeaders(newHeaders);
    };

    const handleChange = (index: number, field: 'key' | 'value', value: string) => {
        const newHeaders = [...apiHeaders];
        newHeaders[index][field] = value;
        setApiHeaders(newHeaders);
    };

    return (
        <div className="font-mono">
            {apiHeaders.map((header, index) => (
                <div key={index} className="flex mb-2">
                    {['key', 'value'].map((field) => (
                        <input
                        key={field}
                        type="text"
                        value={header[field]}
                        onChange={(e) => handleChange(index, field as keyof Header, e.target.value)}
                        placeholder={field}
                        className="flex-grow p-2 border"
                        />
                    ))}
                    <button 
                        onClick={() => removeHeader(index)} 
                        className="ml-2 px-3 py-2 text-gray-500 rounded"
                    >
                        X
                    </button>
                </div>
            ))}
            <button 
                onClick={addHeader} 
                className="mt-2 px-3 py-2 bg-gray-400 text-white rounded"
            >
                Add additional headers
            </button>
        </div>
    );
};

export default ApiHeaders;
