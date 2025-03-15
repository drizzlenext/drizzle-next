import { TiptapProcessor } from "../processors/tiptap-processor";
import { DrizzleNextProcessor } from "./types";

type ClassType<T> = new (...args: any[]) => T;

type DrizzleNextAddOn = {
  Processor: ClassType<DrizzleNextProcessor>;
  name: string;
  description: string;
}

type ClassMap = {
  [key: string]: DrizzleNextAddOn;
}

export const ADD_ON_REGISTRY: ClassMap = {
  tiptap: {
    Processor: TiptapProcessor,
    name: "tiptap",
    description: "a starting point for the tiptap wysiwyg editor",
  },
};

export function getAddOnHelpText() {
  let res = "";
  for (const key in ADD_ON_REGISTRY) {
    const addOn = ADD_ON_REGISTRY[key as keyof typeof ADD_ON_REGISTRY];
    res += `${addOn.name} - ${addOn.description}\n`;
  }
  return res;
}
