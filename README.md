# FocusQuest 🚀
A gamified productivity application designed to help you turn your daily tasks into treasures and stay motivated on your quests.

(Note: Replace the URL above with a real screenshot of your dashboard.)

✨ Features
User Authentication: Secure sign-up and login functionality powered by Firebase Authentication.

Gamified Task Management: Add, complete, and delete daily tasks, referred to as "Quests".

Dynamic Focus Timer: Start a timer for any quest with a circular progress bar, and controls to pause, resume, or cancel the session.

Rewards System: Earn chests (Small, Silver, and Gold) as you complete more quests.

Animated Transitions: Smooth, reusable page transitions for a better user experience.

User Profile: A dedicated page to view user statistics and information.

💻 Tech Stack
Frontend: HTML5, CSS3, JavaScript (ES6)

Backend & Authentication: Google Firebase

⚙️ Setup and Installation
To run this project locally, follow these simple steps.

Clone the repository:

Bash

git clone https://github.com/your-username/focusquest.git
cd focusquest
Set up Firebase:

Go to the Firebase Console and create a new project.

Add a Web App to your project.

In the Authentication section, go to the Sign-in method tab and enable the Email/Password provider.

Copy your app's firebaseConfig object from your project settings.

Add Firebase Config:

Open the app.js file.

Paste your unique firebaseConfig object into the placeholder at the top of the file.

Run the Application:

The easiest way to run the project is with a live server. If you're using Visual Studio Code, you can install the Live Server extension.

Right-click on signup.html or login.html and select "Open with Live Server".

📂 File Structure
Here is an overview of the key files in the project:

/
├── 📄 login.html         # User login page
├── 📄 signup.html        # User registration page
├── 📄 dashboard.html     # Main app dashboard with quests and timer
├── 📄 profile.html       # User profile page
├── 📄 transition.html    # Reusable transition screen
│
├── 📁 css/
│   ├── 📄 login.css
│   ├── 📄 dashboard.css
│   └── ...              # Other stylesheets
│
└── 📁 js/
    ├── 📄 app.js          # Firebase configuration and authentication
    └── 📄 dashboard.js    # Logic for dashboard, modals, and timer
