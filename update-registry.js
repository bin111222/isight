const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, 'src', 'content', 'posts', 'registry.ts');
let content = fs.readFileSync(registryPath, 'utf8');

const newSlugs = [
  "mumbai-eye-specialist-doctor-guide",
  "when-to-visit-eye-doctor-mumbai",
  "best-lasik-eye-surgery-in-mumbai-guide",
  "multifocal-lens-price-in-india",
  "choosing-mumbai-eye-specialist-doctor-for-cataract",
  "eye-doctor-mumbai-pediatric-care",
  "best-lasik-eye-surgery-in-mumbai-cost-and-reviews",
  "multifocal-lens-price-vs-monofocal-cost",
  "top-treatments-by-mumbai-eye-specialist-doctor",
  "how-to-find-the-best-eye-doctor-mumbai"
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
console.log('Registry updated successfully.');
