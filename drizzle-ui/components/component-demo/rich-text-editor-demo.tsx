import { RichTextEditor } from "@/src/components/ui/rich-text-editor";
import "@/src/styles/rich-text-editor.css";

export function RichTextEditorDemo() {
  return (
    <div>
      <RichTextEditor id="id" name="name" html="Rich text editor demo" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/a11y-dark.min.css"
      />
    </div>
  );
}
