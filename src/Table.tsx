import { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const Table = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [showAddRowInputs, setShowAddRowInputs] = useState(false);
  const [newRowValues, setNewRowValues] = useState({});

  const columns = useMemo(() => {
    if (data.length === 0) return [];

    return [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      ...Object.keys(data[0]).map(key => ({
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),
      })),
    ];
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleAddRow = () => {
    if (Object.values(newRowValues).every(value => value !== '')) {
      setData(prevData => [...prevData, newRowValues]);
      setNewRowValues({});
      setShowAddRowInputs(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <div className="mb-4 font-mono">
        <div className="flex items-center justify-end">
          {showAddRowInputs && (
            <div className="mt-2 flex space-x-2 items-center w-full">
              {Object.keys(data[0]).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={`Enter ${key}`}
                  value={newRowValues[key] || ''}
                  onChange={(e) => setNewRowValues({ ...newRowValues, [key]: e.target.value })}
                  className="border p-2 flex-grow"
                />
              ))}
              <button 
                onClick={handleAddRow} 
                className="bg-gray-100 p-2 rounded flex items-center justify-center"
              >
                Add Row
              </button>
            </div>
          )}
          <button 
            onClick={() => setShowAddRowInputs(prev => !prev)} 
            className={`bg-gray-100 p-2 rounded flex items-center justify-center ml-2 ${showAddRowInputs ? 'mt-2' : 'mt-2.5'}`} // Conditional class
          >
            {showAddRowInputs ? 'Cancel' : 'Add New Row +'}
          </button>
        </div>


        {/* <button onClick={() => {}} className="bg-gray-100 p-2 rounded ml-2">
          Remove Selected Rows
        </button> */}
      </div>

      <table className="min-w-full bg-white">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="px-6 py-3 text-left font-medium font-mono text-gray-400 uppercase tracking-wider">
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr 
              key={row.id} 
              onClick={row.getToggleSelectedHandler()} 
              className={`px-6 py-4 whitespace-nowrap font-mono ${row.getIsSelected() ? 'bg-gray-100' : ''}`}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
