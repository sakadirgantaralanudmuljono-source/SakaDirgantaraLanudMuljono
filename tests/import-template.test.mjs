import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import XLSX from 'xlsx';
const schema=JSON.parse(fs.readFileSync(new URL('../public/templates/import-schema.json',import.meta.url)));
const book=XLSX.readFile(new URL('../public/templates/template_import_saka.xlsx',import.meta.url).pathname,{cellStyles:true});
test('download template headers match all eight import modules and contain no importable examples',()=>{for(const [name,s] of Object.entries(schema)){assert.deepEqual(XLSX.utils.sheet_to_json(book.Sheets[name],{header:1})[0],s.headers);assert.equal(XLSX.utils.sheet_to_json(book.Sheets[name]).length,0);}assert(book.SheetNames.includes('Petunjuk'));assert(book.SheetNames.includes('Contoh'));assert(schema.Users.headers.includes('Password'));assert(!schema.Users.headers.includes('PasswordHash'));});
test('template preserves leading zeros and uses text cells for identifiers and passwords',()=>{assert.equal(book.Sheets.Contoh.H2.v,'081200000001');assert.equal(book.Sheets.Users.H2.z,'@');assert.equal(book.Sheets.Anggota.B2.z,'@');});
test('import parser retains original Excel row numbers around blank lines',()=>{const sheet=XLSX.utils.aoa_to_sheet([['Username'],['one'],[],['two']]);const rows=XLSX.utils.sheet_to_json(sheet);assert.deepEqual(rows.map(x=>x.__rowNum__+1),[2,4]);});
