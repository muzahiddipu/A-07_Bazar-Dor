<div align="center">

# বাজার দর · BazarDor

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক জায়গায়।**

আজকের দাম, দামের ওঠানামা ও বাজারভিত্তিক তুলনা সহজে দেখুন।

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)

</div>

## ✨ Features

1. **আজকের পণ্যের দাম** — নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ দাম একটি সাজানো ক্যাটালগে দেখুন।
2. **দামের ওঠানামা** — আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে বা কমেছে, সেগুলো আলাদা করে দেখুন।
3. **বিস্তারিত বাজার তুলনা** — পণ্যের পৃষ্ঠা থেকে ঐতিহাসিক দাম ও বাজারভিত্তিক দামের তথ্য দেখুন।
4. **ক্যাটাগরি ও সাজানো তালিকা** — ক্যাটাগরি অনুযায়ী পণ্য দেখুন এবং দাম অনুযায়ী তালিকা সাজান।
5. **অ্যাকাউন্ট ও প্রোফাইল** — ইমেইল-পাসওয়ার্ড, Google বা GitHub দিয়ে সাইন ইন/সাইন আপ করুন এবং নিজের প্রোফাইল পরিচালনা করুন।

## 🧰 Technologies

- **Next.js 16** — App Router and server-rendered pages
- **React 19** and **TypeScript 5**
- **Tailwind CSS 4** and **DaisyUI 5** — styling and UI
- **Better Auth** — email/password and social authentication
- **MongoDB** — authentication data storage
- **Lucide React** — icons
- **React Hot Toast** — interaction feedback
- **BazarDor API** — product, category, price, and market data

## 🚀 Getting started

### Requirements

- Node.js
- npm
- MongoDB connection string
- OAuth credentials for Google and GitHub (to enable social sign-in)

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

Create a `.env` file in the project root and configure:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

For OAuth, configure each provider’s callback URL as
`http://localhost:3000/api/auth/callback/google` or
`http://localhost:3000/api/auth/callback/github`.

## 📜 Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production server |
| `npm run lint` | Check the project with ESLint |
