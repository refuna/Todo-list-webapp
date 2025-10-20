# TaskFlow - Todo List Web App

A modern todo list application built with Next.js, Supabase, and Tailwind CSS.

## Features

- ✅ **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔐 **Authentication**: Secure user authentication with Supabase
- 📱 **Responsive**: Works perfectly on desktop and mobile
- 🎨 **Dark Mode**: Built-in dark/light theme support
- ⚡ **Fast**: Built with Next.js App Router for optimal performance
- 🗄️ **Database**: Powered by Supabase for real-time data

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Real-time)
- **Deployment**: Vercel-ready

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/refuna/Todo-list-webapp.git
   cd Todo-list-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   Run the SQL script in `setup-database.sql` in your Supabase SQL editor.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── protected/         # Protected routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
├── lib/                   # Utility functions
│   └── supabase/         # Supabase configuration
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
