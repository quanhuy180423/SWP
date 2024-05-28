import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "|",
    "imageUpload",
    "undo",
    "redo",
  ],
  simpleUpload: {
    uploadUrl: "https://your-server.com/upload", // Chỉnh sửa endpoint upload ảnh
    headers: {
      "X-CSRF-TOKEN": "CSRF-Token", // Thêm headers nếu cần thiết
      Authorization: "Bearer <token>",
    },
  },
};

export default ClassicEditor;
