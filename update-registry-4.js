const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, 'src', 'content', 'posts', 'registry.ts');
let content = fs.readFileSync(registryPath, 'utf8');

const newSlugs = [
  "qualities-mumbai-eye-specialist-doctor",
  "comprehensive-eye-doctor-mumbai-services",
  "lasik-eye-surgery-mumbai-procedure-benefits",
  "cost-of-lasik-eye-surgery-mumbai-worth-it"
];

let imports = [];
let entries = [];

for (const slug of newSlugs) {
  const varName = `p_${slug.replace(/-/g, '_')}`;
  imports.push(`import ${varName} from "./${slug}";`);
  entries.push(`  "${slug}": ${varName},`);
}

// Insert imports right after the last import
const importRegex = /import [a-zA-Z0-9_]+ from "\.\/[a-zA-Z0-9_-]+";\n/g;
let lastImportIndex = 0;
let match;
while ((match = importRegex.exec(content)) !== null) {
  lastImportIndex = match.index + match[0].length;
}

if (lastImportIndex > 0) {
  content = content.slice(0, lastImportIndex) + imports.join('\n') + '\n' + content.slice(lastImportIndex);
}

// Insert entries right before "};"
const endObjectRegex = /\n};\n\nexport default POSTS;/;
content = content.replace(endObjectRegex, '\n' + entries.join('\n') + '\n};\n\nexport default POSTS;');

fs.writeFileSync(registryPath, content);
console.log('Registry updated successfully with 4 new blogs.');
