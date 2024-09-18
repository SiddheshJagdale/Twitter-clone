# Twitter Clone

This is a Twitter clone built with modern technologies, allowing users to post tweets, follow others, like posts, comment, and more. It’s designed to be scalable and efficient with the help of tools like React, Next.js, Prisma, and PostgreSQL.

## Features

- **User Authentication**: Sign up, log in, and log out (with Google authentication).
- **Tweeting**: Create, read, update, and delete tweets.
- **Following**: Follow and unfollow other users.
- **Likes**: Like and unlike tweets.
- **Comments**: Add comments to tweets.
- **Real-Time Updates**: Receive updates to your feed in real-time.
- **Responsive Design**: Looks great on all devices.

## Technologies Used

| Technology     | Description                                         | Icon                                                                 |
|----------------|-----------------------------------------------------|----------------------------------------------------------------------|
| React          | Frontend framework for building user interfaces.    | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge) |
| Next.js        | React framework for server-side rendering.          | ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge) |
| Prisma         | ORM for database queries and migrations.            | ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white&style=for-the-badge) |
| Zustand        | State management library for React.                 | ![Zustand](https://img.shields.io/badge/-Zustand-181717?logo=z&style=for-the-badge) |
| SWR            | Data fetching and caching library for React.        | ![SWR](https://img.shields.io/badge/-SWR-000000?logo=swr&logoColor=white&style=for-the-badge) |
| PostgreSQL     | Relational database used for storing data.          | ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white&style=for-the-badge) |

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/SiddheshJagdale/twitter-clone.git
    cd twitter-clone
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the PostgreSQL database and configure the Prisma schema:

    ```bash
    npx prisma migrate dev
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

## Screenshots

### Home Page
![Home Page](https://github.com/SiddheshJagdale/Twitter-clone/blob/master/images/home.png)

### Login Page
![Login Page](https://github.com/SiddheshJagdale/Twitter-clone/blob/master/images/login.png)

###  User Profile 
![ User Profile ](https://github.com/SiddheshJagdale/Twitter-clone/blob/master/images/profile.png)

## Project Structure

The project is organized as follows:

```bash
.
├── prisma                    # Prisma schema and migration files
│   ├── migrations/           # Database migrations
│   └── schema.prisma         # Database schema definition
├── public                    # Static files (e.g., images, icons)
├── src
│   ├── components            # Reusable components (e.g., buttons, forms, etc.)
│   ├── hooks                 # Custom React hooks (e.g., for Zustand or SWR)
│   ├── pages                 # Next.js pages (e.g., home, tweet, profile)
│   │   ├── api/              # API routes for server-side logic
│   │   └── index.tsx         # Home page
│   ├── styles                # Global styles and Tailwind configuration
│   ├── utils                 # Utility functions (e.g., API calls, helpers)
│   ├── store                 # Zustand store configuration for state management
│   ├── lib                   # Third-party libraries or helpers (e.g., Prisma client, SWR setup)
│   └── types                 # TypeScript types for the project
├── .env                      # Environment variables (e.g., database connection strings)
├── .gitignore                # Files and directories to ignore in version control
├── next.config.js            # Next.js configuration file
├── package.json              # Node.js dependencies and scripts
└── tsconfig.json             # TypeScript configuration

