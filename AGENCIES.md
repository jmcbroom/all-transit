# Agencies

We currently show four transit agencies:

- DDOT
- SMART
- AAATA / The Ride
- Transit Windsor

```sql
---- this function will retrieve all possible route/dir pairs for a given feed_index/agency (in this case, SMART)
-- adjust the `vars` temporary table below to see other agencies;
-- kind of hacky but it's the only way to store variables in a vanilla psql query.
WITH vars AS ( SELECT 2 AS feed ) SELECT DISTINCT
r.route_id,
r.route_long_name,
T.direction_id
FROM
	routes r
	INNER JOIN trips T ON T.route_id = r.route_id
WHERE
	r.feed_index = ( SELECT feed FROM vars )
	AND T.feed_index = ( SELECT feed FROM vars )
order by route_id;
```
