# Quickstart
Install dependencies:
```sh
yarn
```
or
```sh
npm install
```

Run dev server:
```sh
yarn start
```
or
```sh
npm start
```

# Development Notes
## API Keys
The Google Maps API key `REACT_APP_GMAPS_KEY` found in `.env` is only valid for https://weathernav.github.io/. To run locally, you will need to [generate your own API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

You will also need to add `REACT_APP_WEATHER_FORECAST_KEY` for Weatherbit.io access. You can [create one here](https://www.weatherbit.io/account/create).

## Tests
There are some Cypress tests that can be run by a `npm run cypress`/`yarn cypress` command.

## Prettier.js precommit hook
To enable Prettier.js precommit hook, run this command:
```sh
ln -s ../../pre-commit.sh .git/hooks/pre-commit
```

# Deployment
To deploy to Github Pages, run `yarn deploy`.

# Project Boilerplate
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
