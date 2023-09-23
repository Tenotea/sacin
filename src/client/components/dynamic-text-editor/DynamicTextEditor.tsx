import dynamic from "next/dynamic";

const DynamicTextEditor = dynamic(() => import("../text-editor/TextEditor"), {
  ssr: false,
});

export default DynamicTextEditor;
