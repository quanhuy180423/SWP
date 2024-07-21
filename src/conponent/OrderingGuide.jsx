import React from 'react';
import { Box, Card, CardMedia, Typography, Container, Stepper, Step, StepLabel, StepContent, Paper, Button } from '@mui/material';

const steps = [
    {
        label: 'Login',
        description: 'Login to your account.',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/jewelry-shop-9b1ff.appspot.com/o/images%2Fguide_use_app%2FScreenshot%202024-07-21%20131427.png?alt=media&token=169441db-50cd-4e3f-a6bb-db2eaf0ba2a4',
    },
    {
        label: 'Select Jewelry Production Order',
        description: 'Click on your name in the header. From the dropdown menu, select "Jewelry Production Order".',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/jewelry-shop-9b1ff.appspot.com/o/images%2Fguide_use_app%2FScreenshot%202024-07-21%20131455.png?alt=media&token=4e29728a-4a43-4117-9f9b-2ab16d2ae175',
    },
    {
        label: 'Fill in All Text',
        description: 'If you do not use diamond, you cannot choose it. Write your order detail product.',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/jewelry-shop-9b1ff.appspot.com/o/images%2Fguide_use_app%2FScreenshot%202024-07-21%20131548.png?alt=media&token=09351993-dc28-474d-b7a0-328f451417a7',
    },
    {
        label: 'Preview and Submit Order',
        description: 'Preview all order details. After that, click submit.',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/jewelry-shop-9b1ff.appspot.com/o/images%2Fguide_use_app%2FScreenshot%202024-07-21%20131606.png?alt=media&token=3c319a50-31ed-46fc-a132-41e438e60896',
    },
    {
        label: 'Watch Order Status',
        description: 'Click on your name in the header, choose "My Order" and wait for the store to process your order.',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/jewelry-shop-9b1ff.appspot.com/o/images%2Fguide_use_app%2FScreenshot%202024-07-21%20131623.png?alt=media&token=be2fb763-9bab-4c48-971b-da6e21ad407f',
    },
    {
        label: 'View and Accept Order',
        description: 'Click "View This Order" and choose product details. If you agree with the price, click "Accept and Payment Order", choose payment method, and click checkout.',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/jewelry-shop-9b1ff.appspot.com/o/images%2Fguide_use_app%2FScreenshot%202024-07-21%20131637.png?alt=media&token=e4383bb9-c9c4-4531-bdbf-533b0303e5da',
    },
    {
        label: 'Design and Production',
        description: 'The store and design staff will process the request. The design staff will upload the design. You can view it by clicking "View Order" and "Product Detail". If you agree, choose "Accept and Production", or choose "Design Again". The production staff will update the status and image when production is finished. You can choose the delivery method.',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/jewelry-shop-9b1ff.appspot.com/o/images%2Fguide_use_app%2FScreenshot%202024-07-21%20131644.png?alt=media&token=0718c6cd-49b6-4efd-b902-276966e7909e',
    },
];

const OrderingGuide = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Ordering Guide
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Card sx={{ maxWidth: 345, mt: 2 }}>
                                <CardMedia
                                    component="img"
                                    alt={step.label}
                                    height="140"
                                    image={step.imageUrl}
                                />
                            </Card>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                        disabled={index === steps.length - 1}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                    <Button
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                        disabled={index === 0}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you're finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Container>
    );
};

export default OrderingGuide;
