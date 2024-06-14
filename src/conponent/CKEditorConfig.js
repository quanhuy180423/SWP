import React from "react";
import Editor from "ckeditor5-custom-build";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function CKEditorConfig({ initData, setData }) {
  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "imageUpload",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "redo",
        "undo",
        "alignment",
        "code",
        "codeBlock",
        "fontfamily",
        "fontsize",
        "fontColor",
        "fontBackgroundColor",
        "imageInsert",
      ],
    },
    language: "vi",
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };
  return (
    <>
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data={initData}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data);
          setData(data);
        }}
      />
    </>
  );
}

export default CKEditorConfig;
