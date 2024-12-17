import React, { useState } from "react";
import {signUp} from './Auth'
import Logo from "./logo";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";


export default function CreateUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { handleSubmit } = useForm();
  let navigate = useNavigate();

  
  const createUser = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (!email || !password || !firstname || !lastname) {
      alert("Please fill all fields");
      return;
    }


    try {
      await signUp(email, password, firstname, lastname);
      console.log("User created successfully");
      navigate("/login");
    } catch (error) {
      setError("Failed to sign up: " + error.message);
    }
  };

  return (
    <main className="w-full relative overflow-hidden  bg-gray-400 border-none py-10">
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-full max-w-lg bg-blue-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className='inline-block w-full max-w-[100px]'>
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Register
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account ?
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(createUser)}>
            <div className="space-y-5">
              <Input
                label="First Name : "
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <Input
                label="Last Name : "
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
              <Input
                label="Email : "
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password : "
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                label="Confirm Password : "
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
