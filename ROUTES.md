# Routes

## timepoint cleanup

How to get the timepoints:

```sql
---- this function will retrieve a list of stop times for the trip with the most stops.
-- adjust the `vars` below, similar to the above function.
WITH vars AS ( SELECT 4::integer AS feed, '9'::text AS route_id, '1'::text AS direction_id ),
-- `trips` is a CTE to grab the longest/most stops trip
trips AS (
	SELECT
		tr.trip_id
	FROM
		gtfs.trips tr
		INNER JOIN gtfs.stop_times st ON st.trip_id = tr.trip_id
	WHERE
		route_id::text = ( SELECT route_id FROM vars )
		AND direction_id::text = ( SELECT direction_id FROM vars )
		AND st.feed_index::integer = ( SELECT feed FROM vars )
		AND tr.feed_index::integer = ( SELECT feed FROM vars )
	GROUP BY
		tr.trip_id
	ORDER BY
		random()
		LIMIT 1
	)
SELECT
	st.arrival_time,
	s.stop_id,
	s.stop_name,
	st.stop_sequence
FROM
	gtfs.stop_times st
	INNER JOIN gtfs.stops s ON s.stop_id = st.stop_id
WHERE
	st.trip_id = ( SELECT trip_id FROM trips )
	AND s.feed_index = ( SELECT feed FROM vars )
	AND st.feed_index = ( SELECT feed FROM vars )
ORDER BY
st.stop_sequence;
```

How to set the timepoints:

```sql
with timepoints as (
  select
    feed :: integer as feed_index,
    route_id,
    dir :: integer as direction_id,
    unnest(regexp_split_to_array(timepoints, ',\s?')) as stop_id
  from
    ann_arbor
)
UPDATE
  gtfs.stop_times
SET
  timepoint = 1
from
  timepoints
where
  stop_times.trip_id in (
    select
      trip_id
    from
      gtfs.trips
    where
      trips.route_id = timepoints.route_id
      and trips.feed_index = timepoints.feed_index
      and trips.direction_id = timepoints.direction_id
  )
  and stop_times.stop_id = timepoints.stop_id
  and stop_times.feed_index = timepoints.feed_index;

```

## shape cleanup

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

#### For SMART

```sql
select AddGeometryColumn('public', 'smart', 'geom', 4326, 'LINESTRING', 2);
update smart set geom = ST_SetSRID(ST_GeomFromGeoJSON(osrm_parse(osrm_url)), 4326) where osrm_url != '' and geom is null;
alter table smart alter column feed type integer using feed::integer;
alter table smart rename column feed to feed_index;
insert into gtfs.route_shapes (select * from public.smart);
```

### DDOT route clean up

```sql
-- trim leading zero
update gtfs.routes set route_short_name = TRIM(leading '0' from route_short_name) where feed_index = 1;

-- set colors & sort order
-- normal green
update gtfs.routes set route_color = '44AA42', route_sort_order = 2 where feed_index = 1;
-- connect ten
update gtfs.routes set route_color = '004445', route_sort_order = 1 where feed_index = 1 and route_short_name::integer < 11;
-- crosstown
update gtfs.routes set route_color = '0079C2' where feed_index = 1 and route_short_name in ('11', '15', '17', '32','38', '39', '43', '45', '47');
-- north-south
update gtfs.routes set route_color = '9B5BA5' where feed_index = 1 and route_short_name in ('12', '13', '30', '41', '46', '54', '60', '68');
-- special
update gtfs.routes set route_color = 'D07C32', route_sort_order = 3 where feed_index = 1 and route_short_name in ('42', '80', '89', '92', '95', '96');

-- initcap names & fix special case
update gtfs.routes set route_long_name = initcap(route_long_name) where feed_index = 1;
update gtfs.routes set route_long_name = 'McNichols' where feed_index = 1 and route_long_name = 'Mcnichols';
```

### SMART route clean up

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
