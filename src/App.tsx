import Sidebar from './Sidebar';
import Table from './Table';

const data = [
  { name: 'John Doe', updated: 'john@example.com', edited: "", role: 'Admin' },
  { name: 'Jane Smith', updated: 'jane@example.com', edited: "", role: 'User' },
]

const header = "InsertLogo"
const listItems = ["Home", "Analytics", "Database"]

function App() {
  return (
    <div>
      <Sidebar header={header} listItems={listItems} />
      <main className="flex-1 pl-72 p-16">
        <div>
          <h2 className="text-2xl font-bold font-mono mb-4">Welcome, ...</h2>
          <Table data={data}/>
        </div>
      </main>
    </div>
  );
}

export default App;
