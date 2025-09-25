import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        fetch(`${backendUrl}/api/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    sessionStorage.removeItem("token");
                    throw new Error("Token invalid or expired");
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                console.error("Error fetching profile:", error);
                navigate("/login");
            });
    }, [navigate]);

    return (
        <div className="container text-center mt-5">
            <h1>Área Privada</h1>
            {!user ? (
                <p>Cargando información del perfil...</p>
            ) : (
                <div>
                    <h2>Bienvenido, {user.email}</h2>
                    <p>Este contenido es secreto y solo visible para usuarios autenticados.</p>
                </div>
            )}
        </div>
    );
};

export default Profile;

