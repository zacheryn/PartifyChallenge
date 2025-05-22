# Partify Coding Challenge

Interview coding challenge for Web Developer position at Partify Inc.

## Layout

The code is split into two parts (backend and frontend).  The backend is held in the `Server/` directory, and the frontend is held in the `Client/` directory.

### Backend

A flask app that contains the app in `Partify/`, shell scripts in `bin/`, and sqlite schema and data in `sql/`.

### Frontend

A React app made using Vite.  All of the code is housed in `src/`.  The separate pages are held in `src/pages/` with components for those pages housed in `src/pages/components/`.

## How to run

First you must start the backend flask server.  This is handled by running a few bash scripts.  First navigate your terminal to `Server/`, then run the following commands:

```
bin/install
bin/db create
bin/run
```

Note: If you have already ran install and are returning, make sure you are in the python virtual environment before attempting to run.  This can be done by running `source env/bin/activate` in the `Server/` directory.

Once the backend REST API is running, the front end can be launched.  Navigate a terminal to `Client/` and run the following commands:

```
npm ci .
npm run dev
```

The website will be accessible at http://localhost:5173/ (The API runs at http://localhost:8000/).

## Description

### Backend

A flask app for a REST API that the frontend can communicate with to access the database.  This was made to show that the front end can easily scale up with larger databases as it interacts through an API.  The API I developed only has GET methods allowing the webpage to access the parts available in the database with no way of editting the database.

### Frontend

A React app created with vite for the user to interact with directly.  This make several calls to the API as needed to show the user the desired parts with an intuitive UI.  It also utilizes CSS to design the site.  The home page has a search method to allow users to choose their vehicle within the database.  Once the vehicle is chosen and confirmed by pressing the serch button, they will be forwarded to the `/collections/` route where the year, make, and model of the chosen vehicle will be visible and links to the various Partify collection pages will be listed.  The first element in the list is always all parts for the vehicle, then it is followed by individual categories.