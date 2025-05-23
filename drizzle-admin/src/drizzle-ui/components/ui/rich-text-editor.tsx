/* DO NOT EDIT. THIS FILE IS AUTOGENERATED. */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useCallback, useEffect, useState } from "react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  UnlinkIcon,
} from "lucide-react";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

// load all languages with "all" or common languages with "common"
import { common, createLowlight } from "lowlight";

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(common);

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export const RichTextEditor = ({
  html,
  name,
  id,
}: {
  html: string;
  name: string;
  id: string;
}) => {
  const [editorContent, setEditorContent] = useState(html);

  const editor = useEditor({
    extensions: [
      Image,
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link,
    ],
    content: html,
    immediatelyRender: false,
  });

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      // @ts-expect-error err
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.on("update", ({ editor }) => {
      const html = editor.getHTML(); // Get content as HTML
      setEditorContent(html);
    });
  }, [editor]);

  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rich-text-editor-container">
      {/* Toolbar */}
      <div className="rich-text-editor-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <BoldIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <ItalicIcon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <Heading1Icon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <Heading2Icon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <Heading3Icon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <AlignLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <AlignCenterIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <AlignRightIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <ListIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <ListOrderedIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <CodeIcon />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="rich-text-editor-btn inactive"
        >
          <ImageIcon />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={
            editor.isActive("link")
              ? "rich-text-editor-btn active"
              : "rich-text-editor-btn inactive"
          }
        >
          <LinkIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className={"rich-text-editor-btn"}
        >
          <UnlinkIcon />
        </button>
      </div>
      <div className="p-3">
        <EditorContent editor={editor} />
      </div>
      <input type="hidden" name={name} id={id} value={editorContent} />
    </div>
  );
};
