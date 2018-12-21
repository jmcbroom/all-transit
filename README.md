# all-transit

## setup

`.env.development` is where you can specify your Postgres connection string.

For best results, port-forward from our shared database:

`ssh -L 5431:localhost:5432 transit@159.89.225.251`

This will work with the `.env.development` default, which is to connect to localhost, port 5431, user `transit`, database `transit`.

## development

run `yarn` to install.

to develop, `gatsby develop` will start at `localhost:8080`