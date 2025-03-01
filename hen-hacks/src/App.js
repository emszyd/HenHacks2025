import './App.css';
import * as React from "react";
import { useTable }  from "react-table";
import fakeData1 from "./fakedata1.json";


function App() {
  const data = React.useMemo(() => fakeData1, []);
  const col = React.useMemo(
    () => [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Object",
    accessor: "object",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  ], 
  []
);

const table = useTable({ col, data});

  return (
    <div className='App'>
      <div className = 'container'>
          <table {...table.getTableProps()}>
            <thead>
              {table.headerGroups.map((headerGroup) => (
                <tr {...table.headerGroups.getHeaderGroupProps()}>
                  {headerGroup.headers.map((col) => (
                    <th {...col.getHeaderProps()}>
                      {col.render("Header")}
                    </th>
                  ))}
               </tr>
            ))}
            </thead>
            <tbody {...table.getTableBodyProps()}>
                {table.rows.map((row) => {
                  table.prepareRow(row)
                  return(
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) =>(
                        <td {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          </table>
      </div>
    </div>
   
  );
}

export default App;
