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