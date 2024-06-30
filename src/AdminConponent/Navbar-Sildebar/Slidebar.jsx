import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuIcon from '@mui/icons-material/Menu';
import imgProfile from "../../assets/image/img/profile-user.png";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faNewspaper, faComments, faClipboardList, faBox, faUser, faGem, faCube, faListOl } from '@fortawesome/free-solid-svg-icons';

const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            style={{ color: 'black', height: '60px' }}
            component={<Link to={to} />}
        >
            <div className='flex'>
                <FontAwesomeIcon icon={icon} style={{ marginRight: '30px' }} />
                <Typography>
                    {title}
                </Typography>
            </div>
        </MenuItem>
    )
}

const Slidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState([]);

    return (
        <Box
            sx={{
                "& .ps-sidebar-container": {
                    background: 'lightblue !important',
                },
                "& .ps-menuitem-root:hover": {
                    color: '#868dfb !important',
                },
                "& .ps-menuitem-active": {
                    color: '#6870fa !important',
                }
            }}
        >
            <Sidebar collapsed={isCollapsed} className='h-screen'>
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0)
                                return {
                                    color: disabled ? '#d9d9d9' : '#a5e1ff',
                                    backgroundColor: active ? '#f7f7f7' : undefined,
                                    height: '100%'
                                };
                        },
                    }}
                >
                    <MenuItem
                        icon={<MenuIcon style={{ color: 'black' }} />}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {!isCollapsed && (
                            <Box display='flex' justifyContent='center' alignItems='center' ml='15px'>
                                <Typography variant="h4" color='grey'>
                                    ADMIN
                                </Typography>
                            </Box>
                        )}
                    </MenuItem>

                    {/* User */}
                    {!isCollapsed && (
                        <Box textAlign='center'>
                            <Box m="10px" display='flex' justifyContent='center'>
                                <img
                                    alt="profile-user"
                                    width='60px'
                                    height='60px'
                                    src={imgProfile}
                                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                                />
                            </Box>

                            <Typography
                                variant="h3"
                                color='grey'
                                fontWeight='bold'
                                sx={{ m: '10px 0 0 0' }}
                            >
                                Name
                            </Typography>
                            <Typography variant="h5" color='green'>
                                Role
                            </Typography>
                        </Box>
                    )}

                    {/* Menu Items */}
                    <Box>
                        <Item
                            title='Dashboard'
                            to='/admin'
                            icon={faChartBar}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Manage Account'
                            to="/admin/manage-account"
                            icon={faUser}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Contacts Information'
                            to='/contacts'
                            icon={faComments}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Manage Blogs'
                            to='/admin/manage-blogs'
                            icon={faNewspaper}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Manage Material'
                            to='/admin/manage-material'
                            icon={faCube}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Manage Diamond'
                            to='/diamod'
                            icon={faGem}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Manage Order'
                            to='/order'
                            icon={faClipboardList}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Manage Request Order'
                            to='/request-order'
                            icon={faBox}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title='Manage Step Process'
                            to='/step-process'
                            icon={faListOl}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* Add more menu items with icons */}
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default Slidebar;
