import connectDB from "@/lib/server/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/server/auth";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  const user = session.user.email;
  const body = await req.json();
  const { title, message } = body;

  console.log("Received feedback:", { title, message });

  if (!title || !message) {
    return NextResponse.json(
      { error: "Title and message are required" },
      { status: 400 }
    );
  }

  try {
    const createTransporter = () => {
      const config = {
        service: "gmail",
        auth: {
          user: "subhamrahar22@gmail.com",
          pass: "flbv zqbg tvlj rkev",
        },
      };
      return nodemailer.createTransport(config);
    };

    const transporter = createTransporter();
    console.log(user);

    const mailOptions = {
      from: "opusforge1978@gmail.com",
      to: "opusforge1978@gmail.com",
      subject: `Feedback: ${title}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Feedback</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    /* Reset and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    }
    
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      border-collapse: collapse;
    }
    
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      display: block;
    }
    
    /* Main container */
    body {
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      width: 100% !important;
      min-width: 100%;
      font-size: 16px;
      line-height: 1.6;
      color: #333333;
    }
    
    .email-wrapper {
      background-color: #f5f5f5;
      padding: 20px 0;
      width: 100%;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    /* Header */
    .header {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: #ffffff;
      padding: 40px 30px;
      text-align: center;
      position: relative;
    }
    
    .header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
    }
    
    .logo {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    
    .logo i {
      margin-right: 12px;
      font-size: 26px;
      vertical-align: middle;
    }
    
    .header-subtitle {
      font-size: 15px;
      opacity: 0.85;
      font-weight: 400;
      line-height: 1.4;
    }
    
    /* Content area */
    .content {
      padding: 35px 30px;
      background-color: #ffffff;
    }
    
    /* Info blocks */
    .info-grid {
      display: table;
      width: 100%;
      margin-bottom: 30px;
    }
    
    .info-row {
      display: table-row;
    }
    
    .info-item {
      display: table-cell;
      padding: 0 0 20px 0;
      vertical-align: top;
      width: 50%;
    }
    
    .info-item:first-child {
      padding-right: 15px;
    }
    
    .info-item:last-child {
      padding-left: 15px;
    }
    
    .info-card {
      background: #fafafa;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      padding: 20px;
      height: 100%;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .info-card:hover {
      background: #f5f5f5;
      border-color: #d0d0d0;
    }
    
    .info-label {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .info-label i {
      margin-right: 8px;
      font-size: 14px;
      width: 16px;
      text-align: center;
    }
    
    .info-value {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.3;
      word-break: break-word;
    }
    
    /* Message section */
    .message-section {
      margin-top: 35px;
    }
    
    .message-card {
      background: #ffffff;
      border: 2px solid #e8e8e8;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .message-header {
      background: #1a1a1a;
      color: #ffffff;
      padding: 18px 25px;
      display: flex;
      align-items: center;
    }
    
    .message-header i {
      margin-right: 10px;
      font-size: 16px;
    }
    
    .message-header-text {
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .message-content {
      padding: 30px 25px;
      font-size: 15px;
      line-height: 1.7;
      color: #333333;
      white-space: pre-wrap;
      word-wrap: break-word;
      background: #ffffff;
      min-height: 80px;
      border-top: 1px solid #f0f0f0;
    }
    
    /* Timestamp */
    .timestamp-section {
      margin-top: 35px;
      text-align: center;
    }
    
    .timestamp-card {
      background: #f8f8f8;
      border: 1px solid #e0e0e0;
      border-radius: 25px;
      padding: 15px 25px;
      display: inline-block;
      font-size: 13px;
      color: #666666;
      font-weight: 500;
    }
    
    .timestamp-card i {
      margin-right: 8px;
      font-size: 14px;
    }
    
    /* Footer */
    .footer {
      background: #1a1a1a;
      color: #cccccc;
      text-align: center;
      padding: 30px;
      border-top: 1px solid #333333;
    }
    
    .footer-content {
      font-size: 13px;
      line-height: 1.6;
    }
    
    .footer-title {
      font-weight: 600;
      margin-bottom: 8px;
      color: #ffffff;
    }
    
    .footer-subtitle {
      opacity: 0.8;
      font-size: 12px;
    }
    
    /* Mobile responsiveness */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 10px 0;
      }
      
      .email-container {
        margin: 0 10px;
        border-radius: 6px;
      }
      
      .header {
        padding: 30px 20px;
      }
      
      .logo {
        font-size: 22px;
      }
      
      .logo i {
        font-size: 24px;
        margin-right: 10px;
      }
      
      .header-subtitle {
        font-size: 14px;
      }
      
      .content {
        padding: 25px 20px;
      }
      
      .info-grid {
        display: block;
      }
      
      .info-item {
        display: block;
        width: 100% !important;
        padding: 0 0 15px 0 !important;
      }
      
      .info-card {
        padding: 18px;
      }
      
      .info-value {
        font-size: 15px;
      }
      
      .message-header {
        padding: 15px 20px;
      }
      
      .message-content {
        padding: 25px 20px;
        font-size: 14px;
      }
      
      .timestamp-card {
        padding: 12px 20px;
        font-size: 12px;
      }
      
      .footer {
        padding: 25px 20px;
      }
    }
    
    @media only screen and (max-width: 480px) {
      .email-container {
        margin: 0 5px;
      }
      
      .header {
        padding: 25px 15px;
      }
      
      .content {
        padding: 20px 15px;
      }
      
      .info-card {
        padding: 15px;
      }
      
      .message-header {
        padding: 12px 15px;
      }
      
      .message-content {
        padding: 20px 15px;
      }
      
      .timestamp-card {
        padding: 10px 15px;
        border-radius: 20px;
      }
      
      .footer {
        padding: 20px 15px;
      }
    }
    
    /* Gmail app specific optimizations */
    @media screen and (max-width: 480px) {
      u + .body .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      
      u + .body .info-item {
        width: 100% !important;
        display: block !important;
      }
    }
    
    /* Dark mode support for Gmail */
    [data-ogsc] .email-container {
      background-color: #ffffff !important;
    }
    
    [data-ogsc] .info-card {
      background-color: #fafafa !important;
    }
    
    [data-ogsc] .message-content {
      background-color: #ffffff !important;
    }
  </style>
</head>
<body class="body">
  <div class="email-wrapper">
    <div class="email-container">
      <!-- Header -->
      <div class="header">
        <div class="logo">
          <i class="fas fa-envelope-open"></i>Feedback Received
        </div>
        <div class="header-subtitle">
          A user has submitted feedback through OpusForge
        </div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <!-- User and Subject Info Grid -->
        <div class="info-grid">
          <div class="info-row">
            <div class="info-item">
              <div class="info-card">
                <div class="info-label">
                  <i class="fas fa-user"></i>
                  User
                </div>
                <div class="info-value">${user}</div>
              </div>
            </div>
            <div class="info-item">
              <div class="info-card">
                <div class="info-label">
                  <i class="fas fa-tag"></i>
                  Subject
                </div>
                <div class="info-value">${title}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Message Section -->
        <div class="message-section">
          <div class="message-card">
            <div class="message-header">
              <i class="fas fa-comment-dots"></i>
              <span class="message-header-text">Message</span>
            </div>
            <div class="message-content">${message.replace(/\n/g, "<br>")}</div>
          </div>
        </div>
        
        <!-- Timestamp -->
        <div class="timestamp-section">
          <div class="timestamp-card">
            <i class="fas fa-clock"></i>
            Submitted on ${new Date().toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            })}
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-content">
          <div class="footer-title">This is an automated message</div>
          <div class="footer-subtitle">© ${new Date().getFullYear()} OpusForge. All rights reserved.</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Feedback sent successfully");

    return NextResponse.json(
      { message: "Feedback sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send feedback. Please try again later." },
      { status: 500 }
    );
  }
}
