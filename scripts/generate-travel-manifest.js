const fs = require('fs');
const path = require('path');
const exifr = require('exifr');

// Directory containing travel photos
const travelDir = path.join(__dirname, '../public/images/travel');
const outputFile = path.join(__dirname, '../public/travel-photos-manifest.json');

// Extract EXIF date from photo
async function getPhotoDate(filePath) {
  try {
    const exifData = await exifr.parse(filePath, {
      pick: ['DateTimeOriginal', 'DateTime', 'CreateDate']
    });

    // Try different date fields (in order of preference)
    const date = exifData?.DateTimeOriginal || exifData?.DateTime || exifData?.CreateDate;

    if (date instanceof Date) {
      return date.toISOString();
    }
    return null;
  } catch (error) {
    // If EXIF extraction fails, return null (no date)
    return null;
  }
}

// Read all folders in the travel directory
async function generateManifest() {
  const manifest = {};

  if (!fs.existsSync(travelDir)) {
    console.log('Travel directory does not exist yet. Creating empty manifest.');
    fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
    return;
  }

  const folders = fs.readdirSync(travelDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const folder of folders) {
    const folderPath = path.join(travelDir, folder);

    // Get all image files in the folder
    const files = fs.readdirSync(folderPath)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .sort(); // Sort alphabetically

    // Extract EXIF data for each photo
    const photos = [];
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const photoDate = await getPhotoDate(filePath);

      photos.push({
        url: `/images/travel/${folder}/${file}`,
        filename: file,
        dateTaken: photoDate
      });
    }

    manifest[folder] = photos;
  }

  // Write manifest file
  fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
  console.log('✅ Travel photos manifest generated successfully!');
  console.log(`   Found ${Object.keys(manifest).length} folders`);
  Object.keys(manifest).forEach(folder => {
    const withDates = manifest[folder].filter(p => p.dateTaken).length;
    console.log(`   - ${folder}: ${manifest[folder].length} photos (${withDates} with EXIF dates)`);
  });
}

generateManifest().catch(error => {
  console.error('Error generating manifest:', error);
  process.exit(1);
});
