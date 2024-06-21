import React, { useState, useEffect } from "react";

const Step1 = ({ nextStep, updateFormData, formData }) => {
    const [localData, setLocalData] = useState({
        fullName: formData.fullName || "",
        phone: formData.phone || "",
        address: formData.address || "",
        email: formData.email || "",
    });

    useEffect(() => {
        setLocalData(formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...localData, [name]: value };
        setLocalData(updatedData);
        updateFormData(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateFormData(localData); // Pass entire localData
        nextStep();
        // console.log(localData);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mb-2"
            >
                <h2 className="text-center mb-5 text-2xl text-gray-800">
                    Step 1: Personal Information
                </h2>
                <label className="block mb-4 text-gray-600">
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={localData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
                    />
                </label>
                <label className="block mb-4 text-gray-600">
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={localData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
                    />
                </label>
                <label className="block mb-4 text-gray-600">
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={localData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
                    />
                </label>
                <label className="block mb-4 text-gray-600">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={localData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg box-border"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg w-full text-lg hover:bg-green-600"
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default Step1;
