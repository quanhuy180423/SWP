import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    Paper,
    CircularProgress,
    colors,
    Button
} from '@mui/material';
import Swipper from '../../Swipper/Swipper';

const DiamondDetail = () => {
    const { GemId } = useParams();
    const [gem, setGem] = useState({});
    const [loading, setLoading] = useState(true);
    const API_URL = "http://localhost:8090/test/getGemAndPriceById";
    const navigate = useNavigate()
    const getDiamond = async () => {
        try {
            const response = await axios.get(`${API_URL}?GemId=${GemId}`);
            console.log('API Response:', response.data); // Log dữ liệu trả về từ API để kiểm tra

            // Xử lý trường hợp response.data là một mảng
            setGem(response.data)
        } catch (error) {
            console.error("Error fetching diamond data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDiamond();
    }, [GemId]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Box width='100%' display='flex' justifyContent='start' marginLeft='150px'>
                <Button style={{ color: 'black', textDecoration: 'underline', fontSize: '20px' }} onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bgcolor="gray.100"
                p={3}
            >

                <Grid container spacing={3} maxWidth="lg">
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={3}
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Box p={3}

                                sx={{
                                    height: '300px',
                                    width: '300px',
                                    objectFit: 'cover'
                                }}
                            >
                                <Swipper images={gem.Image} />
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3}>
                            <Box p={3}>
                                <Typography variant="h4" gutterBottom>
                                    {gem.Name}
                                </Typography>
                                <Typography variant="body1"
                                    style={{ color: colors.red[600], fontSize: '25px', fontWeight: 'bold' }}
                                    gutterBottom>
                                    {gem.Price}₫
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Color:</strong> {gem.Color}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Carat Weight:</strong> {gem.CaraWeight}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Clarity:</strong> {gem.Clarity}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Cut:</strong> {gem.Cut}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Origin:</strong> {gem.Origin}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Identification:</strong> {gem.Identification}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>

    );
};

export default DiamondDetail;
