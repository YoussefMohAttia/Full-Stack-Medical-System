const fs = require('node:fs');
const path = require('node:path');
const nunjucks = require('nunjucks');
const root = path.join(__dirname, '../../templates');
let output = 'const window = { nunjucksPrecompiled: {} };\n';
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) {
      const name = path.relative(root, file).replaceAll('\\', '/');
      output += nunjucks.precompileString(fs.readFileSync(file, 'utf8'), { name }) + '\n';
    }
  }
}
walk(root);
output += 'export default window.nunjucksPrecompiled;\n';
fs.writeFileSync(path.join(__dirname, '../generated/templates.js'), output);

