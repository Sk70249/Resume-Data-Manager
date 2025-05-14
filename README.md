# Resume Handler

A modern web application for managing and organizing your resume content with a beautiful dark-themed interface.

![Resume Handler Screenshot](https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=600&fit=crop)

## Features

- 🌙 Beautiful dark theme interface
- 📝 Organize resume content in groups
- 📋 Quick copy functionality for each entry
- 🔒 Secure authentication with:
  - Google login
  - Microsoft login
  - Guest access
- 💾 Data persistence with Supabase
- 📱 Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/resume-handler.git
   cd resume-handler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Usage

1. **Authentication**: Sign in using:
   - Google account
   - Microsoft account
   - Guest access (no account required)

2. **Managing Groups**:
   - Create groups to organize your resume content
   - Switch between groups to view specific entries
   - View all entries across groups

3. **Adding Entries**:
   - Enter your resume content in the input field
   - Click "Add" or press Enter to save
   - Entries are automatically saved to your selected group

4. **Copying Content**:
   - Click the copy icon next to any entry
   - Content is copied to your clipboard instantly

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Supabase
- Vite
- Lucide Icons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.