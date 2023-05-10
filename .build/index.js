"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_fs = require("fs");
var readline = __toESM(require("readline"));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var dir = "";
rl.question("Please input the .pyc file you would like to convert (do not include the file extension): ", function(answer) {
  dir = answer + ".pyc";
  readPycFile(dir);
  rl.close();
});
function readPycFile(file) {
  const orig = (0, import_fs.readFileSync)(file, "utf8");
  var lines = orig.replaceAll("function", "def").replaceAll("constructor(", "__init__(self,").replaceAll("this", "self").split("\n");
  var converted = "";
  String.prototype.isUpperCase = function() {
    if (!/^[a-zA-Z]+$/.test(this.toString()))
      return false;
    return this.toString() === this.toUpperCase();
  };
  String.prototype.isLowerCase = function() {
    if (!/^[a-zA-Z]+$/.test(this.toString()))
      return false;
    return this.toString() === this.toLowerCase();
  };
  String.prototype.isModifiable = function() {
    return /^[a-zA-Z]+$/.test(this.toString());
  };
  var indentLevel = 0;
  lines.forEach((l, i) => {
    var stringSoFar = "";
    var prev = "";
    l.split("").forEach((c, i2) => {
      const prev2 = l.split("")[i2 - 1];
      if (/^\s+$/.test(c)) {
        if (/^\s+$/.test(c + prev2))
          return;
      }
      if (c == "}") {
        indentLevel--;
        return;
      }
      if (c == "{" && i2 == l.length - 1) {
        indentLevel++;
        stringSoFar += ":";
        return;
      }
      if (i2 == 0)
        stringSoFar = indent(indentLevel) + stringSoFar;
      if (c.isUpperCase()) {
        c = "_" + c.toLowerCase();
      }
      if (c !== ";")
        stringSoFar += c;
      if (stringSoFar == "var ")
        stringSoFar = "";
    });
    if (!/^\s+$/.test(stringSoFar))
      converted += stringSoFar + "\n";
  });
  console.log("Saved!");
  (0, import_fs.writeFileSync)(file.replaceAll(".pyc", "") + "_converted.py", converted);
  function indent(lvl) {
    var toReturn = "";
    for (let i = 0; i < lvl; i++) {
      toReturn += " ";
    }
    return toReturn;
  }
}
//# sourceMappingURL=index.js.map
