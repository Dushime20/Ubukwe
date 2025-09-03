const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicons() {
  try {
    console.log('🎨 Creating favicon files for Ubukwe...\n');
    
    const publicDir = path.join(__dirname, '../public');
    const faviconPath = path.join(publicDir, 'favicon.ico');
    
    // Check if favicon.ico exists
    if (!fs.existsSync(faviconPath)) {
      console.log('❌ favicon.ico not found in public folder');
      return;
    }
    
    console.log('📁 Found favicon.ico, creating different sizes...\n');
    
    // Create favicon-16x16.png
    await sharp(faviconPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('✅ Created favicon-16x16.png');
    
    // Create favicon-32x32.png
    await sharp(faviconPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('✅ Created favicon-32x32.png');
    
    // Create apple-touch-icon.png
    await sharp(faviconPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ Created apple-touch-icon.png');
    
    console.log('\n🎯 All favicon files created successfully!');
    console.log('📱 Your favicon is now properly configured for all devices.');
    console.log('\n📋 Created files:');
    console.log('  • favicon-16x16.png (16x16 pixels)');
    console.log('  • favicon-32x32.png (32x32 pixels)');
    console.log('  • apple-touch-icon.png (180x180 pixels)');
    console.log('  • favicon.ico (already existed)');
    
  } catch (error) {
    console.error('❌ Error creating favicons:', error.message);
    console.log('\n💡 Alternative: Use an online favicon generator:');
    console.log('   • https://realfavicongenerator.net/');
    console.log('   • https://favicon.io/');
  }
}

createFavicons();
