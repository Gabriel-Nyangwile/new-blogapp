import React, { useState } from "react";
import { signIn } from './Auth';
import Logo from "./logo";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const login = async () => {
    // Call the signIn function from the Auth.js file
    // Pass in the email and password
    setError("");
    try {
      if (!email || !password) {
        setError("Please fill all fields");
        return;
      }
      await signIn(email, password);
      console.log("User logged in successfully");
      navigate("/profile");
      setEmail("");
      setPassword("");

    } catch (error) {
      setError("Failed to sign in :" + error.message);
    }
    
  };

  return (
    <main className="w-full relative overflow-hidden  bg-gray-400 border-none py-10">
      <div className="flex items-center justify-center w-full">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            dont have an account?
            <Link
              to="/register"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email : "
                type="email"
                placeholder="Email Address"
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
              <Button type="submit" className="w-full">
                Sign in{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

import React, { useState } from "react";
import { signIn } from './Auth';
import Logo from "./logo";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const login = async () => {
    // Call the signIn function from the Auth.js file
    // Pass in the email and password
    setError("");
    try {
      if (!email || !password) {
        setError("Please fill all fields");
        return;
      }
      await signIn(email, password);
      console.log("User logged in successfully");
      navigate("/profile");
      setEmail("");
      setPassword("");

    } catch (error) {
      setError("Failed to sign in :" + error.message);
    }
    
  };

  return (
    <main className="w-full relative overflow-hidden  bg-gray-400 border-none py-10">
      <div className="flex items-center justify-center w-full">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            dont have an account?
            <Link
              to="/register"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email : "
                type="email"
                placeholder="Email Address"
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
              <Button type="submit" className="w-full">
                Sign in{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
