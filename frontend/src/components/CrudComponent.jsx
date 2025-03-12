import React, { useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string().required("La descripción es requerida"),
});

const CrudComponent = () => {
  const [items, setItems] = useState([]); // Estado para la lista de elementos
  const [editingItem, setEditingItem] = useState(null); // Estado para edición

  // Función para abrir el modal
  const openModal = (item = null) => {
    setEditingItem(item);

    Swal.fire({
      title: item ? "Editar elemento" : "Agregar elemento",
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre" value="${item ? item.name : ""}">
        <input id="description" class="swal2-input" placeholder="Descripción" value="${item ? item.description : ""}">
      `,
      showCancelButton: true,
      confirmButtonText: item ? "Actualizar" : "Agregar",
      preConfirm: () => {
        const name = document.getElementById("name").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!name || !description) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }

        return { name, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (item) {
          handleEdit(item.id, result.value);
        } else {
          handleAdd(result.value);
        }
      }
    });
  };

  // Función para agregar un elemento
  const handleAdd = (newItem) => {
    const newData = { id: Date.now(), ...newItem };
    setItems([...items, newData]);
    Swal.fire("Agregado", "El elemento fue agregado con éxito", "success");
  };

  // Función para editar un elemento
  const handleEdit = (id, updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item
    );
    setItems(updatedItems);
    Swal.fire("Editado", "El elemento fue actualizado con éxito", "success");
  };

  // Función para eliminar un elemento
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setItems(items.filter((item) => item.id !== id));
        Swal.fire("Eliminado", "El elemento fue eliminado", "success");
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>CRUD con SweetAlert2</h2>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>
        Agregar Nuevo
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openModal(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No hay elementos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudComponent;
