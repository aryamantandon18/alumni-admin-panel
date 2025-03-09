import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EventsTable = ({ data, onDelete }) => {
  const navigate = useNavigate();

  const handleUpdate = (row) => {
    navigate(`/editEvent/${row?.eventId}`);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "eventName", header: "Event Name", enableSorting: true },
      {
        accessorKey: "eventImage",
        header: "Image",
        Cell: ({ cell }) => (
          <img
            src={cell.getValue()}
            alt="Event"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ),
      },
      { accessorKey: "eventLocation", header: "Location", enableSorting: true },
      {
        accessorKey: "eventDate",
        header: "Date",
        enableSorting: true,
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString() || "Not Available",
      },
      { accessorKey: "eventMode", header: "Mode", enableSorting: true },
      { accessorKey: "category", header: "Category", enableSorting: true },
      {
        accessorKey: "subcategory",
        header: "Subcategory",
        enableSorting: true,
      },
      {
        accessorKey: "linkToRegister",
        header: "Register",
        Cell: ({ cell }) => (
          <a href={cell.getValue()} target="_blank" rel="noopener noreferrer">
            Register
          </a>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Active" : "Inactive"),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              color="primary"
              onClick={() => handleUpdate(row.original)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => onDelete(row.original.eventId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    data,
    columns,
    enableSorting: true,
    enablePagination: true,
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });

  return (
    <Paper sx={{ padding: 2 }}>
      <MaterialReactTable table={table} />
    </Paper>
  );
};

export default EventsTable;
