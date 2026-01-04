import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { name, email, subject, category, message } = body;

  console.log("Received contact form submission:", { name, email, subject, category, message });

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  try {
    // Create reusable transporter object
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "subhamrahar22@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "flbv zqbg tvlj rkev",
      }
    });

    // Category display names
    const categoryDisplayNames = {
      bug: "Bug Report",
      support: "Support Request",
      business: "Business Inquiry",
      custom: "Custom Template Request"
    };

    // Email options
    const mailOptions = {
      from: `"OpusForge Contact" <opusforge1978@gmail.com>`,
      to: "opusforge1978@gmail.com",
      subject: subject || `New Contact: ${categoryDisplayNames[category] || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${category ? `<p><strong>Category:</strong> ${categoryDisplayNames[category]}</p>` : ''}
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          </div>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            This message was sent from the OpusForge contact form.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully");

    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}