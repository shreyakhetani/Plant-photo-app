# Plant Management App

This React Native app allows users to organize and maintain a collection of plants, enabling them to add, modify, and view plant details. The app also supports photo capture for each plant.

## Installation

### Prerequisites

- Node.js (version 23.7.0)
- Expo CLI
- Expo Go app installed on your mobile device

## Setup

1. Clone the repository:
   

   ```bash
     git clone https://github.com/shreyakhetani/Plant-photo-app.git
   ```

2. Navigate to the project folder:

   ```bash
    cd plant-photo-app
   ```
3. Install the required dependencies:

   ```bash
    npm install
   ```
4. Launch the project:
- Open the app in Expo Go on your phone by scanning the QR code generated in the terminal after running the following command:

   ```bash
    npx expo start
   ```
   

## Usage
The app enables users to manage their plants with the following capabilities:

- Adding Plants: Use the "+ Add New Plant" button to create a new plant entry, take a photo, and provide details like the plant’s name and notes.
- Viewing Plants: See a list of all plants with relevant details, including their names, notes, and the date added.
- Editing Plants: Select any plant to edit its details, including the name, notes, and photo.

The app uses the device's camera to capture plant photos and adjusts automatically to light or dark themes depending on the system settings.

## Features

- Camera Integration: Capture photos of plants directly within the app.
- Editable Information: Easily update plant names, notes, and images.
- Redux for State Management: This app uses Redux to maintain the plant data, ensuring consistency across screens.

## Screens:

- List Screen: Shows all the plants in a scrollable list with options to add new plants or modify existing ones.
- Scan Screen: Allows you to capture a plant’s photo, enter its name and notes, and save the information.
- Profile Screen: A screen displaying user profile details (currently displays a placeholder text).
- Settings Screen: A settings page for adjusting app preferences (currently displays a placeholder text).
