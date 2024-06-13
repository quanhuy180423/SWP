import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter"; // Import the Base64UploadAdapter

// // Define custom upload adapter plugin
// function MyCustomUploadAdapterPlugin(editor) {
//   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//     return new Base64UploadAdapter(loader); // Use Base64UploadAdapter for image uploads
//   };
// }

// Define editor configuration
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
  // extraPlugins: [MyCustomUploadAdapterPlugin],
};

export default ClassicEditor;
