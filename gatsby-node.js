/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "../../theme.config$": path.join(__dirname, "src/semantic/theme.config")
      }
    }
  });
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const agencies = ["ddot", "smart", "the-ride", "transit-windsor"];
  const result = await graphql(`
    {
      postgres {
        agencies: allAgenciesList {
          agencyId
          agencyName
          agencyUrl
        }
        routes: allRoutesList {
          agencyId
          routeShortName
          routeLongName
        }
        stops: allStopsList {
          feedIndex
          stopId
        }
      }
    }
  `);

  result.data.postgres.agencies.forEach(a => {
    createPage({
      path: `/${a.agencyId}`,
      component: path.resolve("./src/templates/agency-page.js"),
      context: {
        id: a.agencyId
      }
    });
  });

  result.data.postgres.routes.forEach(r => {
    createPage({
      path: `/${r.agencyId}/route/${Number(r.routeShortName)}`,
      component: path.resolve("./src/templates/route-page.js"),
      context: {
        routeNo: r.routeShortName,
        feedIndex: agencies.indexOf(r.agencyId) + 1
      }
    });
  });

  result.data.postgres.stops.forEach(stop => {
    createPage({
      path: `/${agencies[stop.feedIndex - 1]}/stop/${stop.stopId}`,
      component: path.resolve("./src/templates/stop-page.js"),
      context: {
        stopId: stop.stopId,
        feedIndex: stop.feedIndex
      }
    });
  });
};
