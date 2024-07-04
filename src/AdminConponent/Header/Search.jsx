import { Box, IconButton, InputBase, colors } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
const Search = () => {
    return (
        <>
            {/* Search bar */}
            <Box display='flex' borderRadius='15px' border='2px' bgcolor={colors.blue[100]} width='250px' marginRight='50px'>
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
        </>
    )
}

export default Search