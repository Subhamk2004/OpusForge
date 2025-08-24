import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/server/mongodb';
import Portfolios from '@/models/Portfolios';

export async function GET() {
  try {
    await connectDB();
    
    // Get all public portfolios (assuming you have a public field)
    const portfolios = await Portfolios.find({ 
      isPublic: true, // Only include public portfolios
      deployedUrl: { $exists: true, $ne: null } // Only portfolios with deployed URLs
    }).select('deployedUrl updatedAt');

    const baseUrl = 'https://www.opusforge.tech';
    
    // Generate XML sitemap for portfolios
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${portfolios.map(portfolio => `
  <url>
    <loc>${portfolio.deployedUrl}</loc>
    <lastmod>${new Date(portfolio.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, revalidate', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating portfolio sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}