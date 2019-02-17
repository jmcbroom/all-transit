# Route shape cleanup

Wrote a PL/Python function that will return GeoJSON given an OSRM URL like we have in our sheet. We can use this to populate a geometry column.

```sql
-- sudo apt-get install postgresql-plpython3-9.5
-- then:
create extension plpython3u;

-- add a geometry column to ddot
select AddGeometryColumn('public', 'ddot', 'geom', 4326, 'LINESTRING', 2);

-- define the function
CREATE OR REPLACE FUNCTION osrm_parse (u text)
  RETURNS text
AS $$

  import requests
  -- remove last two params & decode "%2C"
  split = u.replace('&hl=en&alt=0', '').replace("%2C", ",").split('&loc=')
  -- drop the https:// part
  split = split[1:]
  -- flip lat,lng to lng,lat
  fixed = []
  for s in split:
    reverse = s.split(',')
    fixed.append(reverse[1] + ',' + reverse[0])
  r = requests.get("http://router.project-osrm.org/route/v1/driving/" + ";".join(fixed) + "?geometries=geojson&overview=full")
  j = r.json()
  return j['routes'][0]['geometry']

$$ LANGUAGE plpython3u;

-- careful with which rows we update; this is slow and maybe we are rate-throttled
update ddot set geom = ST_SetSRID(ST_GeomFromGeoJSON(osrm_parse(osrm_url)), 4326) where osrm_url != '' and geom is null;
```

### Associate route shapes to stops

This will give a direct link from a `stop` to the `routeShapes` (route/direction combinations) that you can catch there.

```sql
CREATE OR REPLACE FUNCTION gtfs.stops_route_shapes ( stp gtfs.stops ) 
  RETURNS SETOF gtfs.route_shapes AS $$ 
SELECT DISTINCT
	( rs.* ) 
FROM
	gtfs.stops s
	INNER JOIN gtfs.stop_times st ON st.stop_id = s.stop_id 
	AND st.feed_index = s.feed_index
	INNER JOIN gtfs.trips t ON t.trip_id = st.trip_id 
	AND T.feed_index = st.feed_index
	INNER JOIN gtfs.routes r ON t.route_id = r.route_id 
	AND T.feed_index = r.feed_index
	INNER JOIN gtfs.route_shapes rs ON rs.route_id = r.route_id 
	AND rs.dir::INTEGER = t.direction_id 
	AND rs.feed_index = r.feed_index 
	AND rs.feed_index = t.feed_index 
WHERE
	s.stop_id = stp.stop_id 
	AND s.feed_index = stp.feed_index;
$$ LANGUAGE SQL STABLE;
```