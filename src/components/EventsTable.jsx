import React, { useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EventsTable({ data }) {
    const navigate = useNavigate();

    const handleUpdate = (row) => {
        navigate(`/editEvent/${row?.id}`);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "title",  // Event Title
                header: "Title",
                enableSorting: true,
            },
            {
                accessorKey: "imageUrl",  // Event Image
                header: "Image",
                Cell: ({ cell }) => (
                    <img
                        src={cell.getValue()}
                        alt="Event"
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                ),
            },
            {
                accessorKey: "location",  // Event Location
                header: "Location",
                enableSorting: true,
            },
            {
                accessorKey: "date",  // Event Date
                header: "Date",
                enableSorting: true,
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue());
                    return date.toLocaleDateString() || "Not Available";
                },
            },
            {
                accessorKey: "time",  // Event Time
                header: "Time",
                enableSorting: true,
            },
            {
                accessorKey: "status",  // Event Status
                header: "Status",
                enableSorting: true,
                Cell: ({ cell }) => (cell.getValue() ? "Active" : "Inactive"),
            },
            {
                accessorKey: "Action",  // Action Column
                header: "Action",
                Cell: ({ row }) => (
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdate(row.original)}
                        >
                            Update
                        </Button>
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
