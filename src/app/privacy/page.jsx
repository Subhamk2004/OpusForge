import React from 'react'

function PrivacyPolicy() {
    return (
        <div className='bg-p h-screen w-screen overflow-scroll text-black flex flex-col justify-start items-center pb-16'>
            <div className="h-full overflow-scroll bg-white">
            </div>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-cardbg rounded-xl shadow-soft p-8">
                    <h1 className="text-4xl font-bold text-textp mb-2">Privacy Policy</h1>
                    <p className="text-texts mb-8">Last updated:  24/8/2025</p>

                    <div className="space-y-8 text-textPurple">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">1. Introduction</h2>
                            <p className="leading-relaxed text-texts">
                                At OpusForge, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you use our no-code portfolio builder platform. By using OpusForge, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">2. Information We Collect</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">Account Information</h3>
                                <p className="leading-relaxed text-texts">
                                    When you create an account, we collect:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Email address (for account creation and communication)</li>
                                    <li>GitHub username and associated data when you connect your GitHub account</li>
                                    <li>Authentication tokens from GitHub (OAuth)</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Portfolio Content</h3>
                                <p className="leading-relaxed text-texts">
                                    Information you provide when creating portfolios:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Personal details (name, contact information, professional summary)</li>
                                    <li>Educational background and work experience</li>
                                    <li>Skills, projects, and achievements</li>
                                    <li>Portfolio customization preferences (themes, layouts)</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Uploaded Files</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Resumes (PDF format)</li>
                                    <li>Certificates and credentials</li>
                                    <li>Profile images and project screenshots</li>
                                    <li>Other portfolio-related documents</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Technical Information</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>IP address and browser information</li>
                                    <li>Device type and operating system</li>
                                    <li>Usage patterns and feature interactions</li>
                                    <li>Error logs and performance data</li>
                                </ul>
                            </div>
                        </section>

                        {/* How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">3. How We Use Your Information</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">Service Delivery</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Create and manage your portfolio websites</li>
                                    <li>Generate GitHub repositories and enable GitHub Pages hosting</li>
                                    <li>Process and parse resume data using AI technology</li>
                                    <li>Store and serve your uploaded assets via secure CDN</li>
                                    <li>Provide live preview functionality</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Communication</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Send account-related notifications and updates</li>
                                    <li>Respond to support inquiries and feedback</li>
                                    <li>Notify about significant service changes or Terms updates</li>
                                    <li>Provide technical support and troubleshooting</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Service Improvement</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Analyze usage patterns to improve features</li>
                                    <li>Monitor performance and fix technical issues</li>
                                    <li>Understand user needs for future development</li>
                                    <li>Ensure security and prevent abuse</li>
                                </ul>
                            </div>
                        </section>

                        {/* AI Processing and Data */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">4. AI Processing and Data</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">Gemini AI Integration</h3>
                                <p className="leading-relaxed text-texts">
                                    We use Google's Gemini AI to parse and structure resume content for automatic portfolio population. When you upload a resume:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Your resume content is temporarily processed by Gemini AI</li>
                                    <li>The AI extracts structured data (education, experience, skills, etc.)</li>
                                    <li>Processed data is returned to populate your portfolio fields</li>
                                    <li>We do not retain raw resume content in AI processing systems</li>
                                </ul>

                                <div className="bg-inputbg p-4 rounded-lg mt-4">
                                    <p className="text-texts font-medium">Important:</p>
                                    <p className="text-texts mt-2">
                                        AI processing is subject to Google's privacy policies and terms of service. Resume data sent for processing is handled according to Google's enterprise AI service agreements.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Third-Party Services */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">5. Third-Party Services</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">GitHub Integration</h3>
                                <p className="leading-relaxed text-texts">
                                    When you connect your GitHub account:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>We access your GitHub profile information</li>
                                    <li>We create repositories specifically for your portfolios</li>
                                    <li>We commit portfolio files to these designated repositories</li>
                                    <li>We enable GitHub Pages hosting for public portfolio access</li>
                                    <li>We do not access or modify any other repositories</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Cloudinary Asset Storage</h3>
                                <p className="leading-relaxed text-texts">
                                    Uploaded assets are stored using Cloudinary services:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Files are stored securely on Cloudinary's CDN</li>
                                    <li>Public URLs are generated for portfolio integration</li>
                                    <li>Assets are optimized for web delivery</li>
                                    <li>Storage and access logs are maintained by Cloudinary</li>
                                </ul>

                                <div className="bg-inputbg p-4 rounded-lg mt-4">
                                    <p className="text-texts font-medium">Privacy Note:</p>
                                    <p className="text-texts mt-2">
                                        Third-party services (GitHub, Cloudinary, Gemini AI) have their own privacy policies. We encourage you to review their policies to understand how they handle your data.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Data Storage and Security */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">6. Data Storage and Security</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">Storage Locations</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Portfolio data is stored in secure databases</li>
                                    <li>Assets are stored on Cloudinary's global CDN</li>
                                    <li>GitHub repositories are hosted on GitHub's infrastructure</li>
                                    <li>All data storage complies with industry security standards</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Security Measures</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Encrypted connections (HTTPS/TLS) for all data transmission</li>
                                    <li>Secure authentication using OAuth standards</li>
                                    <li>Regular security updates and monitoring</li>
                                    <li>Limited access to personal data on a need-to-know basis</li>
                                    <li>Secure handling of authentication tokens and credentials</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Data Retention</h3>
                                <p className="leading-relaxed text-texts">
                                    We retain your data for as long as your account is active or as needed to provide services. You may request data deletion at any time by contacting us at opusforge1978@gmail.com.
                                </p>
                            </div>
                        </section>

                        {/* Data Sharing and Disclosure */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">7. Data Sharing and Disclosure</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">We Do NOT Share Your Data Except:</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
                                    <li><strong>Service Providers:</strong> Third-party services necessary for platform functionality (GitHub, Cloudinary, Gemini AI)</li>
                                    <li><strong>Legal Requirements:</strong> When required by law, court orders, or legal processes</li>
                                    <li><strong>Safety and Security:</strong> To protect our users, platform integrity, or investigate violations</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Public Information</h3>
                                <p className="leading-relaxed text-texts">
                                    Your portfolio content becomes publicly accessible when you:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Create a portfolio (hosted on GitHub Pages with public URL)</li>
                                    <li>Share portfolio URLs with others</li>
                                    <li>Upload assets that generate publicly accessible Cloudinary URLs</li>
                                </ul>

                                <div className="bg-inputbg p-4 rounded-lg mt-4">
                                    <p className="text-texts font-medium">Important:</p>
                                    <p className="text-texts mt-2">
                                        You control what information appears in your public portfolio. We recommend reviewing your portfolio content before publishing to ensure you're comfortable with public visibility.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Your Rights and Choices */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">8. Your Rights and Choices</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">Data Access and Control</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li><strong>Access:</strong> View and download your portfolio data at any time</li>
                                    <li><strong>Update:</strong> Modify your portfolio information and account details</li>
                                    <li><strong>Delete:</strong> Remove specific portfolio content or delete entire portfolios</li>
                                    <li><strong>Export:</strong> Download your portfolio data for external use</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Account Deletion</h3>
                                <p className="leading-relaxed text-texts">
                                    You may request complete account deletion by emailing opusforge1978@gmail.com with the subject "Account Deletion Request." We will:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Delete all portfolio data from our databases</li>
                                    <li>Remove uploaded assets from Cloudinary storage</li>
                                    <li>Delete GitHub repositories created through OpusForge (with your confirmation)</li>
                                    <li>Process your request within 30 days</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Communication Preferences</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Opt out of non-essential communications</li>
                                    <li>Choose notification frequency and types</li>
                                    <li>Unsubscribe from promotional emails (account-related emails may continue for service functionality)</li>
                                </ul>
                            </div>
                        </section>

                        {/* Children's Privacy */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">9. Children's Privacy</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-texts">
                                    OpusForge is designed to be safe for users 13 years and older. We take special precautions regarding children's privacy:
                                </p>
                                
                                <h3 className="text-lg font-semibold text-textPurple">Age Requirements</h3>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Users must be at least 13 years old</li>
                                    <li>Users under 13 may only use the service with parental involvement and consent</li>
                                    <li>We encourage parental guidance for users between 13-18</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Parental Controls</h3>
                                <p className="leading-relaxed text-texts">
                                    Parents or guardians may:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Request information about their child's account</li>
                                    <li>Request deletion of their child's data</li>
                                    <li>Contact us about privacy concerns at opusforge1978@gmail.com</li>
                                </ul>

                                <div className="bg-inputbg p-4 rounded-lg mt-4">
                                    <p className="text-texts font-medium">For Parents:</p>
                                    <p className="text-texts mt-2">
                                        If you believe your child under 13 has provided personal information without consent, please contact us immediately at opusforge1978@gmail.com with "Child Privacy Concern" in the subject line.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* International Data Transfers */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">10. International Data Transfers</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-texts">
                                    OpusForge operates globally and may transfer your data across international borders:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Our primary operations are based in India</li>
                                    <li>Third-party services (GitHub, Cloudinary, Google) may process data in various countries</li>
                                    <li>We ensure appropriate safeguards are in place for international transfers</li>
                                    <li>Data transfers comply with applicable privacy regulations</li>
                                </ul>
                            </div>
                        </section>

                        {/* Cookies and Tracking */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">11. Cookies and Tracking</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">Essential Cookies</h3>
                                <p className="leading-relaxed text-texts">
                                    We use cookies and similar technologies for:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Authentication and session management</li>
                                    <li>Security and fraud prevention</li>
                                    <li>Basic functionality and preferences</li>
                                    <li>Performance monitoring and error tracking</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Analytics and Performance</h3>
                                <p className="leading-relaxed text-texts">
                                    We may collect anonymized usage data to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>Understand feature usage and user behavior</li>
                                    <li>Identify and fix technical issues</li>
                                    <li>Improve platform performance and user experience</li>
                                </ul>

                                <p className="leading-relaxed text-texts mt-4">
                                    You can control cookie preferences through your browser settings, though this may affect platform functionality.
                                </p>
                            </div>
                        </section>

                        {/* Changes to Privacy Policy */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">12. Changes to This Privacy Policy</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-texts">
                                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make changes:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>We will update the "Last updated" date at the top of this policy</li>
                                    <li>For significant changes, we will notify you via email or platform notification</li>
                                    <li>Your continued use of OpusForge after changes constitutes acceptance</li>
                                    <li>We encourage periodic review of this policy</li>
                                </ul>
                            </div>
                        </section>

                        {/* Legal Basis for Processing */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">13. Legal Basis for Processing (GDPR)</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-texts">
                                    For users in the European Union, we process personal data based on:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li><strong>Contractual Necessity:</strong> To provide portfolio building services you've requested</li>
                                    <li><strong>Consent:</strong> When you explicitly agree to specific data processing (like AI resume parsing)</li>
                                    <li><strong>Legitimate Interest:</strong> To improve our services, ensure security, and provide customer support</li>
                                    <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
                                </ul>

                                <p className="leading-relaxed text-texts mt-4">
                                    EU users have additional rights under GDPR, including data portability, the right to object to processing, and the right to lodge complaints with supervisory authorities.
                                </p>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="text-2xl font-semibold text-textPurple mb-4">14. Contact Us</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-texts">
                                    If you have any questions about this Privacy Policy, your data, or our privacy practices, please contact us:
                                </p>
                                <div className="bg-inputbg p-4 rounded-lg mt-4">
                                    <p className="text-texts font-medium">Privacy Contact Information:</p>
                                    <p className="text-texts">Email: opusforge1978@gmail.com</p>
                                    <p className="text-texts">Subject: Privacy Policy Inquiry</p>
                                    <p className="text-texts">Website: opusforge.tech</p>
                                    <p className="text-texts">Response Time: Within 48 hours for privacy-related inquiries</p>
                                </div>

                                <h3 className="text-lg font-semibold text-textPurple">Specific Privacy Requests</h3>
                                <p className="leading-relaxed text-texts">
                                    For specific privacy requests, please use these subject lines:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-texts">
                                    <li>"Data Access Request" - to access your personal data</li>
                                    <li>"Account Deletion Request" - to delete your account and data</li>
                                    <li>"Child Privacy Concern" - for concerns about users under 13</li>
                                    <li>"GDPR Request" - for EU user rights requests</li>
                                    <li>"Privacy Policy Question" - for general privacy inquiries</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className="mt-12 pt-8 border-t border-border-light">
                        <p className="text-texts text-center">
                            By using OpusForge, you acknowledge that you have read, understood, and agree to the collection and use of information in accordance with this Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy