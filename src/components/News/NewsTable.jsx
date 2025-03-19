import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function NewsTable({ data, onDelete }) {
  const navigate = useNavigate();

  const handleUpdate = (row) => {
    navigate(`/editNews/${row?.newsId}`);
  };

  const handleRowClick = (row) => {
    navigate(`/viewNews/${row.original.newsId}`);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "newsTitle",
        header: "Title",
        enableSorting: true,
      },
      {
        accessorKey: "newsDescription",
        header: "Description",
        enableSorting: true,
      },
      {
        accessorKey: "newsImage",
        header: "Image",
        Cell: ({ cell }) => (
          <img
            src={cell.getValue()}
            alt="News"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        enableSorting: true,
      },
      {
        accessorKey: "author",
        header: "Author",
        enableSorting: true,
      },
      {
        accessorKey: "newsDate",
        header: "Date Published",
        enableSorting: true,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        enableSorting: true,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        enableSorting: true,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "isActive",
        header: "Status",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Published" : "Draft"),
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
                onDelete(row.original.newsId);
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