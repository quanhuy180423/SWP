import React, { useState, useEffect } from "react";

const Step2 = ({ nextStep, prevStep, updateFormData, formData }) => {
    const [localData, setLocalData] = useState({
        material: "",
        weight: "",
        size: "",
        category: "",
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
        updateFormData(localData);
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
                    Step 2: Material and Category
                </h2>
                <label className="block mb-4 text-gray-600">
                    Material:
                    <select
                        name="material"
                        value={localData.material}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select</option>
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                        <option value="platinum">Platinum</option>
                    </select>
                </label>
                <label className="block mb-4 text-gray-600">
                    Weight (chi):
                    <input
                        type="text"
                        name="weight"
                        value={localData.weight}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
                    />
                </label>
                <label className="block mb-4 text-gray-600">
                    Product Size (Ni):
                    <input
                        type="text"
                        name="size"
                        value={localData.size}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
                    />
                </label>
                <label className="block mb-4 text-gray-600">
                    Category:
                    <select
                        name="category"
                        value={localData.category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select</option>
                        <option value="necklace">Necklace</option>
                        <option value="ring">Ring</option>
                        <option value="bracelet">Bracelet</option>
                    </select>
                </label>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-red-600"
                    >
                        Previous
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-green-600"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step2;
