import { Box } from "@mui/material"
import Header from "../Header/Header"

const Dashboard = () => {
    return (
        <Box m='20px'>
            <Box display='flex' justifyContent='flex-start' alignItems='flex-start' >
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
        </Box>
    )
}

export default Dashboard