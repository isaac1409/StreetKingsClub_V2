import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Usuarios = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
        const response = await fetch("/api/users"); // Reemplaza con tu endpoint real
        const data = await response.json();
        setUsers(data);
        } catch (error) {
        console.error("Error fetching users:", error);
        }
    };

    const handleAddUser = () => {
        Swal.fire({
        title: "Agregar Usuario",
        html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre">
                <input type="email" id="email" class="swal2-input" placeholder="Correo">
                <select id="role" class="swal2-input">
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                </select>`,
        showCancelButton: true,
        confirmButtonText: "Agregar",
        preConfirm: () => {
            const name = Swal.getPopup().querySelector("#name").value;
            const email = Swal.getPopup().querySelector("#email").value;
            const role = Swal.getPopup().querySelector("#role").value;
            return { name, email, role };
        },
        }).then((result) => {
        if (result.isConfirmed) {
            // Aquí agregarías la lógica para enviar los datos al backend
            console.log("Nuevo usuario:", result.value);
        }
        });
    };

    const handleEditUser = (user) => {
        Swal.fire({
        title: "Editar Usuario",
        html: `<input type="text" id="name" class="swal2-input" value="${user.name}">
                <input type="email" id="email" class="swal2-input" value="${user.email}">
                <select id="role" class="swal2-input">
                <option value="Admin" ${user.role === "Admin" ? "selected" : ""}>Admin</option>
                <option value="User" ${user.role === "User" ? "selected" : ""}>User</option>
                </select>`,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        preConfirm: () => {
            const name = Swal.getPopup().querySelector("#name").value;
            const email = Swal.getPopup().querySelector("#email").value;
            const role = Swal.getPopup().querySelector("#role").value;
            return { ...user, name, email, role };
        },
        }).then((result) => {
        if (result.isConfirmed) {
            // Aquí agregarías la lógica para actualizar el usuario en el backend
            console.log("Usuario actualizado:", result.value);
        }
        });
    };

    const handleDeleteUser = (id) => {
        Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#d33",
        }).then((result) => {
        if (result.isConfirmed) {
            // Aquí agregarías la lógica para eliminar el usuario del backend
            console.log("Usuario eliminado:", id);
        }
        });
    };

    return (
        <div className="container">
        <h2>Gestión de Usuarios</h2>
        <button onClick={handleAddUser} className="btn btn-primary">Agregar Usuario</button>
        <table className="table">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <button onClick={() => handleEditUser(user)} className="btn btn-warning">Editar</button>
                    <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">Eliminar</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Usuarios;
