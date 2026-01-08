#!/usr/bin/env node

/**
 * Image Compression Script
 * Compresses images to a maximum of 100KB while maintaining quality
 * Uses sharp for image processing
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { existsSync } from 'fs';

const MAX_SIZE_KB = 100;
const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;
const QUALITY_START = 85;
const QUALITY_MIN = 60;
const QUALITY_STEP = 5;

// Supported image formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Compress a single image to target size
 */
async function compressImage(inputPath, outputPath, targetSize = MAX_SIZE_BYTES) {
    try {
        const stats = await stat(inputPath);
        const originalSize = stats.size;

        // If already small enough, just copy it
        if (originalSize <= targetSize) {
            console.log(`✓ ${inputPath} already ${(originalSize / 1024).toFixed(2)}KB (under limit)`);
            return { success: true, originalSize, finalSize: originalSize, compressed: false };
        }

        const ext = extname(inputPath).toLowerCase();
        let quality = QUALITY_START;
        let finalSize = originalSize;
        let lastSuccessfulBuffer = null;

        // Binary search for optimal quality
        while (quality >= QUALITY_MIN) {
            let buffer;

            if (ext === '.png') {
                // PNG compression
                buffer = await sharp(inputPath)
                    .png({ 
                        quality: quality,
                        compressionLevel: 9,
                        adaptiveFiltering: true,
                    })
                    .toBuffer();
            } else if (ext === '.webp') {
                // WebP compression
                buffer = await sharp(inputPath)
                    .webp({ quality: quality })
                    .toBuffer();
            } else {
                // JPEG compression
                buffer = await sharp(inputPath)
                    .jpeg({ 
                        quality: quality,
                        mozjpeg: true,
                        progressive: true,
                    })
                    .toBuffer();
            }

            finalSize = buffer.length;

            if (finalSize <= targetSize) {
                // Ensure output directory exists
                const outputDir = dirname(outputPath);
                if (!existsSync(outputDir)) {
                    await mkdir(outputDir, { recursive: true });
                }

                await sharp(buffer).toFile(outputPath);
                console.log(`✓ ${inputPath} → ${outputPath} (${(originalSize / 1024).toFixed(2)}KB → ${(finalSize / 1024).toFixed(2)}KB, quality: ${quality})`);
                return { success: true, originalSize, finalSize, compressed: true };
            }

            lastSuccessfulBuffer = buffer;
            quality -= QUALITY_STEP;
        }

        // If we couldn't get under target, use the best we have
        if (lastSuccessfulBuffer) {
            const outputDir = dirname(outputPath);
            if (!existsSync(outputDir)) {
                await mkdir(outputDir, { recursive: true });
            }

            await sharp(lastSuccessfulBuffer).toFile(outputPath);
            console.log(`⚠ ${inputPath} → ${outputPath} (${(originalSize / 1024).toFixed(2)}KB → ${(finalSize / 1024).toFixed(2)}KB, quality: ${quality + QUALITY_STEP}, still over limit)`);
            return { success: true, originalSize, finalSize, compressed: true, warning: true };
        }

        throw new Error('Could not compress image');
    } catch (error) {
        console.error(`✗ Error compressing ${inputPath}:`, error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Process a directory recursively
 */
async function processDirectory(dirPath, outputDir = null, basePath = '') {
    const entries = await readdir(dirPath, { withFileTypes: true });
    const results = {
        processed: 0,
        skipped: 0,
        errors: 0,
        totalOriginalSize: 0,
        totalFinalSize: 0,
    };

    for (const entry of entries) {
        const fullPath = join(dirPath, entry.name);
        const relativePath = join(basePath, entry.name);

        if (entry.isDirectory()) {
            // Skip node_modules and other common directories
            if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next') {
                continue;
            }

            const subResults = await processDirectory(
                fullPath,
                outputDir ? join(outputDir, entry.name) : null,
                relativePath
            );
            results.processed += subResults.processed;
            results.skipped += subResults.skipped;
            results.errors += subResults.errors;
            results.totalOriginalSize += subResults.totalOriginalSize;
            results.totalFinalSize += subResults.totalFinalSize;
        } else if (entry.isFile()) {
            const ext = extname(entry.name).toLowerCase();
            
            if (!SUPPORTED_FORMATS.includes(ext)) {
                results.skipped++;
                continue;
            }

            const outputPath = outputDir 
                ? join(outputDir, entry.name)
                : fullPath; // Overwrite if no output dir specified

            const result = await compressImage(fullPath, outputPath);
            
            if (result.success) {
                results.processed++;
                results.totalOriginalSize += result.originalSize;
                results.totalFinalSize += result.finalSize;
                if (result.error) {
                    results.errors++;
                }
            } else {
                results.errors++;
            }
        }
    }

    return results;
}

/**
 * Main function
 */
async function main() {
    const args = process.argv.slice(2);
    const inputPath = args[0] || 'public';
    const outputPath = args[1] || null; // If null, overwrites original

    console.log('🖼️  Image Compression Script');
    console.log(`📁 Input: ${inputPath}`);
    console.log(`📁 Output: ${outputPath || 'overwrite original'}`);
    console.log(`🎯 Target: ${MAX_SIZE_KB}KB per image\n`);

    try {
        const stats = await stat(inputPath);
        
        if (stats.isFile()) {
            // Single file
            const ext = extname(inputPath).toLowerCase();
            if (!SUPPORTED_FORMATS.includes(ext)) {
                console.error('✗ Unsupported file format');
                process.exit(1);
            }

            const output = outputPath || inputPath;
            const result = await compressImage(inputPath, output);
            
            if (result.success) {
                const savings = ((1 - result.finalSize / result.originalSize) * 100).toFixed(1);
                console.log(`\n✨ Compression complete! Saved ${savings}%`);
                process.exit(0);
            } else {
                process.exit(1);
            }
        } else if (stats.isDirectory()) {
            // Directory
            const results = await processDirectory(inputPath, outputPath);
            
            console.log('\n📊 Summary:');
            console.log(`   Processed: ${results.processed} images`);
            console.log(`   Skipped: ${results.skipped} files`);
            console.log(`   Errors: ${results.errors}`);
            
            if (results.processed > 0) {
                const totalOriginalMB = (results.totalOriginalSize / (1024 * 1024)).toFixed(2);
                const totalFinalMB = (results.totalFinalSize / (1024 * 1024)).toFixed(2);
                const totalSavings = ((1 - results.totalFinalSize / results.totalOriginalSize) * 100).toFixed(1);
                
                console.log(`   Original size: ${totalOriginalMB}MB`);
                console.log(`   Final size: ${totalFinalMB}MB`);
                console.log(`   Total savings: ${totalSavings}%`);
            }
            
            process.exit(results.errors > 0 ? 1 : 0);
        } else {
            console.error('✗ Invalid path');
            process.exit(1);
        }
    } catch (error) {
        console.error('✗ Error:', error.message);
        process.exit(1);
    }
}

main();

