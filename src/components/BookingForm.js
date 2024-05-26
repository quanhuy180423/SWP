import React, { useState, useRef } from "react";
import "../css/Booking.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Header from "../pages/Header";

const BookingForm = () => {
  // Initialize the booking number using useRef
  const currentBookingNumber = useRef(156789);

  // Function to generate booking code
  const generateBookingCode = () => {
    const prefix = "8412345";
    const bookingNumber = String(currentBookingNumber.current).padStart(6, "0");
    currentBookingNumber.current++;
    return prefix + bookingNumber;
  };

  const [formData, setFormData] = useState({
    bookingCode: generateBookingCode(),
    customerCode: "",
    customerName: "",
    phoneNumber: "",
    address: "",
    orderDate: "",
    material: "",
    weight: "",
    stoneType: {
      caratWeight: "",
      color: "",
      clarity: "",
      cut: "",
    },
    size: "",
    category: "",
    productImage: null,
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name in formData.stoneType) {
      setFormData({
        ...formData,
        stoneType: {
          ...formData.stoneType,
          [name]: value,
        },
      });
    } else if (name === "productImage") {
      setFormData({
        ...formData,
        productImage: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data and handle form submission
    if (validateForm()) {
      setSuccess(true);
      // Logic for booking creation
      console.log("Booking Data:", formData);
      // Reset form data
      setFormData({
        ...formData,
        bookingCode: generateBookingCode(), // Generate new booking code for the next submission
        customerCode: "",
        customerName: "",
        phoneNumber: "",
        address: "",
        orderDate: "",
        material: "",
        weight: "",
        stoneType: {
          caratWeight: "",
          color: "",
          clarity: "",
          cut: "",
        },
        size: "",
        category: "",
        productImage: null,
        additionalInfo: "",
      });
    }
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.customerCode)
      formErrors.customerCode = "Customer code is required";
    if (!formData.customerName)
      formErrors.customerName = "Customer name is required";
    if (!formData.phoneNumber)
      formErrors.phoneNumber = "Phone number is required";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.orderDate) formErrors.orderDate = "Order date is required";
    if (!formData.material) formErrors.material = "Material is required";
    if (!formData.weight) formErrors.weight = "Weight is required";
    if (!formData.stoneType.caratWeight)
      formErrors.caratWeight = "Carat weight is required";
    if (!formData.stoneType.color) formErrors.color = "Color is required";
    if (!formData.stoneType.clarity) formErrors.clarity = "Clarity is required";
    if (!formData.stoneType.cut) formErrors.cut = "Cut is required";
    if (!formData.size) formErrors.size = "Size is required";
    if (!formData.category) formErrors.category = "Category is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRichTextChange = (event, editor) => {
    const data = editor.getData(); // Retrieve data from the editor
    setFormData({
      ...formData,
      additionalInfo: data, // Update formData with the retrieved data
    });
  };

  return (
    <div>
      <Header />
      <div className="booking-display">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="booking-image">
            <img src="./img_booking.png" alt="booking" />
          </div>
          
          <div className="booking-form-title">
            <h2>Jewelry Production Booking</h2>
            <p>Order jewelry processing online for anytime you have money.</p>
          </div>

          <div className="form-group">
            <label>Mã Booking: {formData.bookingCode}</label>
          </div>
          <div className="form-group">
            <label>Mã Khách Hàng: </label>
            <input
              type="text"
              name="customerCode"
              value={formData.customerCode}
              onChange={handleChange}
              className="booking-input"
              placeholder="Mã Khách Hàng"
              required
            />
          </div>
          <div className="form-group">
            <label>Tên Khách Hàng</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="booking-input"
              placeholder="Tên Khách Hàng"
              required
            />
          </div>
          <div className="form-group">
            <label>Số Điện Thoại</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="booking-input"
              placeholder="Số Điện Thoại"
              required
            />
          </div>
          <div className="form-group">
            <label>Địa Chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="booking-input"
              placeholder="Địa Chỉ"
              required
            />
          </div>
          <div className="form-group">
            <label>Ngày Đặt Hàng</label>
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              className="booking-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Chất Liệu</label>
            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="booking-input"
              required
            >
              <option value="">Chọn chất liệu</option>
              <option value="Vàng">Vàng</option>
              <option value="Bạc">Bạc</option>
              <option value="Bạch Kim">Bạch Kim</option>
            </select>
          </div>
          <div className="form-group">
            <label>Trọng Lượng</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="booking-input"
              placeholder="Trọng lượng"
              required
            />
          </div>
          <div className="form-group-stone">
            <h3 className="kim-cuong">Kim cương</h3>
            <div className="stone-type-group">
              <label>Trọng Lượng (Carat weight)</label>
              <input
                type="text"
                name="caratWeight"
                value={formData.stoneType.caratWeight}
                onChange={handleChange}
                className="booking-input"
                placeholder="Trọng lượng"
                required
              />
              <label>Màu Sắc (Color)</label>
              <input
                type="text"
                name="color"
                value={formData.stoneType.color}
                onChange={handleChange}
                className="booking-input"
                placeholder="Màu sắc"
                required
              />
              <label>Độ Tinh Khiết (Clarity)</label>
              <input
                type="text"
                name="clarity"
                value={formData.stoneType.clarity}
                onChange={handleChange}
                className="booking-input"
                placeholder="Độ tinh khiết"
                required
              />
              <label>Cắt Mài (Cut)</label>
              <select
                name="cut"
                value={formData.stoneType.cut}
                onChange={handleChange}
                className="booking-input"
                required
              >
                <option value="">Chọn mức cắt mài</option>
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Kích Cỡ</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="booking-input"
              placeholder="Kích cỡ"
              required
            />
          </div>
          <div className="form-group">
            <label>Thể Loại</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="booking-input"
              required
            >
              <option value="">Chọn thể loại</option>
              <option value="Vòng Tay">Vòng Tay</option>
              <option value="Nhẫn">Nhẫn</option>
              <option value="Bông Tai">Bông Tai</option>
            </select>
          </div>
          <div className="form-group">
            <label>Ảnh Sản Phẩm</label>
            <input
              type="file"
              name="productImage"
              onChange={handleChange}
              className="booking-input"
            />
          </div>
          <div className="form-group">
            <label>Additional Information</label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.additionalInfo}
              onChange={handleRichTextChange}
              className="booking-input"
            />
          </div>
          <button type="submit" className="booking-button">
            Tạo Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
