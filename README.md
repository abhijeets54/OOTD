# OOTD - AI Fashion Stylist 👗✨

A comprehensive AI-powered fashion platform that analyzes outfits, generates style recommendations, and creates personalized fashion advice. Built with cutting-edge technologies including Google Gemini AI, Next.js 15, and modern UI components.

## 🌟 Core Features

### 🤖 Advanced AI Analysis
- **Outfit Image Analysis**: Upload photos and receive detailed AI feedback using Google Gemini Vision API
- **Style Scoring**: Get numerical style scores (1-10) with detailed improvement suggestions
- **Cultural Considerations**: AI provides culturally-aware fashion advice and recommendations
- **Color Palette Analysis**: Identify and analyze color coordination, harmony, and contrast
- **Occasion-Based Recommendations**: Tailored suggestions for work, casual, formal, and special events
- **Time-Sensitive Advice**: Morning, afternoon, evening, and night-specific styling tips

### 🎨 AI Image Generation
- **Multiple AI Services**: Integrated with Hugging Face and Pollinations.ai for outfit visualization
- **Automatic Fallback System**: If one service fails, automatically tries the next available service
- **Fashion-Specific Prompts**: Enhanced prompts optimized for fashion and outfit generation
- **Headwear Integration**: Includes hats, caps, and other headwear in generated outfits
- **High-Quality Output**: 512x768 resolution images optimized for fashion photography

### 👤 User Management & Authentication
- **Secure Authentication**: Powered by Clerk with email, social login (Google, GitHub, etc.)
- **Protected Routes**: Middleware-based route protection for secure access
- **User Profiles**: Comprehensive profile management with style preferences
- **Preference Learning**: System learns from user interactions and ratings
- **Personal Style Tracking**: Track favorite outfits and style evolution over time

### 📸 Advanced Image Management
- **Cloudinary Integration**: Professional-grade image storage and optimization
- **Multiple Upload Methods**: Drag & drop, click to upload, or camera capture
- **Image Validation**: Automatic format validation (JPG, PNG, WebP)
- **Size Optimization**: Automatic compression and format conversion
- **Secure Storage**: Images stored with unique identifiers and access control

### 🎯 Interactive Features
- **Dynamic Questionnaires**: AI-generated questions based on user responses
- **Outfit Rating System**: 5-star rating system for user feedback
- **Favorites Management**: Save and organize favorite outfits
- **PDF Export**: Download outfit reports as professionally formatted PDFs
- **Social Sharing**: Share outfit analyses and recommendations

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: System-aware theme switching with manual toggle
- **Animated Loaders**: Fashion-themed loading animations with random selection
- **Gradient Backgrounds**: Animated 3D gradient effects throughout the interface
- **Smooth Transitions**: Framer Motion animations for enhanced user experience
- **Accessibility**: WCAG-compliant design with keyboard navigation support

### 📞 Contact & Support
- **Formspree Integration**: Contact forms on homepage and dedicated contact page
- **No External Redirects**: Forms submit without leaving the site
- **Professional Pages**: FAQ, Privacy Policy, Terms of Service pages
- **Email Integration**: Direct email contact (as9184635@gmail.com)

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15** - React framework with App Router and Server Components
- **React 19** - Latest React with concurrent features
- **TypeScript 5.2** - Type-safe development with strict mode
- **Tailwind CSS 3.3** - Utility-first CSS framework with custom animations
- **Shadcn/ui** - Modern, accessible UI component library
- **Framer Motion** - Advanced animations and transitions

### UI Components & Icons
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **React Hook Form** - Performant forms with validation
- **Sonner** - Modern toast notifications
- **Next Themes** - Theme management with system detection

### Backend & Database
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Row Level Security (RLS)** - Database-level security policies
- **UUID Primary Keys** - Secure, unique identifiers
- **JSONB Storage** - Flexible data storage for preferences and analysis
- **Automatic Timestamps** - Created/updated tracking

### AI & Machine Learning
- **Google Gemini 2.5 Flash** - Advanced multimodal AI for image and text analysis
- **LangChain** - AI application framework for complex workflows
- **Vision AI** - Image understanding and outfit analysis
- **Hugging Face API** - AI image generation with fashion models
- **Pollinations.ai** - Backup AI image generation service

### Authentication & Security
- **Clerk** - Complete authentication solution with social logins
- **Middleware Protection** - Route-level security with automatic redirects
- **JWT Integration** - Secure token-based authentication
- **Environment Variables** - Secure configuration management

### Cloud Services
- **Cloudinary** - Professional image storage, optimization, and transformation
- **Vercel** - Edge deployment with automatic scaling
- **Formspree** - Form handling without backend code

## 📱 Application Pages & Features

### 🏠 Homepage (`/`)
- **Hero Section**: Animated gradient background with call-to-action
- **Feature Showcase**: Interactive cards highlighting key features
- **AI Outfit Visualization**: Direct access to outfit generation
- **Contact Form**: Integrated Formspree contact form
- **Responsive Navigation**: Mobile-friendly navigation with dark mode toggle

### 🔐 Authentication Pages
- **Sign In** (`/sign-in`): Clerk-powered authentication with social logins
- **Sign Up** (`/sign-up`): User registration with email verification
- **Protected Routes**: Automatic redirects for unauthenticated users

### 👗 Core Fashion Features
- **Create Outfit** (`/create-outfit`): Upload images and get AI analysis
- **AI Generator** (`/ai-generator`): Generate outfit images using AI
- **My Outfits** (`/outfits`): Gallery of saved outfits with filtering
- **Outfit Details** (`/outfits/[id]`): Detailed view with edit capabilities
- **User Profile** (`/profile`): Manage preferences and account settings

### 📄 Information Pages
- **Contact** (`/contact`): Professional contact form with Formspree integration
- **FAQ** (`/faq`): Frequently asked questions about the platform
- **Privacy Policy** (`/privacy-policy`): Comprehensive privacy information
- **Terms of Service** (`/terms-of-service`): Legal terms and conditions

### 🔌 API Endpoints

#### Authentication & User Management
- `GET/POST /api/user` - User profile management
- `GET/POST /api/outfits` - Outfit CRUD operations
- `PUT/DELETE /api/outfits/[id]` - Individual outfit management

#### AI Services
- `POST /api/analyze-image` - Google Gemini image analysis
- `POST /api/generate-image-hf` - Hugging Face image generation
- `POST /api/generate-image-pollinations` - Pollinations.ai image generation
- `POST /api/generate` - Dynamic outfit questions generation

#### Utilities
- `POST /api/upload` - Cloudinary image upload
- `GET /api/test-db` - Database connectivity testing
- `GET /api/test-hf` - Hugging Face API testing

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **npm** or **yarn** package manager
- **Git** for version control
- **Modern browser** with JavaScript enabled

### 1. Clone & Install
```bash
git clone https://github.com/your-username/ootd.git
cd ootd
npm install
```

### 2. Environment Configuration
Create your environment file:
```bash
cp .env.example .env.local
```

Required environment variables:
```env
# Google Gemini AI
GOOGLE_API_KEY=your_google_api_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary Image Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# AI Image Generation
HUGGING_FACE_API_KEY=your_hugging_face_api_key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup
Run the database schema in your Supabase SQL editor:
```bash
# Copy the contents of database/schema.sql to Supabase SQL Editor
```

### 4. Service Configuration
Follow the detailed setup guide in `SETUP_GUIDE.md` to configure:
- **Supabase**: Database and Row Level Security
- **Cloudinary**: Image storage and upload presets
- **Clerk**: Authentication and user management
- **Google Gemini API**: AI analysis capabilities
- **Hugging Face**: AI image generation

### 5. Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running!

## 📖 Documentation

- **[Setup Guide](SETUP_GUIDE.md)** - Comprehensive service configuration
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[Database Schema](database/schema.sql)** - Complete database structure
- **[Schema Check](database/schema-check.sql)** - Database validation and repair

## 🏗️ Project Architecture

```
OOTD/
├── app/                           # Next.js 15 App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/              # Clerk sign-in page
│   │   └── sign-up/              # Clerk sign-up page
│   ├── api/                      # API routes
│   │   ├── analyze-image/        # Gemini AI image analysis
│   │   ├── generate/             # Dynamic question generation
│   │   ├── generate-image-hf/    # Hugging Face image generation
│   │   ├── generate-image-pollinations/ # Pollinations.ai generation
│   │   ├── outfit-questions/     # Outfit questionnaire API
│   │   ├── outfits/              # Outfit CRUD operations
│   │   ├── upload/               # Cloudinary image upload
│   │   ├── user/                 # User management
│   │   ├── test-db/              # Database connectivity test
│   │   └── test-hf/              # Hugging Face API test
│   ├── ai-generator/             # AI outfit generation page
│   ├── contact/                  # Contact form page
│   ├── create-outfit/            # Outfit creation and analysis
│   ├── faq/                      # Frequently asked questions
│   ├── outfits/                  # Outfit gallery and management
│   │   ├── [id]/                 # Individual outfit details
│   │   └── page.tsx              # Outfit listing page
│   ├── privacy-policy/           # Privacy policy page
│   ├── profile/                  # User profile management
│   ├── terms-of-service/         # Terms of service page
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Homepage with hero and features
│   └── providers.tsx             # Context providers setup
├── components/                    # Reusable React components
│   ├── ui/                       # Shadcn/ui base components
│   │   ├── loader.tsx            # Fashion-themed loaders
│   │   ├── LoaderLink.tsx        # Navigation with loaders
│   │   └── [other-ui-components] # Complete UI component library
│   ├── providers/                # Context providers
│   │   └── NavigationLoaderProvider.tsx # Navigation state management
│   ├── ContactForm.tsx           # Formspree contact form
│   ├── DynamicQuestions.tsx      # AI-generated questionnaire
│   ├── Footer.tsx                # Site footer with links
│   ├── ImageUpload.tsx           # Advanced Cloudinary upload
│   ├── InitialQuestions.tsx      # User preference questions
│   ├── Navigation.tsx            # Main navigation with dark mode
│   ├── OutfitReport.tsx          # AI analysis display and PDF export
│   └── SimpleImageUpload.tsx     # Basic image upload component
├── database/                     # Database schemas and utilities
│   ├── schema.sql                # Complete Supabase schema
│   └── schema-check.sql          # Schema validation queries
├── hooks/                        # Custom React hooks
│   └── useNavigationLoader.ts    # Navigation loading states
├── lib/                          # Utility libraries and services
│   ├── cloudinary.ts             # Cloudinary configuration
│   ├── gemini-service.ts         # Google Gemini AI integration
│   ├── llama.ts                  # AI text generation utilities
│   ├── supabase.ts               # Supabase client and types
│   └── utils.ts                  # General utility functions
├── public/                       # Static assets
│   ├── hero.png                  # Homepage hero image
│   ├── grok.png                  # AI service branding
│   └── favicon.ico               # Site favicon
├── scripts/                      # Database utility scripts
│   ├── fix-style-scores.js       # Style score data migration
│   └── README.md                 # Scripts documentation
├── .env.local                    # Environment variables (gitignored)
├── .gitignore                    # Enhanced git ignore rules
├── middleware.ts                 # Clerk authentication middleware
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── DEPLOYMENT_GUIDE.md           # Production deployment guide
├── README.md                     # This comprehensive documentation
└── SETUP_GUIDE.md                # Development setup instructions
```

## 🔧 Available Scripts

```bash
# Development Commands
npm run dev          # Start development server with hot reload
npm run build        # Create optimized production build
npm run start        # Start production server
npm run lint         # Run ESLint for code quality

# Development Workflow
npm install          # Install all dependencies
npm run dev          # Start development (http://localhost:3000)
npm run build        # Test production build locally
npm run start        # Test production server locally

# Code Quality
npm run lint         # Check for linting errors
npm run lint --fix   # Auto-fix linting issues
npx tsc --noEmit     # TypeScript type checking
```

## 🧪 Testing & Validation

### Database Testing
```bash
# Test database connectivity (requires running dev server)
curl http://localhost:3000/api/test-db

# Test Hugging Face API
curl http://localhost:3000/api/test-hf
```

### Manual Testing Checklist
- [ ] **Authentication**: Sign up, sign in, sign out flows
- [ ] **Image Upload**: Cloudinary integration working
- [ ] **AI Analysis**: Gemini API analyzing images correctly
- [ ] **AI Generation**: Hugging Face and Pollinations.ai generating images
- [ ] **Database**: Outfits saving and retrieving properly
- [ ] **Navigation**: All pages accessible and responsive
- [ ] **Dark Mode**: Theme switching working correctly
- [ ] **Contact Forms**: Formspree integration functional

## 🌐 Production Deployment

### Vercel Deployment (Recommended)

**Why Vercel?**
- Optimized for Next.js applications
- Automatic deployments from Git
- Edge network for global performance
- Built-in analytics and monitoring
- Zero-configuration setup

**Deployment Steps:**
1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all required environment variables in Vercel dashboard
3. **Domain Configuration**: Set up custom domain (optional)
4. **Automatic Deployments**: Every push to main branch triggers deployment

**Pre-Deployment Checklist:**
- [ ] All environment variables configured
- [ ] Database schema deployed to Supabase
- [ ] Cloudinary upload presets created
- [ ] Clerk production instance configured
- [ ] Build process tested locally (`npm run build`)

### Alternative Deployment Options

**Docker Deployment:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Manual Server Deployment:**
```bash
# Build the application
npm run build

# Start production server
npm run start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "ootd" -- start
```

### Environment Configuration for Production

**Required Production Variables:**
```env
# Update these for production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Keep these the same as development
GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
HUGGING_FACE_API_KEY=your_hugging_face_api_key
```

## 🔒 Security & Privacy

### Authentication Security
- **Clerk Integration**: Enterprise-grade authentication with MFA support
- **JWT Tokens**: Secure, stateless authentication tokens
- **Route Protection**: Middleware-based route protection
- **Session Management**: Automatic session handling and refresh

### Database Security
- **Row Level Security (RLS)**: Supabase policies ensure users only access their data
- **UUID Primary Keys**: Non-sequential, secure identifiers
- **Prepared Statements**: Protection against SQL injection
- **Environment Isolation**: Separate development and production databases

### API Security
- **Protected Endpoints**: Authentication required for sensitive operations
- **Rate Limiting**: Built-in protection against abuse
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error responses without data leakage

### Image Security
- **Upload Validation**: File type and size restrictions
- **Cloudinary Security**: Professional-grade image storage
- **Access Control**: Secure image URLs with access policies
- **Content Moderation**: Automatic content filtering capabilities

### Data Privacy
- **GDPR Compliance**: User data handling follows GDPR guidelines
- **Data Minimization**: Only necessary data is collected and stored
- **User Control**: Users can delete their data and accounts
- **Transparent Policies**: Clear privacy policy and terms of service

## 💰 Cost-Effective Architecture

All services offer generous free tiers suitable for development and small-scale production:

### Service Limits & Pricing
- **Supabase Free Tier**:
  - 500MB database storage
  - 1GB file storage
  - 50MB database size
  - 2 million edge function invocations

- **Cloudinary Free Tier**:
  - 25GB storage
  - 25GB monthly bandwidth
  - 25,000 transformations/month
  - Advanced features included

- **Google Gemini API**:
  - 15 requests per minute
  - 1,500 requests per day
  - Free tier includes vision capabilities

- **Clerk Free Tier**:
  - 10,000 monthly active users
  - Social logins included
  - Basic authentication features

- **Vercel Free Tier**:
  - Unlimited personal projects
  - 100GB bandwidth/month
  - Automatic HTTPS and CDN

- **Hugging Face API**:
  - 1,000 requests/month free
  - Additional usage at competitive rates

### Scaling Considerations
- **Gradual Scaling**: All services offer pay-as-you-grow pricing
- **Performance Monitoring**: Built-in analytics to track usage
- **Cost Optimization**: Efficient caching and optimization strategies
- **Alternative Services**: Fallback options for critical features

## 🚀 Performance & Optimization

### Frontend Optimization
- **Next.js 15 Features**: App Router, Server Components, and Streaming
- **Image Optimization**: Automatic WebP conversion and responsive images
- **Code Splitting**: Automatic route-based and component-based splitting
- **Caching Strategy**: Aggressive caching with revalidation
- **Bundle Analysis**: Optimized bundle size with tree shaking

### Backend Optimization
- **Edge Functions**: Supabase Edge Functions for low latency
- **Database Indexing**: Optimized queries with proper indexing
- **Connection Pooling**: Efficient database connection management
- **API Response Caching**: Strategic caching for frequently accessed data

### User Experience
- **Loading States**: Fashion-themed loaders for better perceived performance
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Offline Support**: Service worker for basic offline functionality
- **Accessibility**: WCAG 2.1 AA compliance with screen reader support

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Development Setup
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/ootd.git
   cd ootd
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment** following the Quick Start guide
5. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

### Contribution Guidelines
- **Code Style**: Follow the existing TypeScript and React patterns
- **Testing**: Ensure all features work as expected
- **Documentation**: Update README and comments for new features
- **Commit Messages**: Use clear, descriptive commit messages
- **Pull Requests**: Provide detailed description of changes

### Areas for Contribution
- 🎨 **UI/UX Improvements**: Enhanced animations and user experience
- 🤖 **AI Features**: New AI models and analysis capabilities
- 🔧 **Performance**: Optimization and caching improvements
- 📱 **Mobile**: Enhanced mobile experience and PWA features
- 🌐 **Internationalization**: Multi-language support
- 🧪 **Testing**: Unit tests and integration tests

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ **Commercial Use**: Use in commercial projects
- ✅ **Modification**: Modify and adapt the code
- ✅ **Distribution**: Share and distribute the code
- ✅ **Private Use**: Use for personal projects
- ❗ **Attribution**: Include the original license and copyright notice

## 🙏 Acknowledgments & Credits

### AI & Machine Learning
- **[Google Gemini](https://ai.google.dev/)** - Advanced multimodal AI capabilities
- **[Hugging Face](https://huggingface.co/)** - AI model hosting and inference
- **[Pollinations.ai](https://pollinations.ai/)** - Creative AI image generation
- **[LangChain](https://langchain.com/)** - AI application framework

### Infrastructure & Services
- **[Supabase](https://supabase.com/)** - Open source Firebase alternative
- **[Cloudinary](https://cloudinary.com/)** - Media management platform
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform
- **[Formspree](https://formspree.io/)** - Form handling service

### Frontend Technologies
- **[Next.js](https://nextjs.org/)** - React framework for production
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible components
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide](https://lucide.dev/)** - Beautiful icon library

### Development Tools
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms

## 📞 Support & Community

### Get Help
- 📧 **Email**: as9184635@gmail.com
- 📖 **Documentation**: Comprehensive guides in this repository
- 🐛 **Issues**: Report bugs on GitHub Issues
- 💡 **Feature Requests**: Suggest improvements via GitHub Discussions

### Stay Updated
- ⭐ **Star the repository** to stay updated with new releases
- 👀 **Watch the repository** for notifications
- 🔄 **Follow the project** for updates and announcements

### Community Guidelines
- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Contribute positively to discussions

---

## 🎯 Project Status

**Current Version**: 1.0.0
**Status**: ✅ Production Ready
**Last Updated**: July 9, 2025
**Tested**: ✅ All core features verified

### Recent Updates
- ✅ Fixed Next.js build hanging issues
- ✅ Enhanced AI image generation with fallback systems
- ✅ Improved responsive design and dark mode
- ✅ Added comprehensive testing and deployment guides
- ✅ Optimized performance and security features

### Roadmap
- 🔄 **Mobile App**: React Native version
- 🔄 **Advanced AI**: More sophisticated style analysis
- 🔄 **Social Features**: Outfit sharing and community
- 🔄 **E-commerce**: Integration with fashion retailers
- 🔄 **AR/VR**: Virtual try-on capabilities

---

**Built with ❤️ by fashion enthusiasts and AI developers**
**Powered by cutting-edge AI and modern web technologies**
