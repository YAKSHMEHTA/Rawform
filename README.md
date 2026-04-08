# Rawform
Rawform is a modern fashion brand built on the philosophy that clothing should be honest, intentional, and unapologetic. We strip away the excess — no noise, no trend-chasing — just pure form, refined construction, and materials that speak for themselves
Here's your GitHub README:

Rawform 🖤

We don't follow the form. We define it.

Rawform is a modern fashion e-commerce platform built with a full-stack MERN architecture, featuring fluid GSAP animations and a clean Tailwind CSS design system.

Tech Stack
LayerTechnologyFrontendReact.jsBackendNode.js + Express.jsDatabaseMongoDB + MongooseAnimationsGSAP (GreenSock)StylingTailwind CSS

Features

🛍️ Product catalog with filtering and search
🖤 Smooth GSAP page transitions and scroll animations
🔐 JWT-based authentication & authorization
🛒 Cart and checkout flow
📦 Order management system
📱 Fully responsive across all devices
⚡ Optimized performance with lazy loading


Getting Started
Prerequisites
bashnode >= 18.x
npm >= 9.x
MongoDB Atlas or local instance
Installation
bash# Clone the repository
git clone https://github.com/yourusername/rawform.git

# Navigate to project
cd rawform

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
Environment Variables
Create a .env file in the /server directory:
envPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
Run the App
bash# Run backend
cd server && npm run dev

# Run frontend (new terminal)
cd client && npm run dev

Project Structure
rawform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── animations/     # GSAP animation configs
│   │   └── utils/          # Helper functions
├── server/                 # Express backend
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   └── middleware/         # Auth, error handling

Scripts
bashnpm run dev        # Start development server
npm run build      # Production build
npm run lint       # Run ESLint

License
MIT © Rawform

Built with intention. Styled with purpose.
