/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox-gl/,
            use: loaders.null()
          }
        ]
      }
    });
  }
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
        stops: allStopsList(first: 500) {
          feedIndex
          stopId
        }
      }
      allExplainersYaml {
        edges {
          node {
            title
            slug
          }
        }
      }
      allDestinationsYaml {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `);

  result.data.allExplainersYaml.edges.forEach(e => {
    createPage({
      path: `/help-with/${e.node.slug}`,
      component: path.resolve("./src/templates/explainer-page.js"),
      context: {
        slug: e.node.slug,
        title: e.node.title
      }
    });
  });

  result.data.allDestinationsYaml.edges.forEach(e => {
    createPage({
      path: `/get-to/${e.node.slug}`,
      component: path.resolve("./src/templates/destination-page.js"),
      context: {
        slug: e.node.slug,
        name: e.node.name
      }
    });
  });

  result.data.postgres.agencies.forEach(a => {
    createPage({
      path: `/${a.agencyId}`,
      component: path.resolve("./src/templates/agency-page.js"),
      context: {
        id: a.agencyId,
        feedIndex: agencies.indexOf(a.agencyId) + 1
      }
    });
  });

  result.data.postgres.routes.forEach(r => {
    createPage({
      path: `/${r.agencyId}/route/${r.routeShortName}`,
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
