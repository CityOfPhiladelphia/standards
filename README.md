# Digital Standards Assets
This is an open-source collection of CSS, JavaScript, font and image files used to create the look and feel of beta.phila.gov.



# Local development
- Install dependencies. You'll need:
  - Node.js
  - [Yarn](yarnpkg.com)
- Clone this repo and cd into the directory
- Run `yarn start` to watch directories.

# Creating a release
1. Run `yarn release`. This will clean the /dist directory and compile all necessary files.
2. Run `npm publish` (note that `yarn publish` will hang due to [this issue](https://github.com/yarnpkg/yarn/issues/1694))
3. Create .zip file with all `/dist` files, and upload as new [GitHub Release](https://github.com/CityOfPhiladelphia/standards/releases).
