import fs from 'fs';
import path from 'path';

const directories = [
    '/Users/savya/projects/GrubhubPrototype-Kafka-MongoDB/middleware',
    '/Users/savya/projects/GrubhubPrototype-Kafka-MongoDB/server'
];

const processFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Update relative imports to include .js extension
    // Matches: import ... from './something' or import './something'
    // Also handles ../
    const importRegex = /(import\s+.*?\s+from\s+['"])(\.\.?\/.*?)(?=['"])/g;
    content = content.replace(importRegex, (match, p1, p2) => {
        if (!p2.endsWith('.js')) {
            changed = true;
            return p1 + p2 + '.js';
        }
        return match;
    });

    const importSideEffectRegex = /(import\s+['"])(\.\.?\/.*?)(?=['"])/g;
    content = content.replace(importSideEffectRegex, (match, p1, p2) => {
        if (!p2.endsWith('.js')) {
            changed = true;
            return p1 + p2 + '.js';
        }
        return match;
    });

    // 2. Replace require() with import
    // Matches: const x = require('y')
    const requireAssignRegex = /const\s+(.*?)\s+=\s+require\(['"](.*?)['"]\);?/g;
    content = content.replace(requireAssignRegex, (match, p1, p2) => {
        changed = true;
        let importPath = p2;
        if ((importPath.startsWith('./') || importPath.startsWith('../')) && !importPath.endsWith('.js')) {
            importPath += '.js';
        }
        return `import ${p1} from '${importPath}';`;
    });

    // Matches: require('y')
    const requireRegex = /require\(['"](.*?)['"]\);?/g;
    content = content.replace(requireRegex, (match, p1) => {
        changed = true;
        let importPath = p1;
        if ((importPath.startsWith('./') || importPath.startsWith('../')) && !importPath.endsWith('.js')) {
            importPath += '.js';
        }
        return `import '${importPath}';`;
    });

    // 3. Replace module.exports = x
    const moduleExportsRegex = /module\.exports\s+=\s+(.*?);?$/gm;
    content = content.replace(moduleExportsRegex, (match, p1) => {
        changed = true;
        return `export default ${p1};`;
    });

    // 4. Replace exports.x = y
    const exportsRegex = /exports\.(.*?)\s+=\s+(.*?);?$/gm;
    content = content.replace(exportsRegex, (match, p1, p2) => {
        changed = true;
        return `export const ${p1} = ${p2};`;
    });

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Processed: ${filePath}`);
    }
};

const walk = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules') {
                walk(filePath);
            }
        } else if (file.endsWith('.js')) {
            processFile(filePath);
        }
    }
};

directories.forEach(walk);
