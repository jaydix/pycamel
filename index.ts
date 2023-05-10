import { readFileSync as readFile, writeFileSync as saveFile } from 'fs';

const orig: string = readFile('test.pyc', 'utf8')
var lines: Array<string> = orig.replaceAll('function', 'def').replaceAll('constructor(', '__init__(self,').replaceAll('this', 'self').split('\n')
var converted: string = ''

//console.log(orig)

String.prototype.isUpperCase = function(): boolean {
  if (!/^[a-zA-Z]+$/.test(this.toString())) return false;
  return this.toString() === this.toUpperCase()
}
String.prototype.isLowerCase = function(): boolean {
  if (!/^[a-zA-Z]+$/.test(this.toString())) return false;
  return this.toString() === this.toLowerCase()
}
String.prototype.isModifiable = function(): boolean {
  return /^[a-zA-Z]+$/.test(this.toString())
}

var indentLevel: number = 0

lines.forEach((l: string, i: number) => {
  var stringSoFar: string = ''
  var prev: string = ''
  l.split('').forEach((c: string, i: number) => {
    const prev = l.split('')[i - 1]
    if (/^\s+$/.test(c)) {
      if (/^\s+$/.test(c + prev)) return;
    }
    if (c == '}') {
      indentLevel--
      return;
    }
    if (c == '{' && i == l.length - 1) {
      indentLevel++
      stringSoFar += ':'
      return;
    }
    if (i == 0) stringSoFar = indent(indentLevel) + stringSoFar
    if (c.isUpperCase()) {
      c = '_' + c.toLowerCase()
    }
    if (c !== ';') stringSoFar += c
    if (stringSoFar == 'var ') stringSoFar = ''
    //console.log(stringSoFar)
  })
  if (!/^\s+$/.test(stringSoFar)) converted += stringSoFar + '\n'
})

console.log(converted)
saveFile('test_converted.py', converted)

function indent(lvl: number): string {
  var toReturn: string = ''
  for (let i: number = 0; i < lvl; i++) {
    toReturn += ' '
  }
  return toReturn;
}