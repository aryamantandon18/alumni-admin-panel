import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const InterviewExperiencesTable = ({ data, onDelete }) => {
  const navigate = useNavigate();

  const handleUpdate = (row) => {
    navigate(`/editInterviewExperience/${row?.interviewExperienceId}`);
  };

  const handleRowClick = (row) => {
    navigate(`/viewInterviewExperience/${row.original.interviewExperienceId}`);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "Title", enableSorting: true },
      { accessorKey: "company", header: "Company", enableSorting: true },
      {
        accessorKey: "interviewDate",
        header: "Date",
        enableSorting: true,
        Cell: ({ cell }) =>
          new Date(cell.getValue()).toLocaleDateString() || "Not Available",
      },
      {
        accessorKey: "onCampus",
        header: "On Campus",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
      },
      {
        accessorKey: "referral",
        header: "Referral",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
      },
      {
        accessorKey: "isApproved",
        header: "Approved",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Approved" : "Pending"),
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
                onDelete(row.original.interviewExperienceId);
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

export default InterviewExperiencesTable;
