import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

// Importar componentes
import Login from "./pages/Login/LoginModal";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/UsuariosPage"; // Nueva página para CRUD de usuarios

// Función para verificar autenticación
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Componente para rutas protegidas
const PrivateRoute = ({ element, allowedRoles }) => {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(true);
  const userRole = localStorage.getItem("role");

  if (!isAuthenticated() && showAlert) {
    Swal.fire({
      icon: "warning",
      title: "Acceso restringido",
      text: "Debes iniciar sesión para acceder.",
      confirmButtonText: "Cerrar",
      confirmButtonColor: "#3085d6",
    }).then(() => setShowAlert(false));
  }

  return isAuthenticated() && allowedRoles.includes(userRole) ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Usuarios />} />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} allowedRoles={["Admin", "User"]} />} />
          {/*<Route path="/users" element={<PrivateRoute element={<Usuarios />} allowedRoles={["Admin"]} />} />  Solo Admin */}

          {/* Redirección si la ruta no existe */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
