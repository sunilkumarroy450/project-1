import React, { useEffect, useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask } from "../../redux/features/taskSlice";
import { COLUMNS, GROUP_COLUMNS } from "./columns";
import { Checkbox } from "./Checkbox";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const TaskItem = () => {
  const navigate = useNavigate();
  const { tasks, loading } = useSelector((store) => store);
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

  const handleDelete = () => {
    if (selectedFlatRows.length === 1) {
      const selectedItemsList = selectedFlatRows?.map((item) => item?.original);
      const selectedItem = selectedItemsList?.find((item) => item);
      dispatch(deleteTask(selectedItem._id));
    } else {
      alert("Please select one item");
    }
  };

  const handleUpdate = () => {
    if (selectedFlatRows.length === 1) {
      const selectedItemsList = selectedFlatRows?.map((item) => item?.original);
      const selectedItem = selectedItemsList?.find((item) => item);
      navigate(`/update/${selectedItem._id}`);
    } else {
      alert("Please select one item");
    }
  };

  const override = {
    display: "block",
    margin: "0 auto",
  };

  if (loading) {
    return (
      <ClipLoader
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div className=" flex flex-col p-12 ">
      <div className="flex flex-row">
        <button
          onClick={handleDelete}
          className="border py-1 px-4 text text-sm rounded-sm"
        >
          Delete
        </button>
        <button
          onClick={handleUpdate}
          className="border py-1 px-4 text text-sm rounded-sm"
        >
          Update
        </button>
      </div>
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
          {rows.map((row) => {
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
