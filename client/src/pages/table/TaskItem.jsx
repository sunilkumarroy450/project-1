import React, { useEffect, useMemo, useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTask } from "../../redux/features/taskSlice";
import { COLUMNS, GROUP_COLUMNS } from "./columns";
import { Checkbox } from "./Checkbox";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const TaskItem = () => {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const { tasks, loading } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    // setLoading(true)
    // setTimeout(() => {
    dispatch(getTask());
    // }, 200);
    // setLoading(false)
  }, []);

  //table
  const columns = useMemo(() => GROUP_COLUMNS, [GROUP_COLUMNS]);
  const data = useMemo(() => tasks, [tasks]);
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
      data,
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

  const handleDelete = async () => {
    if (selectedFlatRows.length === 1) {
      // setLoading(true);
      const selectedItemsList = selectedFlatRows?.map((item) => item?.original);
      const selectedItem = selectedItemsList?.find((item) => item);
      dispatch(deleteTask(selectedItem._id));
      setTimeout(() => {
        dispatch(getTask());
      }, 200);
      // setLoading(false);
    } else {
      alert("Please select one item");
    }
  };

  const handleUpdate = () => {
    if (selectedFlatRows.length === 1) {
      // setLoading(true);
      const selectedItemsList = selectedFlatRows?.map((item) => item?.original);
      const selectedItem = selectedItemsList?.find((item) => item);
      navigate(`/update/${selectedItem._id}`);
      // setLoading(false);
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
      {selectedFlatRows.length === 1 && (
        <div className="flex flex-row ">
          <button
            onClick={handleDelete}
            className="border py-1 px-4 text text-sm rounded-sm max-sm:px-2"
          >
            Delete
          </button>
          <button
            onClick={handleUpdate}
            className="border py-1 px-4 text text-sm rounded-sm max-sm:px-2"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/add")}
            className="border py-1 px-4 text text-sm rounded-sm max-sm:px-2"
          >
            Add task
          </button>
        </div>
      )}

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
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </div>
  );
};

export default TaskItem;
