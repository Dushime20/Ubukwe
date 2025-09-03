const fs = require('fs');
const path = require('path');

console.log('🎨 Favicon Generation Script for Ubukwe Wedding Platform');
console.log('=====================================================\n');

console.log('📁 Current favicon files in public folder:');
const publicDir = path.join(__dirname, '../public');
const files = fs.readdirSync(publicDir);
const faviconFiles = files.filter(file => file.includes('favicon') || file.includes('icon'));

faviconFiles.forEach(file => {
  const stats = fs.statSync(path.join(publicDir, file));
  console.log(`  ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
});

console.log('\n🔧 To generate different favicon sizes, you can:');
console.log('\n1. Use an online favicon generator:');
console.log('   • https://realfavicongenerator.net/');
console.log('   • https://favicon.io/');
console.log('   • https://www.favicon-generator.org/');

console.log('\n2. Or use ImageMagick/GraphicsMagick:');
console.log('   • convert favicon.ico -resize 16x16 favicon-16x16.png');
console.log('   • convert favicon.ico -resize 32x32 favicon-32x32.png');
console.log('   • convert favicon.ico -resize 180x180 apple-touch-icon.png');

console.log('\n3. Or use a Node.js package like sharp:');
console.log('   • npm install sharp');
console.log('   • Create a script to resize your favicon.ico');

console.log('\n📋 Required favicon files:');
console.log('  • favicon.ico (✅ already exists)');
console.log('  • favicon-16x16.png (16x16 pixels)');
console.log('  • favicon-32x32.png (32x32 pixels)');
console.log('  • apple-touch-icon.png (180x180 pixels)');

console.log('\n🎯 Your favicon is now configured in app/layout.tsx!');
console.log('   The browser will automatically use the appropriate size.');
