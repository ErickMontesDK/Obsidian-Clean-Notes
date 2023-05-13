/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ObsidianPasteAsHtmlPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var ObsidianPasteAsHtmlPlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.addCommand({
      id: "paste-as-html",
      name: "paste as html",
      editorCallback: async (editor, view) => {
        const items = await navigator.clipboard.read();
        const textBlob = await items[0].getType("text/html");
        const text = await new Response(textBlob).text();
        editor.replaceSelection(text);
      }
    });
  }
};