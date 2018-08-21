\set num random(5000000, 10000000)
begin;
/* Tests to run.  Uncomment one to run it. */

-- select * from hosts where id = :num;
-- select * from listings where host_id = :num;
-- select host_id from listings where id = :num;
-- select * from hosts, listings where hosts.first_name = 
-- select first_name from hosts where id = :num;
-- select listings.listing_name from hosts, listings where hosts.first_name = (select first_name from hosts where id = :num) AND hosts.id = listings.host_id;
-- SELECT first_name FROM hosts WHERE id IN (SELECT host_id FROM listings WHERE id = :num);
-- select listing_name from hosts, listings where hosts.first_name = (select first_name from hosts where id = :num) AND hosts.id = listings.host_id;
-- select hosts.first_name, listings.id from hosts INNER JOIN listings ON listings.host_id = hosts.id where listings.id = :num;
-- select hosts.id,  hosts.first_name, listings.id from hosts INNER JOIN listings ON listings.host_id = hosts.id where hosts.id = :num;
end;

