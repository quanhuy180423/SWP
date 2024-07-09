import React, { useState } from 'react';
import { Box, colors, Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuIcon from '@mui/icons-material/Menu';
import imgProfile from "../../assets/image/img/profile-user.png";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faNewspaper, faComments, faClipboardList, faBox, faUser, faGem, faCube, faListOl, faBoxesStacked, faImage, faCheckDouble, faPalette } from '@fortawesome/free-solid-svg-icons';

const Item = ({ title, to, icon, selected, setSelected }) => (
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
);

const Slidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('');

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
                        <SubMenu
                            label="Manage Account"
                            icon={<FontAwesomeIcon icon={faUser} style={{ marginRight: '30px', }} />}
                            style={{ color: 'black', height: '60px' }}
                        >
                            <Item title="Account Staff" to="/admin/manage-account/staff" icon={faUser} selected={selected} setSelected={setSelected} />
                            <Item title="Account Customer" to="/admin/manage-account/customer" icon={faUser} selected={selected} setSelected={setSelected} />
                        </SubMenu>
                        <Item
                            title='Manage product'
                            to='/admin/manage-product'
                            icon={faBoxesStacked}
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
                            to='/admin/manage-diamond'
                            icon={faGem}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <SubMenu
                            label="Manage Order"
                            icon={<FontAwesomeIcon icon={faClipboardList} style={{ marginRight: '30px' }} />}
                            style={{ color: 'black', height: '60px' }}
                        >
                            <Item
                                title='Order Request'
                                to='/admin/manage-order/List-Request'
                                icon={faClipboardList}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title='Order Manager'
                                to='/admin/manage-order/List-Request/Order-Manager'
                                icon={faBox}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title='Order Design'
                                to='/admin/manage-order/detail'
                                icon={faPalette}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title='Order Complete'
                                to='/admin/manage-order/detail'
                                icon={faCheckDouble}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </SubMenu>
                        <Item
                            title='Manage Step Process'
                            to='/admin/manage-step-process'
                            icon={faListOl}
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
                        {/* Add more menu items with icons */}
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default Slidebar;
