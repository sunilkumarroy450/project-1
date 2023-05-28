import React, { useEffect, useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../../redux/features/taskSlice";
import { COLUMNS, GROUP_COLUMNS } from "./columns";
import { Checkbox } from "./Checkbox";

const TaskItem = () => {
  const tasks = useSelector((store) => store.tasks);
  console.log(tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTask());
  }, []);

  //table
  const columns = useMemo(() => GROUP_COLUMNS, []);
  // const data = useMemo(() => tasks, []);
  // console.log(data, "memoised Data");
  const {
    getTableBodyProps,
    getTableProps,
    prepareRow,
    headerGroups,
    rows,
    selectedFlatRows,
  } = useTable(
    {
      columns: columns,
      data: tasks,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
  console.log(selectedFlatRows, "selectedFlatRows");
  console.log(rows, "rows");
  const firstPageRows = rows.slice(0, 5);

  return (
    <div className=" flex flex-col p-12 ">
      <table className="border border-gray-500" {...getTableProps()}>
        <thead className="border-4 border-gray-500 bg-blue-800 text-white">
          {headerGroups.map((headerGroup) => (
            <tr
              className="border-4 border-gray-500 "
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="border-4 border-gray-500 "
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border-4 border-gray-500" {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <tr className="border-4 border-gray-500" {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    className="border-4 border-gray-500"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
};

export default TaskItem;
