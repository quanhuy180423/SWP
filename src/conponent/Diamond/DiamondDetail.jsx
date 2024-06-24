import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DiamondDetail = () => {
    const { gemId } = useParams();
    const [gem, setGem] = useState({});
    const API_URL = "http://localhost:8090/test/getGemById";

    const getDiamond = async () => {
        try {
            const response = await axios.get(`${API_URL}?gemId=${gemId}`);
            console.log('API Response:', response.data); // Log dữ liệu trả về từ API để kiểm tra

            // Xử lý trường hợp response.data là một mảng
            if (Array.isArray(response.data) && response.data.length > 0) {
                setGem(response.data[0]); // Lấy phần tử đầu tiên của mảng
            } else {
                console.error("Invalid data format returned from API");
            }
        } catch (error) {
            console.error("Error fetching diamond data:", error);
        }
    };

    useEffect(() => {
        getDiamond();
    }, [gemId]);

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-2 h-full w-2/3">
                <div className="">
                    <img
                        // src={gem.Image || "https://th.bing.com/th/id/R.9a0f8983b1ec6ecbc0d7fb3574247159?rik=GXhcx17XhwTMMA&pid=ImgRaw&r=0"}
                        src="https://th.bing.com/th/id/R.9a0f8983b1ec6ecbc0d7fb3574247159?rik=GXhcx17XhwTMMA&pid=ImgRaw&r=0"
                        alt={gem.Name}

                        className=" h-full w-1/2 object-cover"
                    />
                </div>
                <div className=" p-4">
                    <h1 className="text-2xl font-bold mb-2">{gem.Name}</h1>
                    <p><strong>Color:</strong> {gem.Color}</p>
                    <p><strong>Carat Weight:</strong> {gem.CaratWeight}</p>
                    <p><strong>Clarity:</strong> {gem.Clarity}</p>
                    <p><strong>Cut:</strong> {gem.Cut}</p>
                    <p><strong>Origin:</strong> {gem.Origin}</p>
                    <p><strong>Identification:</strong> {gem.Identification}</p>
                </div>
            </div>
        </div>
    );
};

export default DiamondDetail;
