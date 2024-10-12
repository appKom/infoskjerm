# Infoskjerm

Infoskjerm is a digital information display for [Online](https://online.ntnu.no/). Located on A4, it provides information to students in real-time.

You can view the live Infoskjerm [here](https://infoskjerm-online.vercel.app/).

## Contribution

We welcome contributions from everyone. Please note that all contributions require approval from a member of Appkom, before going live.

## Getting Started

### Prerequisites

Before you start, make sure you have Node.js and npm/yarn installed on your machine.

### Setup

Clone the repository to your local machine:

```bash
git clone https://github.com/appKom/infoskjerm.git
```

Navigate into the project directory:

```bash
cd infoskjerm
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

- **VITE_BACKEND_API_KEY**: The API key which grants you access to the backend REST API. Contact a member of Appkom at [appkom@online.ntnu.no](mailto:appkom@online.ntnu.no) to obtain a key.
- **VITE_VIDEO_API_KEY**: Key to the YouTube API V3. Retrieve your key here: [Google Cloud Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com).


### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```
