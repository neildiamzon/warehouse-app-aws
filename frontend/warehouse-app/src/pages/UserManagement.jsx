import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import UserDetailsModal from "../components/Modal/UserManagement/UserDetailsModal";
import UserDeleteConfirmationModal from "../components/Modal/UserManagement/UserDeleteConfirmationModal";
import UserEditDetailsModal from "../components/Modal/UserManagement/UserDetailsEditModal";

import {baseUrl} from "../Constants";
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [modalEditDetailsOpen, setModalEditDetailsOpen] = useState(false);


    const filteredUsers = Array.isArray(users)? users.filter(
        (user) =>
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    ): [];


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(baseUrl + `api/UserManagement/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = (user) => {
        console.log("handleedit")
        setSelectedUser(user);
        setModalEditDetailsOpen(true);
    };

    const handleCloseModal = () => {
        
        setModalEditDetailsOpen(false);
        setModalDetailsOpen(false);
        setDeleteConfirmationOpen(false);
        setSelectedUser(null);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(baseUrl + `api/UserManagement/users/${userToDelete.userId}`);

                fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            } finally {
                handleCloseModal();
            }
        }
    };
    const handleOpenDetailsModal = (user) => {
        console.log("open details modal")
        setSelectedUser(user);
        setModalDetailsOpen(true);
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        console.log(user);
        setDeleteConfirmationOpen(true);
    };

    const handleSaveEdit = async (updatedUser) => {
        try {
            await axios.put(baseUrl + `api/UserManagement`, updatedUser);
            alert('User Modified.')
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            fetchUsers();
            setModalEditDetailsOpen(false);
            setSelectedUser(null);
        }
    };
    const columns = [
        {
            field: "userId", headerName: "User ID", flex: 1
            , renderCell: (params) => (
                <span
                    style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => handleOpenDetailsModal(params.row)}
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
                        onClick={() => handleEdit(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteUser(params.row)}
                    >
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{p: 2, overflow: 'hidden' }}>
            <Typography color="black" variant="h5" align="center" gutterBottom>User Management</Typography>
            {/* Search & Buttons */}
            <Stack direction="row" spacing={2} mt={2} mb={2} alignItems="center">
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
                loading={loading} 
                disableSelectionOnClick
            />
            {modalDetailsOpen && (
                <UserDetailsModal open={modalDetailsOpen} onClose={handleCloseModal} user={selectedUser} />
            )}

            {modalEditDetailsOpen && (
                <UserEditDetailsModal open={modalEditDetailsOpen} onClose={handleCloseModal} user={selectedUser} onSave={handleSaveEdit} />
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
