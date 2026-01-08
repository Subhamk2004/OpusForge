# 🎨 OpusForge - Professional Portfolio Builder

> **Transform your career story into a stunning portfolio in minutes**

OpusForge is a modern, full-stack web application that empowers developers and IT professionals to create stunning portfolios effortlessly. With seamless GitHub integration, AI-powered templates, and centralized asset management, building your professional presence has never been easier.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC)](https://tailwindcss.com/)

## ✨ Key Features

### 🚀 **One-Click Portfolio Creation**
- **Professional Templates**: Choose from expertly crafted templates designed for developers
- **Intuitive Interface**: User-friendly forms for easy data input
- **Instant GitHub Integration**: Automatic repository creation with portfolio code
- **Immediate Deployment**: Get a shareable link instantly upon creation

### 🤖 **AI-Powered Template Generation**
- **Custom Template Creation**: Describe your vision and let AI create tailored templates
- **Multiple Categories**: Landing pages, portfolios, dashboards, and more
- **Smart Customization**: AI understands your requirements and generates appropriate designs
- **Real-time Generation**: Fast AI processing for immediate results

### 📁 **Centralized Asset Management**
- **Document Storage**: Store resumes, cover letters, certificates, and more
- **Quick Access**: Retrieve all professional documents from one location
- **Upload Integration**: Seamless file management within the portfolio builder
- **Asset Search**: Powerful search functionality to find documents quickly

### 🔐 **Secure Authentication**
- **GitHub OAuth**: Seamless integration with your GitHub account
- **Credentials Support**: Traditional email/password authentication
- **MongoDB Sessions**: Secure session management
- **User Profile Management**: Complete user data handling

### 🌐 **Instant Deployment & Hosting**
- **GitHub Pages Integration**: Automatic deployment to GitHub Pages
- **Custom Domains**: Support for custom domain configuration
- **Live Updates**: Real-time portfolio updates and redeployment
- **Version Control**: Full Git history for your portfolio changes

### 🎨 **Live Preview & Real-time Editing**
- **Interactive Preview**: See changes instantly as you build
- **Responsive Design**: Mobile-first approach with responsive previews
- **Form Validation**: Real-time validation and feedback
- **Auto-save**: Automatic saving of progress

## 🏗️ **Detailed Architecture & Features**

### **🎯 Core Application Flow**
```
User Journey:
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐    ┌──────────────┐
│  Landing    │ →  │ Authentication│ →  │ Template        │ →  │ Portfolio    │
│  Page       │    │ (OAuth/Creds) │    │ Selection       │    │ Builder      │
└─────────────┘    └──────────────┘    └─────────────────┘    └──────────────┘
                                                ↓
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐    ┌──────────────┐
│ Live        │ ←  │ GitHub       │ ←  │ Asset           │ ←  │ Form         │
│ Portfolio   │    │ Deployment   │    │ Management      │    │ Filling      │
└─────────────┘    └──────────────┘    └─────────────────┘    └──────────────┘
```

### **🤖 AI-Powered Features**

#### **1. Intelligent Resume Parser** (`/src/lib/parse-resume-from-pdf/`)
- **PDF Text Extraction**: Advanced PDF parsing using PDF.js
- **Section Detection**: ML-based section identification (Education, Experience, Skills)
- **Feature Scoring System**: Sophisticated scoring algorithm for content relevance
- **Data Normalization**: Converts unstructured resume data into structured format
- **Multi-language Support**: Handles various resume formats and languages

#### **2. AI Template Generator** (`/src/app/api/AI/TemplateGenerator/`)
- **Google GenAI Integration**: Leverages Google's Generative AI for template creation
- **Category-based Generation**: Supports multiple template categories (Portfolio, Landing, Dashboard)
- **Custom Prompt Processing**: Understands user requirements and generates appropriate designs
- **Template Structure Validation**: Ensures generated templates follow proper HTML/CSS structure
- **Real-time Generation**: Fast AI processing with immediate preview

#### **3. Smart Form Auto-fill** (`/src/app/api/AI/Parser/`)
- **Resume Data Extraction**: Automatically extracts data from uploaded resumes
- **Form Field Mapping**: Maps extracted data to appropriate form fields
- **Data Validation**: Validates and cleans extracted information
- **Manual Override**: Allows users to review and modify auto-filled data

### **🔐 Authentication & Security Architecture**

#### **NextAuth.js Configuration** (`/src/lib/server/auth.js`)
```javascript
Providers:
├── GitHub OAuth (Primary)
│   ├── Scope: read:user, user:email, repo, workflow, delete_repo
│   ├── Repository Creation Permissions
│   └── GitHub Pages Deployment Access
└── Credentials Provider (Secondary)
    ├── Email/Password Authentication
    ├── bcrypt Password Hashing
    └── MongoDB User Storage
```

#### **Session Management**
- **MongoDB Adapter**: Persistent session storage
- **JWT Tokens**: Secure token-based authentication
- **Access Control**: Role-based access to protected routes
- **API Security**: Authenticated API endpoints with session validation

### **📊 Data Management & Storage**

#### **MongoDB Database Schema**
```javascript
Collections:
├── users
│   ├── Authentication data (email, password, OAuth tokens)
│   ├── Profile information (name, image, provider)
│   └── Account verification status
├── portfolios
│   ├── Portfolio metadata (name, template, deployment URL)
│   ├── User form data (skills, experience, projects)
│   └── GitHub repository information
├── templates
│   ├── HTML/CSS template code
│   ├── Template metadata (name, category, preview image)
│   └── Form field configuration
└── assets
    ├── File metadata (name, type, upload date)
    ├── Cloudinary storage references
    └── User association and access control
```

#### **State Management with Redux Toolkit**
```javascript
Store Slices:
├── User Slice (/src/store/slices/User.js)
│   ├── Authentication state
│   ├── Profile information
│   └── Session management
├── Portfolio Slice (/src/store/slices/Portfolios.js)
│   ├── Portfolio CRUD operations
│   ├── Deployment status tracking
│   └── Form data persistence
├── Template Slice (/src/store/slices/Templates.js)
│   ├── Template selection and loading
│   ├── AI-generated template storage
│   └── Custom template management
└── Asset Slice (/src/store/slices/Assets.js)
    ├── File upload management
    ├── Asset search and filtering
    └── Cloudinary integration
```

### **🌐 Deployment & GitHub Integration**

#### **GitHub API Integration** (`/src/app/api/user/createRepo/`, `/src/app/api/user/deployToGithubPages/`)
```javascript
GitHub Operations:
├── Repository Creation
│   ├── Automatic repo generation with portfolio code
│   ├── Initial commit with HTML/CSS/JS files
│   └── Repository configuration and settings
├── GitHub Pages Deployment
│   ├── Automatic GitHub Actions workflow setup
│   ├── Live deployment to username.github.io/repo-name
│   └── Custom domain configuration support
└── Version Control
    ├── Commit tracking for portfolio updates
    ├── Branch management for different versions
    └── Rollback capabilities
```

#### **Deployment Workflow**
1. **Portfolio Generation**: HTML/CSS generation from template + user data
2. **Repository Creation**: New GitHub repo with generated code
3. **Initial Commit**: Push portfolio files to repository
4. **GitHub Pages Setup**: Enable Pages with automatic deployment
5. **Live URL Generation**: Provide shareable portfolio link
6. **Update Mechanism**: Handle portfolio updates with new commits

### **🎨 Advanced UI/UX Features**

#### **Real-time Portfolio Builder** (`/src/components/other/Preview.jsx`)
- **Live Preview**: Instant rendering of portfolio changes
- **Split-screen Interface**: Form editing alongside live preview
- **Responsive Preview**: Mobile/tablet/desktop preview modes
- **Auto-save**: Automatic saving of form progress
- **Undo/Redo**: Change history and reversal capabilities

#### **Asset Management System** (`/src/app/user/assets/`)
- **Drag & Drop Upload**: Intuitive file upload interface
- **File Type Validation**: Support for PDFs, images, and documents
- **Cloud Storage**: Secure Cloudinary integration
- **Search & Filter**: Advanced asset search capabilities
- **Batch Operations**: Multiple file management

#### **Template Customization Engine**
- **Dynamic Form Generation**: Creates forms based on template structure
- **Field Type Detection**: Automatically determines input types
- **Validation Rules**: Built-in form validation and error handling
- **Custom Field Support**: Extensible field types for advanced templates

### **🔧 Advanced Technical Features**

#### **PDF Processing Engine** (`/src/lib/parse-resume-from-pdf/`)
```javascript
Processing Pipeline:
├── PDF Text Extraction (read-pdf.js)
├── Text Item Grouping (group-text-items-into-lines.ts)
├── Section Detection (group-lines-into-sections.ts)
├── Content Extraction
│   ├── Profile Information (extract-profile.ts)
│   ├── Work Experience (extract-work-experience.ts)
│   ├── Education (extract-education.ts)
│   ├── Skills (extract-skills.ts)
│   └── Projects (extract-project.ts)
└── Data Normalization & Output
```

#### **Template Processing System** (`/src/helper/normalToBackticks.js`)
- **Variable Interpolation**: Dynamic content insertion using template literals
- **Conditional Rendering**: Show/hide sections based on user data
- **Loop Processing**: Generate repeating elements (skills, experiences)
- **Escape Handling**: Secure content rendering with XSS prevention

#### **Performance Optimizations**
- **Next.js 15 with Turbopack**: Ultra-fast development builds
- **Image Optimization**: Automatic image compression and WebP conversion
- **Code Splitting**: Lazy loading of components and routes
- **Caching Strategies**: Redis-like caching for API responses
- **Bundle Analysis**: Optimized webpack bundles for production

### **📱 Responsive Design System**

#### **TailwindCSS Configuration** (`/tailwind.config.js`)
```javascript
Custom Design System:
├── Color Palette
│   ├── Primary: #F7F7F9 (Light backgrounds)
│   ├── Secondary: #EDEDF3 (Subtle backgrounds)
│   ├── Accent: #C8BBF0 (Purple highlights)
│   ├── Warning: #EAFD75 (Yellow accents)
│   └── Text: #8934e4 (Purple text)
├── Typography Scale
│   ├── Multiple font families (Lato, Roboto, Montserrat, etc.)
│   ├── Responsive font sizes
│   └── Line height optimization
├── Spacing System
│   ├── Consistent margin/padding scale
│   ├── Layout grid system
│   └── Responsive breakpoints
└── Shadow System
    ├── Soft shadows for cards
    ├── Medium shadows for modals
    └── Hard shadows for emphasis
```

#### **Responsive Breakpoints**
- **Mobile-first Approach**: Base styles for mobile devices
- **Tablet Optimization**: md: breakpoint for tablet layouts
- **Desktop Enhancement**: lg: and xl: for desktop experiences
- **Ultra-wide Support**: 2xl: for large monitors

### **Detailed Project Structure**
```
opus-forge/
├── 📁 public/                                    # Static assets and public files
│   ├── 📁 assets/                               # UI assets and brand elements
│   │   ├── add-pdf.svg                          # PDF upload icon
│   │   ├── dots.svg                             # Decorative dots pattern
│   │   ├── feature-*.svg                        # Feature highlight icons
│   │   ├── heart.svg                            # Heart icon
│   │   ├── logo-*.svg                           # Partner/company logos
│   │   └── testimonial-*.jpg                    # User testimonial images
│   ├── 📁 fonts/                                # Custom font files
│   │   ├── Caladea-{Bold,Regular}.ttf          # Caladea font family
│   │   ├── Lato-{Bold,Regular}.ttf             # Lato font family
│   │   ├── Lora-{Bold,Regular}.ttf             # Lora font family
│   │   ├── Merriweather-{Bold,Regular}.ttf     # Merriweather font family
│   │   ├── Montserrat-{Bold,Regular}.ttf       # Montserrat font family
│   │   ├── NotoSansSC-{Bold,Regular}.ttf       # Chinese font support
│   │   ├── OpenSans-{Bold,Regular}.ttf         # Open Sans font family
│   │   ├── PlayfairDisplay-{Bold,Regular}.ttf  # Playfair Display font
│   │   ├── Raleway-{Bold,Regular}.ttf          # Raleway font family
│   │   ├── Roboto-{Bold,Regular}.ttf           # Roboto font family
│   │   ├── RobotoSlab-{Bold,Regular}.ttf       # Roboto Slab font
│   │   ├── fonts.css                           # Font face declarations
│   │   ├── fonts-zh.css                        # Chinese font declarations
│   │   └── OFL.txt                             # Open Font License
│   ├── 📁 resume-example/                       # Sample resume files
│   │   ├── laverne-resume.pdf                  # Example resume template
│   │   └── openresume-resume.pdf               # OpenResume example
│   ├── favicon.ico                             # Browser favicon
│   ├── file.svg, globe.svg, next.svg          # UI icons
│   ├── SignupStranded.{lottie,mov,webm}       # Signup animation files
│   ├── robots.txt                              # SEO robots configuration
│   └── vercel.svg, window.svg                  # Additional UI icons
│
├── 📁 src/                                       # Source code directory
│   ├── 📁 app/                                  # Next.js 13+ App Router
│   │   ├── 📁 api/                             # API route handlers
│   │   │   ├── 📁 AI/                          # AI-powered features
│   │   │   │   ├── 📁 Parser/                  # Resume parsing AI
│   │   │   │   │   └── route.js                # PDF resume parser endpoint
│   │   │   │   ├── 📁 TemplateGenerator/       # AI template generation
│   │   │   │   │   └── route.js                # Template generation endpoint
│   │   │   │   └── 📁 updateTemplate/          # Template update AI
│   │   │   │       └── route.js                # Template update endpoint
│   │   │   ├── 📁 assets/                      # Asset management APIs
│   │   │   │   ├── 📁 fetch/                   # Asset retrieval
│   │   │   │   │   └── route.js                # Get user assets endpoint
│   │   │   │   └── 📁 upload/                  # Asset upload
│   │   │   │       └── route.js                # File upload endpoint
│   │   │   ├── 📁 auth/                        # Authentication APIs
│   │   │   │   ├── 📁 [...nextauth]/           # NextAuth.js configuration
│   │   │   │   │   └── route.js                # OAuth & credentials handler
│   │   │   │   ├── 📁 login/                   # Login endpoint (empty)
│   │   │   │   └── 📁 loginStatus/             # Session status check
│   │   │   │       └── route.js                # Login status endpoint
│   │   │   ├── 📁 contact/                     # Contact form
│   │   │   │   └── route.js                    # Contact form handler
│   │   │   ├── 📁 feedback/                    # User feedback
│   │   │   │   └── route.js                    # Feedback submission
│   │   │   └── 📁 user/                        # User-specific APIs
│   │   │       ├── 📁 commitToRepo/            # Git operations
│   │   │       │   └── route.js                # Commit to GitHub repo
│   │   │       ├── 📁 completeProfile/         # Profile completion
│   │   │       │   └── route.js                # Complete user profile
│   │   │       ├── 📁 createRepo/              # Repository creation
│   │   │       │   └── route.js                # Create GitHub repository
│   │   │       ├── 📁 deployToGithubPages/     # Deployment
│   │   │       │   └── route.js                # Deploy to GitHub Pages
│   │   │       ├── 📁 portfolio/               # Portfolio management
│   │   │       │   └── route.js                # CRUD operations for portfolios
│   │   │       └── 📁 templates/               # Template management
│   │   │           └── route.js                # Template CRUD operations
│   │   ├── 📁 about/                           # About page
│   │   │   └── page.jsx                        # Company/project information
│   │   ├── 📁 contact/                         # Contact page
│   │   │   └── page.jsx                        # Contact form page
│   │   ├── 📁 demo/                            # Demo functionality
│   │   │   └── page.jsx                        # Live demo page
│   │   ├── 📁 features/                        # Features showcase
│   │   │   └── page.jsx                        # Feature listing page
│   │   ├── 📁 privacy/                         # Privacy policy
│   │   │   └── page.jsx                        # Privacy policy page
│   │   ├── 📁 signin/                          # Authentication
│   │   │   └── page.jsx                        # Login/signup page
│   │   ├── 📁 terms/                           # Terms of service
│   │   │   └── page.jsx                        # Terms and conditions
│   │   ├── 📁 user/                            # User dashboard area
│   │   │   ├── 📁 assets/                      # Asset management
│   │   │   │   └── page.jsx                    # User assets dashboard
│   │   │   ├── 📁 profile/                     # Profile management
│   │   │   │   ├── 📁 completeProfile/         # Profile completion
│   │   │   │   │   └── page.jsx                # Complete profile form
│   │   │   │   ├── 📁 edit/                    # Profile editing
│   │   │   │   │   └── page.jsx                # Edit profile page
│   │   │   │   └── page.jsx                    # View profile page
│   │   │   ├── 📁 templates/                   # Template management
│   │   │   │   ├── 📁 addTemplate/             # Add custom template
│   │   │   │   │   └── page.jsx                # Template creation form
│   │   │   │   ├── 📁 aiTemplate/              # AI template generation
│   │   │   │   │   └── page.jsx                # AI template generator
│   │   │   │   ├── 📁 viewTemplate/            # Template preview
│   │   │   │   │   └── page.jsx                # Template viewer/editor
│   │   │   │   └── page.jsx                    # Template selection page
│   │   │   ├── layout.jsx                      # User area layout
│   │   │   └── page.jsx                        # User dashboard home
│   │   ├── globals.css                         # Global CSS styles
│   │   ├── layout.jsx                          # Root application layout
│   │   └── page.jsx                            # Homepage
│   │
│   ├── 📁 assets/                               # Local asset files
│   │   ├── add-pdf.svg                         # PDF upload icon
│   │   ├── bg6.png, cf.webp                    # Background images
│   │   ├── docs.avif, docs1.png                # Documentation images
│   │   ├── ferrari-sf90-xx-3840x2160-13169.jpeg # Demo image
│   │   ├── gfg.png, github.png, leetcode.png   # Platform logos
│   │   ├── hero1.png, tempHero1.png, tempHero2.png # Hero section images
│   │   ├── logo1.png                           # Application logo
│   │   ├── pattern3.webp                       # Background pattern
│   │   ├── pdfPlaceholder.png, placeholder.jpg # Placeholder images
│   │   ├── profileBg5.jpg, profileBg9.jpg      # Profile backgrounds
│   │   ├── sw.png                              # Social media icon
│   │   └── temp1.png, temp2.png, temp3.png, temp4.png # Template previews
│   │
│   ├── 📁 components/                           # Reusable React components
│   │   ├── 📁 AI/                              # AI-related components
│   │   │   └── Root.jsx                        # AI feature root component
│   │   ├── 📁 cards/                           # Card components
│   │   │   ├── AssetOverviewCard.jsx           # Asset overview display
│   │   │   ├── HeroCard.jsx, HeroCard1.jsx, HeroCard2.jsx # Hero section cards
│   │   │   ├── ImageCard.jsx                   # Image display card
│   │   │   ├── LinkOverviewCard.jsx            # Link preview card
│   │   │   ├── PdfCard.jsx                     # PDF file card
│   │   │   ├── PortfolioOverview.jsx           # Portfolio summary card
│   │   │   ├── ProfileCard.jsx                 # User profile card
│   │   │   └── TemplateCard.jsx                # Template selection card
│   │   ├── 📁 documentation/                   # Documentation components
│   │   ├── 📁 forms/                           # Form components
│   │   │   ├── AddTemplate.jsx                 # Template addition form
│   │   │   ├── DeploymentForm.jsx              # Deployment configuration
│   │   │   ├── FeedbackModal.jsx               # Feedback submission modal
│   │   │   ├── FormSection.jsx                 # Form section wrapper
│   │   │   ├── LoginForm.jsx                   # User login form
│   │   │   └── SignupForm.jsx                  # User registration form
│   │   ├── 📁 inputs/                          # Input components
│   │   │   └── FormFieldInput.jsx              # Generic form input
│   │   ├── 📁 navbar/                          # Navigation components
│   │   │   ├── AuthenticatedDesktopNavbar.jsx  # Desktop nav (logged in)
│   │   │   ├── AuthenticatedMobileNavbar.jsx   # Mobile nav (logged in)
│   │   │   ├── DesktopNavbar.jsx               # Desktop nav (guest)
│   │   │   ├── MobileNavbar.jsx                # Mobile nav (guest)
│   │   │   ├── Navbar.jsx                      # Main navbar controller
│   │   │   └── NavLinkDiv.jsx                  # Navigation link component
│   │   ├── 📁 other/                           # Utility components
│   │   │   ├── Footer.jsx                      # Site footer
│   │   │   ├── Portfolio.jsx                   # Portfolio renderer
│   │   │   ├── Preview.jsx                     # Portfolio preview/builder
│   │   │   └── Testimonials.jsx                # User testimonials
│   │   ├── 📁 parser/                          # Resume parsing components
│   │   │   ├── Page.jsx                        # Parser main page
│   │   │   ├── ResumeDropzone.jsx              # File drop area
│   │   │   ├── ResumeParserAlgorithmArticle.jsx # Parser documentation
│   │   │   └── ResumeTable.tsx                 # Parsed data table
│   │   ├── 📁 template/                        # Template components
│   │   │   └── Welcome.jsx                     # Welcome/onboarding
│   │   ├── 📁 ui/                              # UI primitive components
│   │   │   ├── AssetSearchBar.jsx              # Asset search interface
│   │   │   ├── Avatar.jsx                      # User avatar component
│   │   │   ├── Badge.jsx                       # Status badge component
│   │   │   ├── Button.jsx                      # Button component
│   │   │   ├── Card.jsx                        # Generic card component
│   │   │   ├── FeedbackButton.jsx              # Feedback trigger button
│   │   │   ├── FlexboxSpacer.tsx               # Layout spacer component
│   │   │   ├── Header.jsx                      # Page header component
│   │   │   ├── Hero1.jsx, Hero2.jsx, Hero3.jsx, Hero4.jsx # Hero sections
│   │   │   ├── Input.jsx                       # Input field component
│   │   │   └── PortfolioPreview.jsx            # Portfolio preview pane
│   │   └── 📁 user/                            # User-specific components (empty)
│   │
│   ├── 📁 helper/                               # Utility functions
│   │   ├── demoTemplate.js                     # Demo template generator
│   │   ├── normalToBackticks.js                # Template string processor
│   │   └── tableToString.js                    # Table data converter
│   │
│   ├── 📁 hooks/                                # Custom React hooks
│   │   ├── useAssets.js                        # Asset management hook
│   │   ├── useAssetSearch.js                   # Asset search functionality
│   │   ├── useAuth.js                          # Authentication hook
│   │   ├── useFormData.js                      # Form data management
│   │   ├── usePortfolioDeployment.js           # Deployment operations
│   │   ├── usePortfolios.js                    # Portfolio management
│   │   └── useTemplates.js                     # Template operations
│   │
│   ├── 📁 lib/                                  # Core libraries and utilities
│   │   ├── 📁 client/                          # Client-side utilities
│   │   │   ├── AuthMiddleware.js               # Authentication middleware
│   │   │   └── utils.js                        # Client utility functions
│   │   ├── 📁 hooks/                           # Advanced hooks
│   │   │   ├── useAutosizeTextareaHeight.tsx   # Auto-resize textarea
│   │   │   └── useTailwindBreakpoints.tsx      # Responsive breakpoints
│   │   ├── 📁 parse-resume-from-pdf/           # PDF parsing engine
│   │   │   ├── 📁 extract-resume-from-sections/ # Resume section extraction
│   │   │   │   ├── 📁 lib/                     # Parsing utilities
│   │   │   │   │   ├── bullet-points.ts        # Bullet point detection
│   │   │   │   │   ├── common-features.ts      # Feature extraction
│   │   │   │   │   ├── feature-scoring-system.ts # ML feature scoring
│   │   │   │   │   ├── get-section-lines.ts    # Section line parsing
│   │   │   │   │   └── subsections.ts          # Subsection detection
│   │   │   │   ├── extract-education.ts        # Education extraction
│   │   │   │   ├── extract-profile.ts          # Profile extraction
│   │   │   │   ├── extract-project.ts          # Project extraction
│   │   │   │   ├── extract-resume-from-sections.test.ts # Unit tests
│   │   │   │   ├── extract-skills.ts           # Skills extraction
│   │   │   │   ├── extract-work-experience.ts  # Experience extraction
│   │   │   │   └── index.ts                    # Main extraction module
│   │   │   ├── group-lines-into-sections.ts    # Section grouping
│   │   │   ├── group-text-items-into-lines.ts  # Line grouping
│   │   │   ├── index.js                        # PDF parser entry point
│   │   │   ├── read-pdf.js                     # PDF reading utilities
│   │   │   └── types.ts                        # TypeScript definitions
│   │   ├── 📁 redux/                           # Redux configuration (legacy)
│   │   │   ├── hooks.tsx                       # Redux hooks
│   │   │   ├── local-storage.ts                # Local storage utilities
│   │   │   ├── resumeSlice.ts                  # Resume state management
│   │   │   ├── settingsSlice.ts                # Settings state management
│   │   │   ├── store.ts                        # Redux store configuration
│   │   │   └── types.ts                        # Redux type definitions
│   │   ├── 📁 server/                          # Server-side utilities
│   │   │   ├── auth.js                         # Authentication configuration
│   │   │   └── mongodb.js                      # MongoDB connection
│   │   ├── 📁 __tests__/                       # Unit tests
│   │   │   ├── cx.test.ts                      # CSS utility tests
│   │   │   └── make-object-char-iterator.test.ts # Iterator tests
│   │   ├── constants.ts                        # Application constants
│   │   ├── cx.ts                               # CSS class utilities
│   │   ├── deep-clone.ts                       # Deep cloning utility
│   │   ├── deep-merge.ts                       # Deep merging utility
│   │   ├── get-px-per-rem.ts                   # CSS unit conversion
│   │   ├── make-object-char-iterator.ts        # Object iteration utility
│   │   └── seo-config.js                       # SEO configuration
│   │
│   ├── 📁 models/                               # MongoDB schemas/models
│   │   ├── Assets.js                           # Asset storage model
│   │   ├── Portfolios.js                       # Portfolio data model
│   │   ├── Templates.js                        # Template structure model
│   │   └── User.js                             # User account model
│   │
│   └── 📁 store/                                # Redux Toolkit store
│       ├── index.js                            # Store configuration
│       └── 📁 slices/                          # Redux slices
│           ├── Assets.js                       # Asset state management
│           ├── Portfolios.js                   # Portfolio state management
│           ├── SlightParsedData.js             # Parsed data state
│           ├── Templates.js                    # Template state management
│           └── User.js                         # User state management
│
├── 📁 confidential/                             # Private/sensitive files
│   └── secretAPI.png                           # API configuration screenshot
├── eslint.config.mjs                           # ESLint configuration
├── jsconfig.json                               # JavaScript project configuration
├── next.config.mjs                             # Next.js configuration
├── package.json                                # NPM dependencies and scripts
├── postcss.config.js, postcss.config.mjs      # PostCSS configuration
├── README.md                                   # Project documentation
└── tailwind.config.js                          # TailwindCSS configuration
```

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- GitHub OAuth App configured
- Cloudinary account (for asset storage)

### **Environment Variables**
Create a `.env.local` file in the root directory:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Cloudinary (for asset storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Nodemailer)
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

# AI Configuration
GOOGLE_GENAI_API_KEY=your_google_genai_key
```

### **Installation**
1. **Clone the repository**
   ```bash
   git clone https://github.com/Subhamk2004/OpusForge.git
   cd OpusForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ **Key Components & Features**

### **Authentication System**
- **GitHub OAuth**: Seamless login with GitHub account
- **Credentials Auth**: Traditional email/password authentication
- **Session Management**: Secure session handling with NextAuth.js
- **User Profiles**: Complete user data management

### **Portfolio Builder**
- **Template Selection**: Choose from pre-designed templates
- **Form Interface**: User-friendly forms for data input
- **Live Preview**: Real-time preview of portfolio changes
- **Asset Integration**: Upload and manage professional documents

### **AI Template Generator**
- **Category Selection**: Choose from various template categories
- **Custom Prompts**: Describe your vision for AI generation
- **Template Customization**: AI creates templates based on requirements
- **Instant Generation**: Fast AI processing for immediate results

### **Asset Management**
- **File Upload**: Support for resumes, certificates, cover letters
- **Cloud Storage**: Secure storage with Cloudinary integration
- **Search & Filter**: Quick access to stored documents
- **Version Control**: Track document versions and updates

### **Deployment System**
- **GitHub Integration**: Automatic repository creation
- **GitHub Pages**: Instant deployment to GitHub Pages
- **Custom URLs**: Generate shareable portfolio links
- **Live Updates**: Real-time portfolio updates and redeployment

## 📊 **Database Schema**

### **User Model**
```javascript
{
  email: String (unique, required),
  emailVerified: Boolean,
  password: String (hashed),
  name: String (required),
  provider: String (default: "credentials"),
  image: String,
  // Additional user fields...
}
```

### **Portfolio Model**
```javascript
{
  name: String,
  email: String,
  userData: Object,
  templateId: String,
  portfolioImage: String,
  deployedUrl: String,
  repoName: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Template Model**
```javascript
{
  name: String,
  description: String,
  htmlString: String,
  cssString: String,
  category: String,
  image: String,
  // Template configuration...
}
```

### **Asset Model**
```javascript
{
  userId: String,
  fileName: String,
  fileUrl: String,
  fileType: String,
  uploadDate: Date,
  cloudinaryId: String
}
```

## 🎯 **How It Works**

### **Portfolio Creation Workflow**
1. **Authentication**: Login with GitHub or email/password
2. **Template Selection**: Choose from available templates or generate AI template
3. **Data Input**: Fill forms with professional information
4. **Asset Upload**: Add resumes, certificates, and other documents
5. **Live Preview**: See real-time changes as you build
6. **Deployment**: Automatic GitHub repository creation and deployment
7. **Sharing**: Get instant shareable link for your portfolio

### **AI Template Generation**
1. **Category Selection**: Choose template type (portfolio, landing page, etc.)
2. **Prompt Input**: Describe your vision and requirements
3. **AI Processing**: Google GenAI creates custom template
4. **Review & Edit**: Preview generated template
5. **Integration**: Use AI template in portfolio builder

### **Asset Management Flow**
1. **Upload**: Secure file upload to Cloudinary
2. **Storage**: Organized storage with metadata
3. **Search**: Quick search and filter functionality
4. **Integration**: Easy insertion into portfolio forms
5. **Management**: Edit, delete, and organize assets

## 🔧 **Comprehensive API Documentation**

### **🤖 AI Services API**

#### **POST /api/AI/TemplateGenerator** - AI Template Generation
```javascript
Request Body:
{
  "prompt": "Create a modern portfolio template for a software developer with dark theme",
  "category": "portfolio", // portfolio, landing, dashboard, blog, ecommerce
  "imageUrl": "https://example.com/inspiration.jpg" // Optional
}

Response:
{
  "success": true,
  "template": {
    "name": "Modern Developer Portfolio",
    "description": "AI-generated template description",
    "htmlString": "<html>...</html>",
    "cssString": "/* Generated CSS */",
    "image": "generated_template_preview.jpg",
    "category": "portfolio",
    "formFields": ["name", "email", "skills", "experience"]
  }
}
```

#### **POST /api/AI/Parser** - Resume PDF Parser
```javascript
Request: FormData with PDF file

Response:
{
  "success": true,
  "extractedData": {
    "profile": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "location": "New York, NY",
      "summary": "Experienced software developer..."
    },
    "experience": [
      {
        "company": "Tech Corp",
        "position": "Senior Developer",
        "duration": "2020-2023",
        "description": "Led development of..."
      }
    ],
    "education": [...],
    "skills": ["JavaScript", "React", "Node.js"],
    "projects": [...]
  }
}
```

#### **POST /api/AI/updateTemplate** - Template Enhancement
```javascript
Request Body:
{
  "templateId": "template_123",
  "modifications": "Add a contact form section",
  "preserveData": true
}

Response:
{
  "success": true,
  "updatedTemplate": { /* Updated template object */ }
}
```

### **👤 User Management API**

#### **POST /api/user/createRepo** - GitHub Repository Creation
```javascript
Request Body:
{
  "repoName": "my-portfolio",
  "htmlContent": "<html>...</html>",
  "isPrivate": false
}

Response:
{
  "success": true,
  "repoName": "my-portfolio",
  "repoUrl": "https://github.com/username/my-portfolio",
  "isAlreadyCreated": false,
  "isDeployed": false
}
```

#### **POST /api/user/commitToRepo** - Code Commit
```javascript
Request Body:
{
  "repoName": "my-portfolio",
  "htmlContent": "<html>...</html>",
  "commitMessage": "Update portfolio content"
}

Response:
{
  "success": true,
  "commitSha": "abc123...",
  "repoName": "my-portfolio"
}
```

#### **POST /api/user/deployToGithubPages** - GitHub Pages Deployment
```javascript
Request Body:
{
  "repoName": "my-portfolio"
}

Response:
{
  "success": true,
  "deployedUrl": "https://username.github.io/my-portfolio",
  "deploymentStatus": "success"
}
```

#### **Portfolio Management** - `/api/user/portfolio`
```javascript
// GET - Retrieve user portfolios
Response:
[
  {
    "_id": "portfolio_123",
    "name": "My Portfolio",
    "email": "user@example.com",
    "userData": { /* Form data */ },
    "templateId": "template_456",
    "portfolioImage": "https://...",
    "deployedUrl": "https://username.github.io/portfolio",
    "repoName": "my-portfolio",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T00:00:00Z"
  }
]

// POST - Create new portfolio
Request Body:
{
  "name": "Portfolio Name",
  "email": "user@example.com",
  "userData": { /* Form data */ },
  "templateId": "template_456",
  "portfolioImage": "preview_image_url",
  "deployedUrl": "deployment_url",
  "repoName": "repository_name"
}

// PUT - Update existing portfolio
Request Body:
{
  "portfolioId": "portfolio_123",
  "userData": { /* Updated form data */ }
}

// DELETE - Delete portfolio
Request Body:
{
  "portfolioId": "portfolio_123",
  "formattedRepoName": "my-portfolio",
  "githubUsername": "username"
}
```

### **📁 Asset Management API**

#### **POST /api/assets/upload** - File Upload
```javascript
Request: FormData with files

Response:
{
  "success": true,
  "assets": [
    {
      "fileName": "resume.pdf",
      "fileUrl": "https://res.cloudinary.com/...",
      "fileType": "application/pdf",
      "cloudinaryId": "asset_123",
      "uploadDate": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### **GET /api/assets/fetch** - Retrieve User Assets
```javascript
Response:
[
  {
    "_id": "asset_123",
    "userId": "user_456",
    "fileName": "resume.pdf",
    "fileUrl": "https://res.cloudinary.com/...",
    "fileType": "application/pdf",
    "cloudinaryId": "cloudinary_123",
    "uploadDate": "2024-01-01T00:00:00Z"
  }
]
```

### **🔐 Authentication API**

#### **NextAuth Endpoints** - `/api/auth/[...nextauth]`
- **GET /api/auth/session** - Current session
- **POST /api/auth/signin** - Sign in
- **POST /api/auth/signout** - Sign out
- **GET /api/auth/providers** - Available providers
- **GET /api/auth/csrf** - CSRF token

#### **POST /api/auth/loginStatus** - Session Status
```javascript
Response:
{
  "isLoggedIn": true,
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://avatars.githubusercontent.com/...",
    "provider": "github"
  },
  "accessToken": "github_token_456"
}
```

### **📧 Communication API**

#### **POST /api/contact** - Contact Form
```javascript
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Portfolio Question",
  "message": "I need help with..."
}

Response:
{
  "success": true,
  "message": "Message sent successfully"
}
```

#### **POST /api/feedback** - User Feedback
```javascript
Request Body:
{
  "rating": 5,
  "feedback": "Great platform!",
  "feature": "template_generator", // Optional
  "userId": "user_123" // Optional
}

Response:
{
  "success": true,
  "message": "Feedback submitted successfully"
}
```

## 🧩 **Component Architecture**

### **🎨 UI Components Hierarchy**

#### **Layout Components**
```javascript
RootLayout (src/app/layout.jsx)
├── Navbar (src/components/navbar/Navbar.jsx)
│   ├── DesktopNavbar / AuthenticatedDesktopNavbar
│   ├── MobileNavbar / AuthenticatedMobileNavbar
│   └── NavLinkDiv
├── AuthMiddleware (src/lib/client/AuthMiddleware.js)
├── Main Content Area
└── Footer (src/components/other/Footer.jsx)
```

#### **Page Components**
```javascript
Homepage (src/app/page.jsx)
├── Hero1, Hero2, Hero3, Hero4 (src/components/ui/)
├── Testimonials (src/components/other/Testimonials.jsx)
└── Feature Sections

User Dashboard (src/app/user/page.jsx)
├── ProfileCard (src/components/cards/ProfileCard.jsx)
├── PortfolioOverview (src/components/cards/PortfolioOverview.jsx)
├── AssetOverviewCard (src/components/cards/AssetOverviewCard.jsx)
└── Quick Actions

Portfolio Builder (src/components/other/Preview.jsx)
├── Header (src/components/ui/Header.jsx)
├── FormSection (src/components/forms/FormSection.jsx)
│   └── FormFieldInput (src/components/inputs/FormFieldInput.jsx)
└── PortfolioPreview (src/components/ui/PortfolioPreview.jsx)
```

#### **Specialized Components**

**AI Template Generator** (`src/app/user/templates/aiTemplate/page.jsx`)
```javascript
AI Template Page
├── Category Selection Cards
├── Prompt Input Interface
├── Image URL Input (Optional)
├── Generation Progress Indicator
├── Template Preview
└── Integration with Portfolio Builder
```

**Resume Parser** (`src/components/parser/`)
```javascript
Parser Interface
├── ResumeDropzone.jsx (File Upload)
├── Processing Indicator
├── ResumeTable.tsx (Extracted Data Display)
├── Data Review Interface
└── Form Auto-fill Integration
```

**Asset Management** (`src/app/user/assets/page.jsx`)
```javascript
Asset Dashboard
├── AssetSearchBar (src/components/ui/AssetSearchBar.jsx)
├── Upload Interface
├── Asset Grid
│   ├── PdfCard (src/components/cards/PdfCard.jsx)
│   ├── ImageCard (src/components/cards/ImageCard.jsx)
│   └── Generic File Cards
└── Asset Actions (View, Download, Delete)
```

### **🎣 Custom Hooks Architecture**

#### **Data Management Hooks**
```javascript
useFormData (src/hooks/useFormData.js)
├── Form state management
├── Validation rules
├── Auto-save functionality
├── AI data integration
└── Field type detection

usePortfolioDeployment (src/hooks/usePortfolioDeployment.js)
├── GitHub repository operations
├── Deployment workflow management
├── Progress tracking
├── Error handling
└── Success notifications

useAssetSearch (src/hooks/useAssetSearch.js)
├── Search functionality
├── Filter operations
├── Sort capabilities
├── Pagination
└── Real-time updates
```

#### **Authentication Hooks**
```javascript
useAuth (src/hooks/useAuth.js)
├── Session management
├── Login/logout operations
├── User profile data
├── Permission checking
└── Redirect handling
```

#### **Template Management Hooks**
```javascript
useTemplates (src/hooks/useTemplates.js)
├── Template loading
├── AI generation interface
├── Custom template creation
├── Template validation
└── Preview generation
```

### **🔄 State Management Flow**

#### **Redux Store Structure**
```javascript
Root State
├── user: UserSlice
│   ├── authentication: { isAuthenticated, user, session }
│   ├── profile: { name, email, image, provider }
│   └── preferences: { theme, language, notifications }
├── portfolios: PortfolioSlice
│   ├── list: Portfolio[]
│   ├── current: Portfolio | null
│   ├── loading: boolean
│   └── deployment: { status, progress, error }
├── templates: TemplateSlice
│   ├── available: Template[]
│   ├── aiGenerated: Template[]
│   ├── selected: Template | null
│   └── formFields: FormField[]
└── assets: AssetSlice
    ├── files: Asset[]
    ├── search: { query, filters, results }
    ├── upload: { progress, queue, errors }
    └── selected: Asset[]
```

#### **Action Flow Examples**
```javascript
Portfolio Creation Flow:
1. User selects template → UPDATE_SELECTED_TEMPLATE
2. Form data entered → UPDATE_FORM_DATA
3. Assets uploaded → ADD_ASSETS
4. Build triggered → START_DEPLOYMENT
5. Repository created → UPDATE_DEPLOYMENT_STATUS
6. Pages deployed → DEPLOYMENT_SUCCESS
7. Portfolio saved → ADD_PORTFOLIO

AI Template Generation Flow:
1. Category selected → SET_AI_CATEGORY
2. Prompt entered → SET_AI_PROMPT
3. Generation started → START_AI_GENERATION
4. Template received → ADD_AI_TEMPLATE
5. Template selected → SET_SELECTED_TEMPLATE
6. Integration complete → TEMPLATE_INTEGRATED
```

## 🎨 **Customization**

### **Styling**
The project uses TailwindCSS with custom color scheme:
```javascript
colors: {
  p: "#F7F7F9",           // Primary background
  s: "#EDEDF3",           // Secondary background
  purple: "#C8BBF0",      // Accent purple
  yellow: "#EAFD75",      // Accent yellow
  textPurple: "#8934e4",  // Purple text
  // ... more custom colors
}
```

### **Adding New Templates**
1. Create template HTML structure
2. Add to Templates collection in MongoDB
3. Include in template selection UI
4. Test with form data integration

### **Extending AI Features**
1. Modify AI prompts in `/api/AI/TemplateGenerator`
2. Add new template categories
3. Enhance AI processing logic
4. Update UI components for new features

## 🧪 **Development Scripts**

```json
{
  "dev": "next dev --turbopack",    // Development with Turbopack
  "build": "next build",            // Production build
  "start": "next start",            // Start production server
  "lint": "next lint"               // Run ESLint
}
```

## 🔒 **Security Features**

- **Input Validation**: Comprehensive form validation
- **Authentication**: Secure OAuth and credentials authentication
- **Session Management**: Encrypted session handling
- **CORS Protection**: Proper CORS configuration
- **Data Sanitization**: Input sanitization for XSS prevention
- **Environment Security**: Secure environment variable handling

## 📱 **Responsive Design**

- **Mobile-First**: Mobile-first responsive design approach
- **Breakpoints**: Custom Tailwind breakpoints for all devices
- **Touch-Friendly**: Optimized for touch interactions
- **Performance**: Optimized loading for mobile networks

## 🚀 **Performance Optimizations**

- **Next.js 15**: Latest Next.js with App Router
- **Turbopack**: Fast development with Turbopack
- **Image Optimization**: Next.js Image component usage
- **Code Splitting**: Automatic code splitting for better performance
- **Caching**: Proper caching strategies for API routes
- **Bundle Analysis**: Optimized bundle sizes

## 🐛 **Troubleshooting**

### **Common Issues**

1. **MongoDB Connection Issues**
   ```bash
   # Check your MONGODB_URI in .env.local
   # Ensure MongoDB service is running
   ```

2. **GitHub OAuth Not Working**
   ```bash
   # Verify GitHub OAuth App settings
   # Check callback URL configuration
   ```

3. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

4. **Deployment Issues**
   ```bash
   # Check environment variables on production
   # Verify GitHub API permissions
   ```

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Contribution Guidelines**
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Support & Contact**

- **Email**: opusforge1978@gmail.com
- **Website**: [https://opus-forge.vercel.app/](https://opus-forge.vercel.app/)
- **GitHub Issues**: [Report bugs or request features](https://github.com/kbvkishore/OpusForge/issues)

## 🙏 **Acknowledgments**

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **MongoDB** for reliable database services
- **TailwindCSS** for beautiful styling utilities
- **Google GenAI** for AI capabilities
- **GitHub** for version control and hosting

---

**Built with ❤️ by [KBV Kishore](https://github.com/kbvkishore)**

*OpusForge - Where professionals craft their digital presence*


---

**Forged by [KBV Kishore]**

