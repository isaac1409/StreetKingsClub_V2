import React, { useState, useEffect } from "react";
import "./LoginModal.css";

function LoginModal() {
  
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
      setModalOpen(false);
      window.scrollTo(0, 0); 
    };
    
    useEffect(() => {
      document.title = "SKC | Inicio de sesión";
      const handleScroll = () => {
        if (window.scrollY > window.innerHeight / 3 && !isModalOpen) {
          setModalOpen(true);
        }
      };
    
      window.addEventListener("scroll", handleScroll);
    
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isModalOpen]);

  return (
    <div>
        <div className="scroll-down" style={{ display: isModalOpen ? "none" : "flex" }}>
            DESLIZA
            <svg id="scroll-down-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z" />
          </svg>
        </div>
      <div className={`modal ${isModalOpen ? "is-open" : ""}`}>
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Bienvenido!</h1>
            <p className="modal-desc">
              Inicia sesión para modificar los datos de tu liga.
            </p>
            <div className="input-block">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="input-block">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input type="password" name="password" id="password" placeholder="Password" />
            </div>
            <div className="modal-buttons">
              <button className="input-button">Iniciar Sesión</button>
            </div>
          </div>
          <div className="modal-right">
            <img
              src="https://static.vecteezy.com/system/resources/previews/033/116/961/non_2x/a-soccer-ball-against-a-picturesque-soccer-field-background-vertical-mobile-wallpaper-ai-generated-free-photo.jpg"
              alt=""
            />
          </div>
          <button className="icon-button close-button" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M25 3C12.86158 3 3 12.86158 3 25C3 37.13842 12.86158 47 25 47C37.13842 47 47 37.13842 47 25C47 12.86158 37.13842 3 25 3zM25 5C36.05754 5 45 13.94246 45 25C45 36.05754 36.05754 45 25 45C13.94246 45 5 36.05754 5 25C5 13.94246 13.94246 5 25 5zM16.990234 15.990234A1.0001 1.0001 0 0016.292969 17.707031L23.585938 25L16.292969 32.292969A1.0001 1.0001 0 1017.707031 33.707031L25 26.414062L32.292969 33.707031A1.0001 1.0001 0 1033.707031 32.292969L26.414062 25L33.707031 17.707031A1.0001 1.0001 0 0032.980469 15.990234A1.0001 1.0001 0 0032.292969 16.292969L25 23.585938L17.707031 16.292969A1.0001 1.0001 0 0016.990234 15.990234z" />
            </svg>
          </button>
        </div>
        <button className="modal-button" onClick={openModal}>
          Clic para iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
