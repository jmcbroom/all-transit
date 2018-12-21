/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage }}) => {
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
        stopId
      }
    }
  }
  `)

  result.data.postgres.agencies.forEach(a => {
      createPage({
          path: `/${a.agencyId}`,
          component: path.resolve('./src/templates/agency-page.js'),
          context: {
              id: a.agencyId
          }
      })
  })
  result.data.postgres.routes.forEach(r => {
    createPage({
      path: `/${r.agencyId}/route/${Number(r.routeShortName)}`,
      component: path.resolve('./src/templates/route-page.js'),
      context: {
        routeNo: r.routeShortName,
      },
    });
  });

//   result.data.postgres.routes.forEach(route => {
//     createPage({
//       path: `/route/${Number(route.routeShortName)}/stops`,
//       component: path.resolve('./src/templates/route-stop-page.js'),
//       context: {
//         routeNo: route.routeShortName,
//       },
//     });
//   });

//   result.data.postgres.routes.forEach(route => {
//     createPage({
//       path: `/route/${Number(route.routeShortName)}/schedule`,
//       component: path.resolve('./src/templates/route-schedule-page.js'),
//       context: {
//         routeNo: route.routeShortName,
//       },
//     });
//   });

//   result.data.postgres.stops.forEach(stop => {
//     createPage({
//       path: `/stop/${stop.stopId}`,
//       component: path.resolve('./src/templates/stop-page.js'),
//       context: {
//         stopId: stop.stopId,
//       }
//     })
//   })
}
