# Next.js 14 + React + Tailwind CSS + Prisma + MongoDB + NextAuth Basic Auth starter

![alt text](readme.gif 'Title')

This repository serves as a comprehensive boilerplate for building scalable, modern web applications using a powerful stack that includes Next.js 13, React, Tailwind CSS, Prisma, MongoDB, and NextAuth. This setup is designed to kickstart your project with robust authentication, elegant styling, and a well-structured database model.

## Features

- **Next.js 14**: The latest version of the React framework for production-grade React applications.
- **React**: A JavaScript library for building user interfaces with a focus on declarative and component-based development.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Prisma**: Next-generation ORM for Node.js and TypeScript, providing a clean and type-safe API for interacting with your database.
- **MongoDB**: A NoSQL database known for its scalability and flexibility.
- **NextAuth**: Integrated authentication system for Next.js applications, supporting various authentication providers.

## Getting Started

To get started with this boilerplate, follow these steps:

### Prerequisites

- Node.js 14.x or later
- npm/yarn
- MongoDB instance (local or cloud-based)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nextjs-react-tailwind-prisma-mongodb-nextauth-boilerplate.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nextjs-react-tailwind-prisma-mongodb-nextauth-boilerplate
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

4. Configure your environment variables:

   - Copy `.env.example` to `.env` and fill in your database URL and authentication provider details.

5. Migrate scheme to DB `npx prisma db push` for MingoDB or `npx prisma migrate dev` for MySQL.

6. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

For detailed instructions on how to use each component of this stack, please refer to the following documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [NextAuth Documentation](https://next-auth.js.org/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
