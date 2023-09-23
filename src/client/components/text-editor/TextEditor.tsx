import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import useTextEditor from "./useTextEditor";

export type TextEditorProps = {
  name: string;
  value: EditorState;
  onChange: (payload: { field: string; value: string }) => void;
};

export default function TextEditor(props: TextEditorProps) {
  const { toolbarOptions } = useTextEditor();
  return (
    <Editor
      editorState={props.value}
      onEditorStateChange={(v) =>
        props.onChange({ field: props.name, value: v as unknown as string })
      }
      toolbar={toolbarOptions}
      editorClassName="border border-gray-100 h-[700px] px-5"
    />
  );
}
