# Stop name standardization

`stop_name` patterns differ by agency:
- DDOT: separated by `&`, punctuation (eg `ST.`), all-caps, `stop_desc` populated
- Smart: separated by `&` or `@`, punctuation (eg `ROAD.`), all-caps, `stop_desc` null
- The Ride: separated by `+`, no punctuation, first letter capped, `stop_desc` populated using `&`
- Windsor: separated by `at`, punctuation, first letter capped, `stop_desc` null

Ideal formatting: 
- Separated by `&`
- No punctuation
- First letter of each word capitalized only

Pseudo code for postgres' `replace` and/or `regexp_replace` functions:
- find [` @ `, ` + `, ` at `] and replace with ` & `
- find `.` and replace with `''`

```sql
-- handle `@` and `+`
SELECT regexp_replace('Ouellette @ Montrose', '[@+|<>]', '&');
-->                    Ouellette & Montrose

-- handle `at`
SELECT replace('Ouellette at Montrose', ' at ', ' & ');
-->             Ouellette & Montrose

-- handle `.`
SELECT replace('Ouellette St. & Montrose Ave.', '.', '');
-->             Ouellette St & Montrose Ave

-- handle caseing
SELECT initcap('OUELLETTE ST & MONTROSE')
-->             Ouellette St & Montrose

-- syntax for updating the whole table
UPDATE table SET field = regexp_replace(field, from, to, optional_flags);
```

How we might implement?
- Combine these select statments into postgres function, trigger that function if `gtfs.stops` table is updated?

Where we might store values?
- Overwrite `stop_name` values directly in `gtfs.stops` table
- Overwrite `stop_desc` (only used by ddot, smart)
- Add a new column to `gtfs.stops` table and update values there
