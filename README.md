# StudentHub

StudentHub is a small academic React Native application for managing student records. It demonstrates core mobile development, a REST API, local persistence, device permissions, Git, Docker, Kubernetes, and GitHub Actions without introducing a complicated architecture.

## Features

- Home dashboard with responsive Flexbox statistic cards and a fade-in animation.
- Students loaded from the Express REST API using `fetch` and `useEffect`.
- Add Student form with controlled inputs and JavaScript validation.
- Save and unsave students with AsyncStorage. Long-pressing a card is also a gesture action.
- Profile screen with Expo Camera and Expo Location permission handling.
- Bottom tabs for Home, Students, and Profile; a stack inside Students for the list and form.
- Backend tests, Dockerfile, Docker Compose, Kubernetes manifests, and GitHub Actions CI.

## Technology

React Native, Expo SDK 51, React Hooks, React Navigation, AsyncStorage, Expo Camera, Expo Location, Node.js, Express, Docker, Kubernetes, and GitHub Actions.

## Structure

```text
mobile/                 Expo app and screens
backend/                Express API and Node test file
k8s/                    Deployment and Service manifests
.github/workflows/      CI workflow
Dockerfile              Backend image
docker-compose.yml      Local backend container
```

## Requirements

Node.js 18 or newer and npm are required. Git is recommended. Docker and kubectl are optional for the deployment demonstrations. A physical device with Expo Go or an Android/iOS emulator is needed for native camera and location testing.

## Install

```bash
npm install --prefix backend
npm install --prefix mobile
```

Copy `.env.example` to `.env` only when you need to document a local API URL. Expo reads `EXPO_PUBLIC_API_URL` from the mobile environment. For a physical phone, replace `localhost` with the computer's LAN IP. For an Android emulator use `http://10.0.2.2:3000/api`.

## Run

Terminal 1:

```bash
npm run backend
```

Terminal 2:

```bash
npm run mobile
```

Choose an emulator, scan the QR code with Expo Go, or press `w` for a web preview. Web can demonstrate most UI features; camera and location require a supported native device.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| GET | `/api/students` | List students |
| GET | `/api/students/:id` | Read one student |
| POST | `/api/students` | Create a student |
| DELETE | `/api/students/:id` | Delete a student |

Example request:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/students
curl -X POST http://localhost:3000/api/students -H 'Content-Type: application/json' -d '{"name":"Asha Rao","email":"asha@example.com","phone":"9999999999","course":"Design"}'
```

## Tests

```bash
npm test
```

The backend tests verify health, list, validation, and creation. The mobile form can be demonstrated manually by submitting blank or malformed values.

## Docker

Docker is not installed in the starter environment. After installing Docker:

```bash
docker build -t studenthub-backend .
docker run --rm -p 3000:3000 studenthub-backend
docker compose up --build
docker compose down
```

## Kubernetes

The image must be available to the cluster. With Minikube, run `eval $(minikube docker-env)` before building.

```bash
docker build -t studenthub-backend:latest .
kubectl apply -f k8s/
kubectl get pods
kubectl get deployments
kubectl get services
kubectl port-forward service/studenthub-backend 3000:3000
kubectl delete -f k8s/
```

A Pod runs containers. A Deployment keeps the requested number of replicas running. A Service gives those Pods a stable network endpoint.

## Git

```bash
git init
git add .
git commit -m "Build StudentHub academic project"
git status
git log --oneline
```

`.gitignore` excludes dependencies, Expo build output, logs, and environment files. Commit the source and configuration, never secrets or `node_modules`.

## CI/CD

`.github/workflows/ci.yml` runs on pushes and pull requests. GitHub Actions checks out the repository, installs backend dependencies, runs tests, and builds the Docker image. Continuous Integration means validating every change automatically. Continuous Delivery means making a validated change ready to release; this workflow stops before deployment so the student can demonstrate deployment separately.

## Troubleshooting

- **Mobile cannot reach API:** use the host computer's LAN IP for a physical phone or `10.0.2.2` for Android Emulator. Keep phone and computer on the same network.
- **Expo dependency warnings:** run `npx expo install` for a package if Expo recommends a patch version for the installed SDK.
- **Camera unavailable:** use a physical device or a development build; web preview cannot provide native camera behavior.
- **Location denied:** enable location permission in the device settings, then retry.
- **Port busy:** start the API with `PORT=3001 npm run backend` and update the mobile API URL.
- **Docker unavailable:** install Docker Engine or Docker Desktop; the mobile and backend source can still be run directly with Node/npm.

## VIVA PREPARATION

1. **What is React Native?** A framework for building native mobile interfaces with JavaScript and React.
2. **React Native vs React?** React targets web UI; React Native maps components to native mobile views.
3. **What are components?** Reusable functions that return UI.
4. **What is JSX?** JavaScript syntax that describes a component's UI.
5. **What is Flexbox?** A layout system for arranging children along rows or columns.
6. **What is StyleSheet?** React Native's structured way to define styles.
7. **What is useState?** A Hook for storing state that can change and re-render a component.
8. **What is useEffect?** A Hook for side effects such as fetching data or reading storage.
9. **Why use Hooks?** They let function components manage state and lifecycle behavior.
10. **What is Stack Navigation?** A screen history where a new screen is pushed on top.
11. **What is Tab Navigation?** A set of sibling screens selected by tabs.
12. **Why React Navigation?** It provides established navigation primitives for React Native.
13. **What is a REST API?** An HTTP-based interface that exposes resources and operations.
14. **What is GET?** An HTTP method used to read data.
15. **What is POST?** An HTTP method used to create data.
16. **What is fetch?** A browser and React Native API for making network requests.
17. **What is JSON?** A text format commonly used to exchange structured data.
18. **What is AsyncStorage?** Persistent asynchronous key-value storage for simple local data.
19. **Why use AsyncStorage?** It keeps saved students after an app restart.
20. **Is AsyncStorage a database?** No. It is storage for small key-value data, not a relational database.
21. **How are permissions handled?** The app requests permission and handles granted or denied states.
22. **How does the camera work?** Expo Camera shows a camera view and returns a captured image URI.
23. **How does location work?** Expo Location requests foreground permission and reads coordinates.
24. **What is Git?** A distributed version control system.
25. **What is GitHub?** A hosted service for Git repositories and collaboration.
26. **What is a commit?** A saved snapshot of project changes.
27. **What is a branch?** An independent line of Git development.
28. **What is .gitignore?** A list of files Git should not track.
29. **What is Docker?** A tool for packaging and running software in containers.
30. **What is an image?** A packaged, read-only template used to create containers.
31. **What is a container?** A running isolated instance of an image.
32. **What is a Dockerfile?** Instructions for building an image.
33. **What is Kubernetes?** A system that manages containerized applications.
34. **What is a Pod?** Kubernetes' smallest deployable unit, usually containing one app container.
35. **What is a Deployment?** A controller that maintains Pods and their replica count.
36. **What is a Service?** A stable network endpoint for a group of Pods.
37. **What is CI?** Automatically integrating and checking code changes.
38. **What is CD?** Automatically delivering or deploying validated changes.
39. **What is GitHub Actions?** GitHub's workflow automation service.
40. **Why is state not hard-coded in the UI?** The app demonstrates real API, form, and storage data flow.

## Practical demonstration sequence

1. Run the backend and show `/api/health`.
2. Start Expo and open the app on a device or emulator.
3. Show the Home dashboard, Flexbox cards, and fade-in animation.
4. Open Students and explain the tab plus nested stack.
5. Show API-loaded student cards and loading/error states.
6. Long-press or tap the star to demonstrate the gesture/save action.
7. Reload the app and show the saved student remains through AsyncStorage.
8. Open Add Student, submit invalid values, then submit a valid record.
9. Open Profile, request camera permission, and take a photo on a physical device.
10. Request location and explain the latitude/longitude permission flow.
11. Run `npm test`, show `git log --oneline`, and explain `.gitignore`.
12. On a Docker-enabled machine, build/run the image and show the health endpoint.
13. Show the Kubernetes YAML, apply it to Minikube, and inspect Pods, Deployment, and Service.
14. Open the GitHub Actions run and explain the CI checks.
