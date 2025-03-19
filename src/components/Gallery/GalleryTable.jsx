import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GalleryTable = ({ data, onDelete = () => {} }) => {
  const navigate = useNavigate();

  const handleUpdate = (row) => {
    navigate(`/editGallery/${row?.gallaryId}`);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleRowClick = (row) => {
    navigate(`/viewGallery/${row.original.gallaryId}`);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "albumName", header: "Album Name", enableSorting: true },
      {
        accessorKey: "albumDescription",
        header: "Description",
        enableSorting: true,
      },
      {
        accessorKey: "dateAdded",
        header: "Date Added",
        enableSorting: true,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "isActive",
        header: "Status",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Active" : "Inactive"),
      },
      {
        accessorKey: "societyId",
        header: "Society ID",
        enableSorting: true,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleUpdate(row.original);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.original.gallaryId);
              }}
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
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row),
      style: { cursor: "pointer" },
    }),
  });

  return (
    <Paper sx={{ padding: 2 }}>
      <MaterialReactTable table={table} />
    </Paper>
  );
};

export default GalleryTable;
