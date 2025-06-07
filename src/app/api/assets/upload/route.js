import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import Asset from '@/models/Assets';
import connectDB from '@/lib/server/mongodb';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type');
    const name = formData.get('name');
    const email = formData.get('email');
    const description = formData.get('description') || '';

    console.log(email, "from upload route");
    

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const validTypes = ['image', 'pdf'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: type === 'pdf' ? 'raw' : 'image',
        folder: 'assets', 
      };

      cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

   
    const newAsset = new Asset({
      name: name || file.name,
      email: email,
      description,
      url: uploadResult.secure_url,
      type,
    });

    const savedAsset = await newAsset.save();

    return NextResponse.json({
      success: true,
      asset: savedAsset,
      cloudinaryResult: {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed: ' + error.message },
      { status: 500 }
    );
  }
}