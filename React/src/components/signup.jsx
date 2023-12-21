
import { useState } from 'react';
import axios from 'axios';

function Signup(updateState) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
console.log(role)
    const Signup = async (e) => {
        e.preventDefault();
        console.log("firstName", firstName);
        console.log("lastName", lastName);
        console.log("email", email);
        console.log("password", password);
        console.log("confirm", confirmPassword);
        console.log("role", role);

        const { data } = await axios.post("http://localhost:3000/user/createUser", {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            role
        })

        console.log("Signup reponse", data)
        if (data.error) {
            return alert("invalid credentials")
        }
        return alert("Sucessfully Signed up")
    }
  return (
    <div>
        <div className="flex">
            <img src={window.location.origin + '/signup.jpg'} />
            <div className="flex flex-col min-h-screen overflow-hidden w-screen bg-[#efebea]">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign up
                </h1>
                <form className="mt-6">
                    <div className="flex space-x-2">
                    <div className="mb-2 w-1/2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="Bilawal"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e)=>{
                                setFirstName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-2 w-1/2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Zaman"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e)=>{
                                setLastName(e.target.value)
                            }}
                        />
                    </div>
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Your Email
                        </label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e)=>{
                                setConfirmPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Role
                        </label>
                        <select className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e)=>{
                                setRole(e.target.value)
                        }}
                        >
                            <option value="" disabled selected> Select an option </option>
                            <option value="admin"> Admin </option>
                            <option value="instrctor"> Instrctor </option>
                            <option value="trainee"> Trainee </option>
                        </select>
                    </div>

                    <div className="mt-6">
                        <button 
                        onClick={(e)=>{Signup(e)}}
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Create Account
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Already have a account?{" "}
                    <span
                        className="font-medium text-purple-600 hover:underline cursor-pointer"
                        onClick={()=>{
                            void updateState.updateState(true);
                        }}
                    >
                        Log in
                    </span>
                </p>
            </div>
            </div>
        </div>
    </div>

  );
};

export default Signup;