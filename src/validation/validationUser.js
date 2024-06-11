export const validateUserInfo = (user) => {
  const errors = {};

  if (!user.fullName.trim()) {
    errors.fullName = "Họ và tên không được để trống.";
  }

  if (!user.phone.trim()) {
    errors.phone = "Số điện thoại không được để trống.";
  } else if (!/^\d{10}$/.test(user.phone)) {
    errors.phone = "Số điện thoại không hợp lệ.";
  }

  if (!user.email.trim()) {
    errors.email = "Email không được để trống.";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!user.address.trim()) {
    errors.address = "Địa chỉ không được để trống.";
  }

  if (!user.password.trim()) {
    errors.password = "Mật khẩu không được để trống.";
  } else if (user.password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
  }

  if (user.password !== user.confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp.";
  }

  return errors;
};
