const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = './public';
const images = ['mycook.jpg', 'mycook1.png', 'mycook2.png'];

async function optimize() {
    for (const img of images) {
        const inputPath = path.join(publicDir, img);
        if (!fs.existsSync(inputPath)) {
            console.log(`File not found: ${inputPath}`);
            continue;
        }

        // Output name
        const ext = path.extname(img);
        const outputPath = path.join(publicDir, img.replace(ext, '.webp'));
        
        const stats = fs.statSync(inputPath);
        console.log(`Processing ${img} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);

        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        console.log(`Optimized ${outputPath} (${(newStats.size / 1024 / 1024).toFixed(2)} MB)`);
    }
}

optimize().catch(err => {
    console.error(err);
    process.exit(1);
});
