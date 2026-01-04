import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className="bg-cardbg border-t border-border-light py-6 mt-auto">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-texts text-sm">
                        © {new Date().getFullYear()} OpusForge. All rights reserved.
                    </div>

                    <div className="flex space-x-6 text-sm">
                        <Link href="/terms" className="text-texts hover:text-textPurple transition-colors">
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy" className="text-texts hover:text-textPurple transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/contact" className="text-texts hover:text-textPurple transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer