# all-transit

## setup

`.env.development` is where you can specify your Postgres connection string.

For best results, port-forward from our shared database:

`ssh -L 5431:localhost:5432 transit@159.89.225.251`

(password-based login is turned off; contact Jimmy with your ssh key to be added to authorized_keys)

This will work with the `.env.development` default, which is to connect to localhost, port 5431, user `transit`, database `transit`.

## development

run `yarn` to install.

to develop, `gatsby develop` will start at `localhost:8080`.

Currently, the page creation in `gatsby-node.js` is scaled back (using conditions on the GraphQL query) to only make a small subset of pages. Building the full site will take a while, and you may need to give node more memory like so:

`node --max-old-space-size=8192 ./node_modules/gatsby/dist/bin/gatsby.js develop`

## trip planner

is NOT currently running at `http://159.89.225.251:8080/` (but that's where it would be)
