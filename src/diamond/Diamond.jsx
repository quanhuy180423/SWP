import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Diamond = () => {
    const [diamonds, setDiamonds] = useState([]);
    const [newDiamond, setNewDiamond] = useState({
        gemId: '',
        name: '',
        color: '',
        caratWeight: '',
        clarity: '',
        cut: '',
        costIdGem: '',
        addedDate: '',
        origin: '',
        image: '',
        identification: ''
    });
    const [editDiamond, setEditDiamond] = useState(null);
    const [message, setMessage] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const API_URL = "https://66673910a2f8516ff7a6cb53.mockapi.io/Jewelry/Diamond";

    useEffect(() => {
        fetchDiamonds();
    }, []);

    const fetchDiamonds = async () => {
        try {
            const response = await axios.get(API_URL);
            setDiamonds(response.data);
        } catch (error) {
            console.error('Error fetching diamonds:', error);
        }
    };

    const searchDiamonds = async () => {
        try {
            const response = await axios.get(`${API_URL}?search=${searchTerm}`);
            setDiamonds(response.data);
        } catch (error) {
            console.error('Error searching diamonds:', error);
        }
    };

    const addDiamond = async () => {
        try {
            await axios.post(API_URL, newDiamond);
            setDiamonds([...diamonds, newDiamond]);
            setNewDiamond({
                gemId: '',
                name: '',
                color: '',
                caratWeight: '',
                clarity: '',
                cut: '',
                costIdGem: '',
                addedDate: '',
                origin: '',
                image: '',
                identification: ''
            });
            setMessage('Diamond added successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error adding diamond:', error);
        }
    };

    const deleteDiamond = async (gemId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this diamond?');
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/${gemId}`);
                setDiamonds(diamonds.filter(diamond => diamond.gemId !== gemId));
                setMessage('Diamond deleted successfully');
                setTimeout(() => setMessage(''), 3000);
            } catch (error) {
                console.error('Error deleting diamond:', error);
            }
        }
    };

    const updateDiamond = async () => {
        try {
            await axios.put(`${API_URL}/${editDiamond.gemId}`, editDiamond);
            setDiamonds(diamonds.map(diamond => (diamond.gemId === editDiamond.gemId ? editDiamond : diamond)));
            setEditDiamond(null);
            setMessage('Diamond updated successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating diamond:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editDiamond) {
            setEditDiamond({ ...editDiamond, [name]: value });
        } else {
            setNewDiamond({ ...newDiamond, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editDiamond) {
            updateDiamond();
        } else {
            addDiamond();
        }
    };

    const handleSearch = () => {
        searchDiamonds();
    };

    return (
        <div className="font-sans p-5">
            <h1 className="text-4xl font-bold text-black-500 m-5 flex justify-center">Add New Diamond</h1>
            {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}
            <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="px-5 py-2 m-5 text-lg text-white bg-blue-500 hover:bg-blue-700 rounded"
            >
                {isFormVisible ? 'Hide Form' : 'Add Diamond'}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="flex-col justify-center grid grid-cols-2">
                    {/* Input fields for diamond attributes */}
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Diamond ID:</label>
                        <input
                            type="text"
                            name="gemId"
                            value={editDiamond ? editDiamond.gemId : newDiamond.gemId}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Diamond Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={editDiamond ? editDiamond.name : newDiamond.name}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Color:</label>
                        <input
                            type="text"
                            name="color"
                            value={editDiamond ? editDiamond.color : newDiamond.color}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Carat weight:</label>
                        <input
                            type="text"
                            name="caratWeight"
                            value={editDiamond ? editDiamond.caratWeight : newDiamond.caratWeight}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Clarity:</label>
                        <input
                            type="text"
                            name="clarity"
                            value={editDiamond ? editDiamond.clarity : newDiamond.clarity}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Cut:</label>
                        <input
                            type="text"
                            name="cut"
                            value={editDiamond ? editDiamond.cut : newDiamond.cut}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Cost id gem:</label>
                        <input
                            type="text"
                            name="costIdGem"
                            value={editDiamond ? editDiamond.costIdGem : newDiamond.costIdGem}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Added date:</label>
                        <input
                            type="text"
                            name="addedDate"
                            value={editDiamond ? editDiamond.addedDate : newDiamond.addedDate}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Origin:</label>
                        <input
                            type="text"
                            name="origin"
                            value={editDiamond ? editDiamond.origin : newDiamond.origin}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Image:</label>
                        <input
                            type="text"
                            name="image"
                            value={editDiamond ? editDiamond.image : newDiamond.image}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="m-5">
                        <label className="block mb-2 font-bold">Identification:</label>
                        <input
                            type="text"
                            name="identification"
                            value={editDiamond ? editDiamond.identification : newDiamond.identification}
                            onChange={handleInputChange}
                            className="w-full p-2 text-lg border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button type='submit' className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 h-10 m-5 mt-14 rounded"> Add new diamond </button>
                </form>
            )}

            <h1 className="text-2xl font-bold text-black-500 mt-10 flex justify-center">Diamond List</h1>
            <div>
                <div className="flex justify-center">
                    <div className="flex-1 m-2 w-full flex justify-end">
                        <div className="flex items-center  border-2 border-blue-800 rounded-full px-2 w-1/3 bg-white">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border-none outline-none flex-1 py-1 px-2 text-lg rounded-full"
                            />
                            <button className="bg-none border-none cursor-pointer outline-none p-0 ml-2">
                                <img
                                    src="./img/glass.png"
                                    alt="search-icon"
                                    className="w-5 h-5"
                                    onClick={handleSearch}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <table className="w-full border-collapse mt-5">
                <thead>
                    <tr className="bg-gray-200 border">
                        {/* Table headers */}
                        <td className="border p-2 border-black">Name</td>
                        <th className="border p-2 border-black">Color</th>
                        <th className="border p-2 border-black">Carat Weight</th>
                        <th className="border p-2 border-black">Clarity</th>
                        <th className="border p-2 border-black">Cut</th>
                        <th className="border p-2 border-black">Cost id gem</th>
                        <th className="border p-2 border-black">Added Date</th>
                        <th className="border p-2 border-black">Origin</th>
                        <th className="border p-2 border-black">Image</th>
                        <th className="border p-2 border-black">identification</th>
                        <th className="border p-2 border-black">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {diamonds.map((diamond) => (
                        <tr key={diamond.gemId} className="bg-gray-100">
                            {/* Table data cells */}
                            <td className="border p-2 border-black">{diamond.name}</td>
                            <td className="border p-2 border-black">{diamond.color}</td>
                            <td className="border p-2 border-black">{diamond.caratWeight}</td>
                            <td className="border p-2 border-black">{diamond.clarity}</td>
                            <td className="border p-2 border-black">{diamond.cut}</td>
                            <td className="border p-2 border-black">{diamond.costIdGem}</td>
                            <td className="border p-2 border-black">{diamond.addedDate}</td>
                            <td className="border p-2 border-black">{diamond.origin}</td>
                            <td className="border p-2 border-black">{diamond.image}</td>
                            <td className="border p-2 border-black">{diamond.identification}</td>
                            <td className="border p-2 border-black w-24">
                                <button onClick={() => setEditDiamond(diamond)} className="px-2 py-1 bg-green-500 text-white rounded mr-2">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => deleteDiamond(diamond.gemId)} className="px-2 py-1 bg-red-500 text-white rounded">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Diamond;
