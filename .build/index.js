"use strict";
var import_fs = require("fs");
const orig = (0, import_fs.readFileSync)("test.pyc", "utf8");
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
console.log(converted);
(0, import_fs.writeFileSync)("test_converted.py", converted);
function indent(lvl) {
  var toReturn = "";
  for (let i = 0; i < lvl; i++) {
    toReturn += " ";
  }
  return toReturn;
}
//# sourceMappingURL=index.js.map
