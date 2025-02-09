# Ravioli

Ravioli (infoskjerm) is a digital information display for [Online](https://online.ntnu.no/). Located on A4, it provides information to students in real-time.

You can view the live Infoskjerm [here](https://infoskjerm-online.vercel.app/).

## Contribution

We welcome contributions from everyone. Please note that all contributions require approval from a member of Appkom, before going live.

## Setup frontend

From root, navigate into frontend-folder:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
# or
yarn install
```

Fill in the environment template and fill in the required variables:

```bash
cp .env.template .env
```

- **VITE_NODE_ENV**: The environment you are running the project in. Should be set to "development".
- **VITE_BACKEND_API_KEY**: The API key which grants you access to the backend REST API. Contact a member of Appkom at [appkom@online.ntnu.no](mailto:appkom@online.ntnu.no) to obtain a key.
- **VITE_VIDEO_API_KEY**: Key to the YouTube API V3. Retrieve your key here: [Google Cloud Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com).
- **VITE_BACKEND_URL**: Url to the backend. `https://infoskjerm-backend-appkom.vercel.app` is the running backend in prod.


Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Setup backend

From root, navigate into backend-folder:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
# or
yarn install
```

Fill in the environment template and fill in the required variables:

```bash
cp .env.template .env
```

- **SLACK_TOKEN**: The token retrieved from slack
- **API_KEY**: String that will be the key to the REST API


Start the development server:

```bash
npm run dev
# or
yarn dev
```
