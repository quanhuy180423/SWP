export const validateUserInfo = (user) => {
  const errors = {};

  if (!user.Name.trim()) {
    errors.Name = "Họ và tên không được để trống";
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!user.Phone.match(phonePattern)) {
    errors.Phone = "Số điện thoại phải gồm 10 chữ số";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.Email.match(emailPattern)) {
    errors.Email = "Email không hợp lệ";
  }

  if (!user.Address.trim()) {
    errors.Address = "Địa chỉ không được để trống";
  }

  if (user.PassWord && user.PassWord.length < 6) {
    errors.PassWord = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  if (user.PassWord !== user.confirmPassWord) {
    errors.confirmPassWord = "Mật khẩu xác nhận không khớp";
  }

  return errors;
};
