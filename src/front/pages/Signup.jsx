import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();


	const handleSubmit = (e) => {
		e.preventDefault();
		const backendUrl = import.meta.env.VITE_BACKEND_URL;

		fetch(`${backendUrl}/api/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then(response => {
				if (response.ok) return response.json();
				throw new Error('Failed to register');
			})
			.then(data => {
				console.log("User created:", data);
				navigate("/login");
			})
			.catch(error => console.error("Error:", error));
	};

	return (
		<div>
			<div className="container">
				<h1> Sign Up! </h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">Email address</label>
						<input
							type="email"
							className="form-control mt-1 mb-2"
							id="exampleInputEmail1"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							aria-describedby="emailHelp"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Password</label>
						<input
							type="password"
							className="form-control mt-1 mb-2"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							id="exampleInputPassword1"
							placeholder="Password" />
					</div>
					<button type="submit" className="btn btn-primary mt-2">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
