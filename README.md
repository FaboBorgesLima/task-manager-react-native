# Task manager

This application is a simple task manager that will use react-native for a mobile app, nest-js for back-end and maybe some nuxt (or next) for a web application.

This project was developed for educational purposes.

## Quick start

This project is a expo project, for more information about expo, check the [expo documentation](https://docs.expo.dev/).

```bash
# Clone the repo
git clone https://github.com/FaboBorgesLima/task-manager-react-native
```

```bash
# Go to the project directory
cd task-manager-react-native
```

```bash
# Install dependencies
npm install
```

```bash
# Start the application
npm start
```

From this point, you can use the expo app to scan the QR code that will be shown in your terminal.

You can also use the expo app to run the application in your android or ios device.

For creating a development build on Android, you can use the following command:

Obs: You need to have the JDK 17 installed for this command to work. And this command will take a while to run, so go take a coffee ☕ .

```bash
eas build -p android --profile development --local
```

## Goals

-   User can create his profile and/or log in.
-   User can have many tasks.
-   User can have recurring tasks during the week.
-   User can have tasks that can be concluded during the day and tasks that need to be concluded in a specific hour.

## Goals ideas

-   Integrate it with platforms like Github for things like "GitHub contribution metas".
-   Create some sort of gamification.

## Goals check-list

-   [ ] Base project structure
    -   [ ] Styles
    -   [ ] Routes
-   [ ] User management
    -   [ ] Create user
    -   [ ] Login
    -   [ ] Profile
    -   [ ] Edit user name
    -   [ ] Logout
-   [ ] Task management
    -   [ ] Create
    -   [ ] Edit
    -   [ ] View daily tasks
    -   [ ] View tasks as calendar

## Screens prototype

[Wiki figma page](https://github.com/FaboBorgesLima/task-manager-nestjs/wiki/Screens-prototypes)

## Data modeling

[Entity relationship page](https://github.com/FaboBorgesLima/task-manager-nestjs/wiki/Data-modeling)

## Sprints chronogram

-   [ ] Base project structure (2 week)
-   [ ] User management (4 week)
-   [ ] Task management (6 week)

Obs: If in the end there is too much "free time", i will create more sprints and goals.

## Screenshots

![Create Task](docs/screen-captures/create-task.jpg)
![Edit Task](docs/screen-captures/edit-task.jpg)
![Task List](docs/screen-captures/task-list.jpg)
![Login](docs/screen-captures/login.jpg)
![Register](docs/screen-captures/register.jpg)
