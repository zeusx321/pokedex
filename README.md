# 🧢 Pokédex

A clean and responsive **Pokédex mobile application** built with **React Native + Expo**, allowing users to browse Pokémon, search by name, and view detailed information for each Pokémon.

The app consumes data from **PokéAPI** and uses **Expo Router** for navigation with a simple, modern UI inspired by the Pokédex experience.

## ✨ Features

* 🔎 **Search Pokémon** by name
* 📋 Browse the first **20 Pokémon** from the National Pokédex
* 🖼️ Display high-quality official Pokémon artwork
* 🔢 Show formatted National Pokédex numbers
* 🎨 Dynamic card colors based on Pokémon type
* 📖 Pokémon details screen with species description
* ↩️ Navigate between the Pokémon list and details screen
* 📱 Built with React Native and Expo
* 🌐 Run the project on Android, iOS, or Web through Expo

## 🛠️ Tech Stack

| Technology              | Purpose                              |
| ----------------------- | ------------------------------------ |
| **React Native**        | Mobile application UI                |
| **Expo**                | React Native development platform    |
| **Expo Router**         | File-based navigation                |
| **TypeScript**          | Type-safe development                |
| **NativeWind**          | Utility-first styling                |
| **Tailwind CSS**        | Styling system                       |
| **Lucide React Native** | UI icons                             |
| **PokéAPI**             | Pokémon data and species information |

## 🧩 How It Works

### Pokémon List

The home screen fetches Pokémon data from PokéAPI and retrieves detailed information for each Pokémon. The current implementation loads the first 20 Pokémon and displays their name, artwork, and National Pokédex number.

### Search

The search field filters the loaded Pokémon in real time, allowing users to quickly find a Pokémon by name.

### Pokémon Details

Selecting a Pokémon opens a dedicated details screen using Expo Router. The details page fetches the Pokémon's species information and displays its English Pokédex description.

## 📁 Project Structure

```text
pokedex/
├── assets/
├── src/
│   └── app/
│       ├── _layout.tsx       # App navigation/layout
│       ├── index.tsx         # Pokémon list & search
│       └── details.tsx       # Pokémon details screen
├── global.css                # Global styles
├── app.json                  # Expo configuration
├── metro.config.js           # Metro configuration
├── nativewind-env.d.ts       # NativeWind TypeScript types
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/zeusx321/pokedex.git
cd pokedex
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

### 4. Run the application

After starting Expo, you can open the project using:

* 📱 **Expo Go** on a physical device
* 🤖 **Android Emulator**
* 🍎 **iOS Simulator**
* 🌐 **Web Browser**

### Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm start`       | Start the Expo development server |
| `npm run android` | Start the project on Android      |
| `npm run ios`     | Start the project on iOS          |
| `npm run web`     | Start the web version             |
| `npm run lint`    | Run Expo linting                  |

## 🔌 API

This project uses **PokéAPI** to retrieve Pokémon and species data.

```text
https://pokeapi.co/api/v2/pokemon
```

The application uses Pokémon endpoints for the list and detailed Pokémon information, and the species endpoint for Pokédex descriptions.

## 🎨 UI & Design

The interface uses a soft, card-based design with colors that adapt to the Pokémon's primary type. The details screen follows the same visual language for a consistent experience.

---

<div align="center">

Made with ❤️ using React Native & Expo

</div>
