<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1b-CawqHDUNedca6Mpl11oftWlL52Sl-a


# Project Overview

This is the frontend for the Suicollect platform, built with React and TypeScript. The application allows users to manage digital assets, join clubs, track portfolios, and interact with a marketplace. Below is an overview of each page in the `pages/` directory:

## Pages Directory

- **AssetDetailPage.tsx**: Displays detailed information about a specific asset, including metadata, ownership, and transaction history.
- **ClubDetailPage.tsx**: Shows details about a particular club, including its members, activities, and associated assets.
- **ClubsListPage.tsx**: Lists all available clubs, allowing users to browse and select clubs for more details.
- **CreateItemPage.tsx**: Provides a form for users to create and submit new items or assets to the platform.
- **EditProfilePage.tsx**: Allows users to edit their profile information, such as username, bio, and profile picture.
- **HomePage.tsx**: The landing page of the application, typically featuring an overview, highlights, or introduction to the platform.
- **MarketplacePage.tsx**: Displays a marketplace where users can browse, buy, or sell assets.
- **MyAssetsPage.tsx**: Shows a list of assets owned by the currently logged-in user.
- **PortfolioTrackerPage.tsx**: Provides tools and visualizations for users to track the performance and value of their asset portfolio.
- **ProfilePage.tsx**: Displays the user's public profile, including their assets, activity, and other relevant information.
- **SettingsPage.tsx**: Allows users to configure application settings, preferences, and account options.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
