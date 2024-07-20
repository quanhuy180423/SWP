import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-white p-6 mt-5">
      <div className="container mx-auto flex justify-around">
        <div className="w-4/5 flex justify-between">
          <div className="w-1/5">
            <List>
              <ListItem className="flex items-center">
                <ListItemIcon>
                  <img
                    src="./img/diamond.png"
                    alt="logo"
                    className="w-16 h-16"
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Sun Shine"
                  className="text-xl font-serif text-gray-800"
                />
              </ListItem>
              <ListItem className="mt-2">
                <Typography variant="body2" className="text-gray-600">
                  Address: 123 Street ABC, City XYZ
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2" className="text-gray-600">
                  Phone: 0123 456 789
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2" className="text-gray-600">
                  Email: info@example.com
                </Typography>
              </ListItem>
            </List>
          </div>

          <div className="w-1/5">
            <Typography variant="h6" className="text-lg text-gray-800 mb-2">
              Jewelry
            </Typography>
            <List>
              <ListItem className="text-gray-600">Ring</ListItem>
              <ListItem className="mt-2 text-gray-600">Necklace</ListItem>
              <ListItem className="mt-2 text-gray-600">Bracelet</ListItem>
            </List>
          </div>

          <div className="w-1/5">
            <Typography variant="h6" className="text-lg text-gray-800 mb-2">
              Policy order
            </Typography>
            <List>
              <ListItem className="text-gray-600">
                <Link to={`/PrivacyPolicy`}> Privacy Policy</Link>
              </ListItem>
              <ListItem className="mt-2 text-gray-600">
                <Link to={`/PaymentMethod`}>Terms of purchase</Link>
              </ListItem>
            </List>
          </div>

          <div className="w-1/5">
            <Typography variant="h6" className="text-lg text-gray-800 mb-2">
              Customer support
            </Typography>
            <List>
              <ListItem className="text-gray-600">Góp ý</ListItem>
              <ListItem className="mt-2 text-gray-600">Ordering guide</ListItem>
              <ListItem className="mt-2 text-gray-600">
                Instructions for checking orders
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
