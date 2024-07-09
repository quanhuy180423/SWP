export const validateUserInfo = (user) => {
  const errors = {};

  // if (!user.fullName.trim()) {
  //   errors.fullName = "Họ và tên không được để trống.";
  // }

  if (!user.Phone.trim()) {
    errors.Phone = "Số điện thoại không được để trống.";
  } else if (!/^\d{10}$/.test(user.Phone)) {
    errors.Phone = "Số điện thoại không hợp lệ.";
  }

  if (!user.Email.trim()) {
    errors.Email = "Email không được để trống.";
  } else if (!/\S+@\S+\.\S+/.test(user.Email)) {
    errors.Email = "Email không hợp lệ.";
  }

  if (!user.Address.trim()) {
    errors.Address = "Địa chỉ không được để trống.";
  }

  if (!user.PassWord.trim()) {
    errors.PassWord = "Mật khẩu không được để trống.";
  } else if (user.PassWord.length < 6) {
    errors.PassWord = "Mật khẩu phải có ít nhất 6 ký tự.";
  }

  if (user.PassWord !== user.confirmPassWord) {
    errors.confirmPassWord = "Mật khẩu xác nhận không khớp.";
  }

  return errors;
};
