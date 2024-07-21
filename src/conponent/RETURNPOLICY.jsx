import React from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,

    CssBaseline,
} from '@mui/material';

const RETURNPOLICY = () => {
    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Return Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    Adiamor believes in your complete satisfaction and will gladly refund, replace, or exchange any unworn item received back in our facility within 30 days.
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    To return an item:
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="1. OBTAIN A RETURN AUTHORIZATION CODE."
                            secondary="Call Adiamor toll-free at +84 946 347 383 to obtain your return authorization number and please be sure to write it on the outside of the package."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="2. REPACKAGE THE ITEM AS SECURELY AS POSSIBLE."
                            secondary="Repack your item securely with the diamond certificate, if appropriate. Please ensure that the contents of the package are in their original condition and secure within the box. For your security, please do not indicate the contents of the package on the exterior of the box."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="3. SHIP THE PACKAGE."
                            secondary="Return the package to us by registered mail. Insure the package for the full purchase price. For security reasons, do not disclose the contents when insuring the package. Adiamor is not responsible for any loss or damage that occurs during shipping."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="4. NAME AND ADDRESS."
                            secondary="Please make sure that your name and address are clearly printed on the outside of the package, and mail it to:
              Sun Shine, Inc.
             HCM"
                        />
                    </ListItem>
                </List>
                <Typography variant="body1" paragraph>
                    Orders are typically refunded in full within 7 business days after we receive and inspect the returned item.
                </Typography>
            </Paper>
        </Container>
    );
};

export default RETURNPOLICY;
