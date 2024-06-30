import { Box, Typography } from "@mui/material"

const Header = ({ title, subtitle }) => {
    return (
        <Box mb='30px' >
            <Typography
                variant="h2"
                color='lightblue'
                fontWeight='bold'
                sx={{ mr: '5px' }}
            >
                {title}
            </Typography>
            <Typography
                variant="h5"
                color='lightpink'

            >
                {subtitle}
            </Typography>
        </Box>
    )
}

export default Header