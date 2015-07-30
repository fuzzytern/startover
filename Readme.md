## Project structure model

    |- app/
      |- core                        // Core module - contains main site structure. Includes other modules
        |- core.html                 // Main page template (can be named index.html)
        |- sass                      // All styling that is specific to the core goes here
          |- core.scss               // Includes for partials
          |- _base.scss              // Overrides browser defaults for HTML elements and set new ones (normalize.css)
          |- _blocks.scss           // Button object, form object, blog post object, media object...
          |- _shame.scss             // Code that needs to be refactored - read http://csswizardry.com/2013/04/shame-css/
        |- core.coffee               // Coffeescript code for the core module
        |- images
          |- logo.svg
          |- splash-background.jpg
      |- <module>                    // Specific module, representing a block in BEM terminology
        |- <module>.html             // Template included in the core module's template
        |- <module>.coffee           // Module-specific Coffeescript code
        |- <image1>.svg
        |- sass                      // Module-specific styles
          |- <module>.scss           // Includes for partials
          |- _base.scss              // Overrides the core modules base styles /!\ Takes effect across the whole app /!\
          |- _blocks.scss
          |- _shame.scss
    |- public/                       // Processed output to be served in the production environment.
      |- index.html
      |- assets/
          |- css/
          |- images/
          |- js/
    |- package.json                  // Package information - NPM configuration file
    |- gulpfile.js                   // Gulp (task runner) configuration file
    |- Readme.md

## Note on modularisation

* Distinction between `blocks` (located in `app/core/sass/_blocks.scss` or as separate files in `app/core/sass/blocks/`) and application `modules` (full folder directly under `app`):
    * A block is styling for a set of a specific part of the User Interface  
    * A module represent everything needed for a specific part of the User Interface to function independently (Html, Javascripts in additions to Stylesheets)

Styling might begin as a block for the `core` module and end up as part as its own specific module with other relevant files.
