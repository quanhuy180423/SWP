import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

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
                  Địa chỉ: 123 Đường ABC, Thành phố XYZ
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2" className="text-gray-600">
                  Số điện thoại: 0123 456 789
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
              Sản phẩm
            </Typography>
            <List>
              <ListItem className="text-gray-600">Nhẫn</ListItem>
              <ListItem className="mt-2 text-gray-600">Vòng cổ</ListItem>
              <ListItem className="mt-2 text-gray-600">Vòng tay</ListItem>
              <ListItem className="mt-2 text-gray-600">Nhẫn cưới</ListItem>
            </List>
          </div>

          <div className="w-1/5">
            <Typography variant="h6" className="text-lg text-gray-800 mb-2">
              Chính sách đặt hàng
            </Typography>
            <List>
              <ListItem className="text-gray-600">
                Chính sách & bảo hành
              </ListItem>
              <ListItem className="mt-2 text-gray-600">
                Điều khoản mua hàng
              </ListItem>
            </List>
          </div>

          <div className="w-1/5">
            <Typography variant="h6" className="text-lg text-gray-800 mb-2">
              Hỗ trợ khách hàng
            </Typography>
            <List>
              <ListItem className="text-gray-600">Góp ý</ListItem>
              <ListItem className="mt-2 text-gray-600">
                Hướng dẫn đặt hàng
              </ListItem>
              <ListItem className="mt-2 text-gray-600">
                Hướng dẫn kiểm tra đơn hàng
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
