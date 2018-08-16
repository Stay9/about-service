/*
Script for selecting some columns from a sql database
and writing them to a csv.
*/

DO $$
begin
  for counter IN 1..10000000 LOOP
    insert into temp (first_name, listing_id) select hosts.first_name, listings.id from hosts INNER JOIN listings
ON listings.host_id = hosts.id where listings.id = counter;

  END LOOP;
END; $$