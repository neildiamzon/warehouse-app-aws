import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import UserDetailsModal from "../components/Modal/UserManagement/UserDetailsModal";
import UserDeleteConfirmationModal from "../components/Modal/UserManagement/UserDeleteConfirmationModal";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://localhost:7187/api/UserManagement/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleEdit = (userId) => {
        alert(`Edit user: ${userId}`);
    };
    const handleCloseModal = () => {
        setModalDetailsOpen(false);

        setDeleteConfirmationOpen(false);
        setSelectedUser(null);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                console.log(userToDelete)
                await axios.delete(`https://localhost:7187/api/UserManagement/users/${userToDelete.userId}`);

                fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            } finally {
                handleCloseModal();
            }
        }
    };
    const handleOpenDetailsModal = (user) => {
        console.log(user)
        setSelectedUser(user);
        setModalDetailsOpen(true);
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        console.log(user);
        setDeleteConfirmationOpen(true);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            field: "userId", headerName: "User ID", flex: 1
            , renderCell: (params) => (
                <span
                    style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => params.api.getRow(params.id).handleOpenDetailsModal(params.row)}
                >
                    {params.value}
                </span>
            ),
        },
        { field: "username", headerName: "Username", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "customerName", headerName: "Customer Name", flex: 1 },
        { field: "organization", headerName: "Organization", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(params.row.userId)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => params.api.getRow(params.id).handleDeleteUser(params.row)}
                    >
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{ height: "80vh", width: "100%", p: 2, overflow: 'hidden' }}>
            {/* Search & Buttons */}
            <Stack direction="row" spacing={2} mb={2} alignItems="center">
                <TextField
                    label="Search by username or email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    InputProps={{
                        startAdornment: <SearchIcon />,
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    id="refresh-button"
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={() => fetchUsers()}
                    sx={{ ml: 2 }}
                >
                    Refresh
                </Button>
            </Stack>

            {/* DataGrid */}
            <DataGrid
                rows={filteredUsers.map((row) => ({ ...row, handleOpenDetailsModal, handleDeleteUser }))}
                columns={columns}
                getRowId={(row) => row.userId}
                pageSize={5}
                disableSelectionOnClick
                sx={{overflowY:'hidden'}}
            />
            {selectedUser && (
                <UserDetailsModal open={modalDetailsOpen} onClose={handleCloseModal} user={selectedUser} />
            )}

            {deleteConfirmationOpen && (
                <UserDeleteConfirmationModal
                    open={deleteConfirmationOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleDelete}
                    username={userToDelete ? userToDelete.organization + " - " + userToDelete.customerName : ""}
                />
            )}
        </Box>
    );
};

export default UserManagement;
