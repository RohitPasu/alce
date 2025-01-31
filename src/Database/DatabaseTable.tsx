const DatabaseTable = ({headers, data}) => {
    if (!headers || headers.length === 0 || !data || data.length === 0) {
        return;
    }

    return (
        <div className="overflow-x-auto">
            {headers.length > 0 && (
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                <tr className="px-6 py-3 text-left font-medium font-mono text-gray-500 uppercase tracking-wider">
                    {headers.map((heading) => (
                    <th key={heading}>{heading}</th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                    <tr className="px-6 py-4 whitespace-nowrap font-mono" key={index}>
                    {headers.map((key) => (
                        <td key={key}>{row[key]}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default DatabaseTable;
