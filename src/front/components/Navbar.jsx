import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
    
    const token = sessionStorage.getItem("token");

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login", { replace: true }); 
    };

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Trilinguo</span>
				</Link>
				<div className="ml-auto">
                    { !token ? (
                        <>
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-secondary ms-2">
                                Signup
                            </Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="btn btn-danger">
                            Logout
                        </button>
                    )}
				</div>
			</div>
		</nav>
	);
};