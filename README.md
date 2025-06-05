# MangaBox 📚

A modern, responsive manga reader application built with Next.js 14, TypeScript, and Tailwind CSS. Discover and read your favorite manga across multiple categories with a beautiful, user-friendly interface.

## ✨ Features

- **Multi-Category Browsing**: Explore manga across different categories and genres
- **Advanced Search**: Enhanced search functionality with filters and sorting options
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Chapter Reader**: Full-featured manga reader with:
  - Keyboard navigation (Arrow keys, Spacebar)
  - Page-by-page reading experience
  - Loading states and error handling
  - Navigation between chapters
- **Modern UI/UX**: 
  - Dark theme with gradient accents
  - Smooth animations and transitions
  - Responsive grid layouts
  - Skeleton loading states
- **MangaDex Integration**: Powered by the MangaDex API for extensive manga content
- **Image Optimization**: Proxy-based image loading for better performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd manga-reader
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[MangaDex API](https://api.mangadex.org/)** - Manga content and metadata

## 📁 Project Structure

```
manga-reader/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── browse/            # Browse pages
│   ├── category/          # Category pages
│   ├── manga/             # Individual manga pages
│   ├── search/            # Search functionality
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── chapter-reader.tsx # Chapter reading component
│   ├── manga-grid.tsx    # Manga grid layout
│   ├── search-bar.tsx    # Search functionality
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/               # Global styles
└── public/               # Static assets
```

## 🎨 Key Components

### Chapter Reader
- **Enhanced Chapter Reader**: Full-screen reading experience with keyboard navigation
- **Image Proxy**: Optimized image loading through custom API routes
- **Navigation**: Seamless chapter-to-chapter navigation

### Search & Discovery
- **Enhanced Search Bar**: Real-time search with advanced filtering
- **Multi-Category Grid**: Browse manga by different categories
- **Manga Filters**: Sort and filter manga by various criteria

### UI Components
- **Responsive Manga Cards**: Optimized manga cover display
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Graceful error states throughout the app

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🌟 Features in Detail

### Reading Experience
- **Keyboard Navigation**: Use arrow keys or spacebar to navigate pages
- **Mobile Optimized**: Touch-friendly navigation for mobile devices
- **Page Counter**: Track reading progress with page indicators
- **Error Recovery**: Retry functionality for failed image loads

### Search & Filter
- **Real-time Search**: Instant search results as you type
- **Category Filtering**: Browse by genre, status, and more
- **Sorting Options**: Sort by popularity, rating, latest updates

### Performance
- **Image Optimization**: Lazy loading and optimized image delivery
- **Responsive Design**: Fluid layouts that work on all screen sizes
- **Fast Navigation**: Client-side routing for instant page transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational purposes. Please respect the MangaDex API terms of service and manga publishers' rights.

---

**Note**: This application uses the MangaDex API. Please ensure you comply with their terms of service and rate limiting guidelines. 