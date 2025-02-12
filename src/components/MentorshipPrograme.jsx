import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MentorshipTable({ data, onDelete }) {
    const navigate = useNavigate();

    const handleUpdate = (row) => {
        navigate(`/editMentorship/${row?.id}`);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "title",  // Mentorship Title
                header: "Title",
                enableSorting: true,
            },
            {
                accessorKey: "mentor",  // Mentor Name
                header: "Mentor",
                enableSorting: true,
            },
            {
                accessorKey: "duration",  // Duration of Program
                header: "Duration",
                enableSorting: true,
            },
            {
                accessorKey: "startDate",  // Start Date
                header: "Start Date",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleDateString() || "Not Available";
                },
            },
            {
                accessorKey: "status",  // Program Status
                header: "Status",
                enableSorting: true,
                Cell: ({ cell }) => (cell.getValue() ? "Active" : "Inactive"),
            },
            {
                accessorKey: "actions",  // Action Column
                header: "Actions",
                Cell: ({ row }) => (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <IconButton color="primary" onClick={() => handleUpdate(row.original)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => onDelete(row.original.id)}>
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
        initialState: {
            pagination: { pageIndex: 0, pageSize: 5 },
        },
    });

    return (
        <Paper sx={{ padding: 2 }}>
            <MaterialReactTable table={table} />
        </Paper>
    );
}
