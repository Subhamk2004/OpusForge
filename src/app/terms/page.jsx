import React from 'react'

function TermsAndConditions() {
    return (

        <div className='bg-gray-50 h-screen w-screen overflow-scroll text-black flex flex-col justify-start items-center pb-16'>
            <div className="h-full overflow-scroll bg-white">
            </div>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Terms and Conditions</h1>
                    <p className="text-gray-600 mb-8">Last updated:  24/8/2025</p>

                    <div className="space-y-8 text-textPurple">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">1. Introduction</h2>
                            <p className="leading-relaxed text-gray-600">
                                Welcome to OpusForge, a no-code portfolio builder platform. These Terms and Conditions ("Terms") govern your use of our service, which provides portfolio creation, GitHub integration, asset management, and related features. By accessing or using OpusForge, you agree to be bound by these Terms.
                            </p>
                        </section>

                        {/* Service Description */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">2. Service Description</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-gray-600">
                                    OpusForge provides the following services:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>No-code portfolio builder with live preview functionality</li>
                                    <li>Resume parsing and auto-fill capabilities using AI technology</li>
                                    <li>GitHub integration for automatic repository creation, commits, and GitHub Pages hosting</li>
                                    <li>Asset management system with free online storage for resumes, certificates, and other documents</li>
                                    <li>Portfolio hosting and sharing capabilities</li>
                                </ul>
                            </div>
                        </section>

                        {/* GitHub Integration */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">3. GitHub Integration</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-gray-600">
                                    When you connect your GitHub account to OpusForge, you grant us permission to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>Create repositories in your GitHub account for portfolio hosting</li>
                                    <li>Commit portfolio files to repositories created by OpusForge</li>
                                    <li>Delete repositories that were created by OpusForge (only upon your explicit request)</li>
                                    <li>Enable GitHub Pages hosting for your portfolio repositories</li>
                                </ul>
                                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                                    <p className="text-gray-600 font-medium">Important:</p>
                                    <p className="text-gray-600 mt-2">
                                        OpusForge will ONLY interact with repositories that it has created for your portfolios. We do not access, read, or modify any other repositories in your GitHub account.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Age Requirements */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">4. Age Requirements</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-gray-600">
                                    You must be at least 13 years old to use OpusForge. If you are under 13, you may only use our service with the involvement and consent of a parent or guardian. Users between 13-18 are encouraged to have parental guidance when using our platform.
                                </p>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-gray-600 font-medium">Important for Parents:</p>
                                    <p className="text-gray-600 mt-2">
                                        If you believe your child under 13 has provided personal information to us, please contact us immediately at opusforge1978@gmail.com so we can delete such information.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* User Responsibilities */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">5. User Responsibilities</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-gray-600">You are responsible for:</p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>Maintaining the security of your account credentials</li>
                                    <li>Ensuring that all content you upload is your own or properly licensed</li>
                                    <li>Providing accurate information in your portfolios</li>
                                    <li>Respecting intellectual property rights of others</li>
                                    <li>Using the service in compliance with applicable laws and regulations</li>
                                    <li>Managing who you share your portfolio and asset URLs with</li>
                                    <li>Ensuring you meet the minimum age requirements</li>
                                </ul>
                            </div>
                        </section>

                        {/* Prohibited Content and Conduct */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">6. Prohibited Content and Conduct</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-gray-600">You may not upload, share, or create content that:</p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>Is illegal, harmful, threatening, abusive, or defamatory</li>
                                    <li>Infringes copyright, trademark, or other intellectual property rights</li>
                                    <li>Contains malware, viruses, or malicious code</li>
                                    <li>Is sexually explicit, pornographic, or inappropriate</li>
                                    <li>Promotes violence, discrimination, or illegal activities</li>
                                    <li>Violates privacy rights of others</li>
                                    <li>Is spam, fraudulent, or misleading</li>
                                    <li>Violates any applicable laws or regulations</li>
                                </ul>
                                <p className="leading-relaxed text-gray-600 mt-4">
                                    We reserve the right to remove any content that violates these terms and may suspend or terminate accounts that repeatedly violate our policies.
                                </p>
                            </div>
                        </section>

                        {/* Data and Content */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">7. Data and Content</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">Portfolio Data</h3>
                                <p className="leading-relaxed text-gray-600">
                                    All portfolio data you enter or upload is stored in our database for the purpose of providing our services, including updates and live previews.
                                </p>

                                <h3 className="text-lg font-semibold text-textPurple">Asset Management</h3>
                                <p className="leading-relaxed text-gray-600">
                                    Uploaded assets (resumes, certificates, etc.) are stored using Cloudinary and generate publicly accessible URLs. While these assets are contained within the OpusForge system, the URLs can be shared with anyone you choose to share them with.
                                </p>

                                <h3 className="text-lg font-semibold text-textPurple">AI Processing</h3>
                                <p className="leading-relaxed text-gray-600">
                                    Resume data may be processed using Gemini AI for parsing and structuring purposes to populate your portfolio automatically.
                                </p>

                                <h3 className="text-lg font-semibold text-textPurple">Data Deletion</h3>
                                <p className="leading-relaxed text-gray-600">
                                    You may request deletion of your account and all associated data by contacting us at opusforge1978@gmail.com. Currently, account deletions are processed manually within 30 days of your request. Upon deletion, we will remove your portfolio data from our database and delete associated GitHub repositories created through OpusForge.
                                </p>
                            </div>
                        </section>

                        {/* Portfolio Management */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">8. Portfolio Management</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">Creation</h3>
                                <p className="leading-relaxed text-gray-600">
                                    When creating a portfolio, you must provide a unique repository name. OpusForge will create a repository in your GitHub account and deploy your portfolio as an HTML file with GitHub Pages hosting.
                                </p>

                                <h3 className="text-lg font-semibold text-textPurple">Updates</h3>
                                <p className="leading-relaxed text-gray-600">
                                    Portfolio updates will be committed only to the specific repository created for that portfolio. No other repositories will be affected.
                                </p>

                                <h3 className="text-lg font-semibold text-textPurple">Deletion</h3>
                                <p className="leading-relaxed text-gray-600">
                                    When you delete a portfolio, both the portfolio data from OpusForge and the associated GitHub repository will be permanently deleted after confirmation.
                                </p>
                            </div>
                        </section>

                        {/* Account Termination and Data Retention */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">9. Account Termination and Data Retention</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">Voluntary Termination</h3>
                                <p className="leading-relaxed text-gray-600">
                                    You may request account termination and data deletion at any time by emailing opusforge1978@gmail.com with the subject "Account Deletion Request". We will process your request manually within 30 days.
                                </p>

                                <h3 className="text-lg font-semibold text-textPurple">What Gets Deleted</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>All portfolio data from our database</li>
                                    <li>GitHub repositories created through OpusForge (with your confirmation)</li>
                                    <li>Uploaded assets from Cloudinary storage</li>
                                    <li>Your account information and preferences</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Involuntary Termination</h3>
                                <p className="leading-relaxed text-gray-600">
                                    We may terminate accounts that violate these Terms, engage in prohibited conduct, or for legal compliance reasons. In such cases, we will provide notice when legally permissible.
                                </p>
                            </div>
                        </section>

                        {/* Limitations and Restrictions */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">10. Limitations and Restrictions</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-gray-600">You may not:</p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>Use the service for illegal activities or to violate others' rights</li>
                                    <li>Upload malicious content or code</li>
                                    <li>Attempt to reverse engineer or compromise the service</li>
                                    <li>Share your account credentials with others</li>
                                    <li>Use the service to spam or send unsolicited communications</li>
                                    <li>Violate any third-party terms of service (including GitHub's)</li>
                                    <li>Upload content that violates our Prohibited Content policy</li>
                                    <li>Create multiple accounts to circumvent restrictions</li>
                                    <li>Use automated tools to access the service without permission</li>
                                </ul>
                            </div>
                        </section>

                        {/* Service Availability */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">11. Service Availability</h2>
                            <p className="leading-relaxed text-gray-600">
                                While we strive to maintain high availability, OpusForge is provided "as is" without guarantees of uninterrupted service. We may perform maintenance, updates, or modifications that could temporarily affect service availability. We are not responsible for service disruptions caused by third-party services including GitHub, Cloudinary, or Gemini AI.
                            </p>
                        </section>

                        {/* Changes to Third-Party Services */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">12. Changes to Third-Party Services</h2>
                            <p className="leading-relaxed text-gray-600">
                                OpusForge relies on third-party services (GitHub, Cloudinary, Gemini AI) that may change their terms, pricing, or availability. We will make reasonable efforts to notify users of significant changes that affect our service, but we cannot guarantee uninterrupted access to features dependent on these services.
                            </p>
                        </section>

                        {/* Disclaimer of Warranties */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">13. Disclaimer of Warranties</h2>
                            <p className="leading-relaxed text-gray-600">
                                OpusForge is provided "as is" without warranties of any kind. We do not guarantee that the service will be error-free, secure, or meet your specific requirements. Use of third-party services (GitHub, Cloudinary, Gemini AI) is subject to their respective terms and availability.
                            </p>
                        </section>

                        {/* Limitation of Liability */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">14. Limitation of Liability</h2>
                            <p className="leading-relaxed text-gray-600">
                                To the maximum extent permitted by law, OpusForge shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service, including but not limited to loss of data, portfolios, or business opportunities.
                            </p>
                        </section>

                        {/* Changes to Terms */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">15. Changes to Terms</h2>
                            <p className="leading-relaxed text-gray-600">
                                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the platform. Your continued use of OpusForge after changes constitute acceptance of the new Terms.
                            </p>
                        </section>

                        {/* Intellectual Property Rights */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">16. Intellectual Property Rights</h2>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-textPurple">OpusForge IP</h3>
                                <p className="leading-relaxed text-gray-600">
                                    All software, code, algorithms, designs, trademarks, and proprietary content of OpusForge remain our exclusive intellectual property. Users are granted a limited, non-exclusive, non-transferable license to use the platform solely as intended.
                                </p>

                                <h3 className="text-lg font-semibold text-textPurple">User Content</h3>
                                <p className="leading-relaxed text-gray-600">
                                    You retain ownership of all content you upload (resumes, certificates, portfolio data, etc.). However, by uploading content, you grant OpusForge a worldwide, non-exclusive, royalty-free license to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>Store, process, and display your content as necessary to provide our services</li>
                                    <li>Generate portfolio HTML files and host them via GitHub Pages</li>
                                    <li>Process your content through AI services for parsing and structuring</li>
                                    <li>Create publicly accessible URLs for your assets when you choose to use them</li>
                                </ul>

                                <h3 className="text-lg font-semibold text-textPurple">Copyright Compliance</h3>
                                <p className="leading-relaxed text-gray-600">
                                    You must only upload content you own or have proper rights to use. We reserve the right to remove any content that infringes copyright or violates intellectual property rights of others.
                                </p>
                            </div>
                        </section>

                        {/* DMCA and Copyright */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">17. DMCA and Copyright Infringement</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-gray-600">
                                    OpusForge respects intellectual property rights. If you believe content on our platform infringes your copyright, please provide our DMCA agent with:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>Your physical or electronic signature</li>
                                    <li>Description of the copyrighted work claimed to be infringed</li>
                                    <li>Location of the allegedly infringing content</li>
                                    <li>Your contact information</li>
                                    <li>Statement of good faith belief that use is not authorized</li>
                                    <li>Statement that the notification is accurate and you're authorized to act</li>
                                </ul>
                                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                                    <p className="text-gray-600 font-medium">DMCA Agent:</p>
                                    <p className="text-gray-600">Email: opusforge1978@gmail.com</p>
                                    <p className="text-gray-600">Subject: DMCA Takedown Request</p>
                                    <p className="text-gray-600">Website: opusforge.tech</p>
                                </div>
                            </div>
                        </section>

                        {/* Indemnification */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">18. Indemnification</h2>
                            <p className="leading-relaxed text-gray-600">
                                You agree to indemnify and hold OpusForge harmless from any claims, losses, damages, or expenses (including attorney fees) arising from: (a) your use of the service, (b) content you upload or share, (c) your violation of these Terms, or (d) your violation of any third party rights, including intellectual property rights.
                            </p>
                        </section>

                        {/* Electronic Agreement */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">19. Electronic Agreement and Signatures</h2>
                            <p className="leading-relaxed text-gray-600">
                                By clicking "I Accept," "Sign Up," or similar buttons, or by using OpusForge, you agree to be bound by these Terms. This constitutes a legally binding electronic signature and agreement under applicable electronic signature laws.
                            </p>
                        </section>

                        {/* Severability */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">20. Severability</h2>
                            <p className="leading-relaxed text-gray-600">
                                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to be valid and enforceable. Invalid provisions will be replaced with valid provisions that most closely match the intent of the original.
                            </p>
                        </section>

                        {/* Dispute Resolution */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">21. Dispute Resolution</h2>
                            <div className="space-y-4">
                                <p className="leading-relaxed text-gray-600">
                                    In the event of any dispute arising from these Terms or your use of OpusForge, the following process shall apply:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                    <li>First, we encourage good faith discussion by contacting us at opusforge1978@gmail.com</li>
                                    <li>We will attempt to resolve disputes amicably within 30 days of notification</li>
                                    <li>If informal resolution fails, disputes shall be resolved through the courts specified in the Governing Law section</li>
                                    <li>Users may appeal account suspensions or content removal decisions by emailing us with "Appeal Request" in the subject line</li>
                                </ul>
                                <p className="leading-relaxed text-gray-600 mt-4">
                                    This does not limit your right to seek injunctive relief for intellectual property infringement or other urgent matters.
                                </p>
                            </div>
                        </section>

                        {/* Force Majeure */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">22. Force Majeure</h2>
                            <p className="leading-relaxed text-gray-600">
                                OpusForge shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to: acts of God, natural disasters, war, terrorism, pandemic, government regulations, labor disputes, internet or telecommunications failures, cyber attacks on critical infrastructure, or the failure or unavailability of essential third-party services (GitHub, Cloudinary, Gemini AI). In such events, we will make reasonable efforts to restore service and notify users of significant disruptions.
                            </p>
                        </section>

                        {/* Export Control */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">23. Export Control</h2>
                            <p className="leading-relaxed text-gray-600">
                                You may not use OpusForge if you are located in a country subject to trade sanctions or export restrictions. You agree to comply with all applicable export control laws and regulations.
                            </p>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">24. Contact Information</h2>
                            <p className="leading-relaxed text-gray-600">
                                If you have questions about these Terms, please contact us at:
                            </p>
                            <div className="bg-gray-100 p-4 rounded-lg mt-4">
                                <p className="text-gray-600">Email: opusforge1978@gmail.com</p>
                                <p className="text-gray-600">Website: opusforge.tech</p>
                                <p className="text-gray-600">Subject: Terms and Conditions Inquiry</p>
                                <p className="text-gray-600">DMCA Requests: opusforge1978@gmail.com</p>
                            </div>
                        </section>

                        {/* Governing Law */}
                        <section>
                            <h2 className="text-2xl font-semibold text-purple-700 mb-4">25. Governing Law</h2>
                            <p className="leading-relaxed text-gray-600">
                                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of OpusForge shall be resolved in the courts of Mumbai, Maharashtra, India, or through appropriate alternative dispute resolution mechanisms.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-300">
                        <p className="text-gray-600 text-center">
                            By using OpusForge, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions