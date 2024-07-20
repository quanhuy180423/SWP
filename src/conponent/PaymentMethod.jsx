import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PaymentMethods = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Payment Methods
            </Typography>
            <Typography variant="body1" paragraph>
                When you place an order at Sun Shine for any product, please prepare the amount listed on the website for that product.
            </Typography>
            <Typography variant="body1" paragraph>
                You can choose to pay using the following methods:
            </Typography>
            <Box my={4}>
                <Typography variant="h6" gutterBottom>
                    1. PAYMENT BY CASH
                </Typography>
                <Typography variant="body1" paragraph>
                    Payment at the store: You can pay directly in cash when purchasing at the Sun Shine Jewelry Store.
                </Typography>
                <Typography variant="body1" paragraph>
                    Payment upon delivery: When buying remotely, you can pay upon receiving the goods at the agreed delivery location. The shipping fee will be according to Sun Shine's shipping policy or as agreed upon by the parties.
                </Typography>
                <Typography variant="h6" gutterBottom>
                    2. ONLINE PAYMENT
                </Typography>
                <Typography variant="body1" paragraph>
                    You can make an online payment by following these steps:
                </Typography>
                <ul>
                    <li>Deposit cash at the bank or transfer to Sun Shine's account, providing full information: Customer's name, amount, transfer content, etc.</li>
                    <li>Inform Sun Shine by calling 0123456789 immediately after you have made the transfer.</li>
                    <li>As soon as we receive the confirmation report from the bank, we will notify you and proceed with shipping the goods to you within the stipulated time.</li>
                </ul>
            </Box>
        </Container>
    );
};

export default PaymentMethods;
