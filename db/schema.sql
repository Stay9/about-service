DROP DATABASE IF EXISTS rental_hosts;
CREATE DATABASE rental_hosts;

 \c rental_hosts;

CREATE TABLE hosts (
  id int NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  join_in_date DATE NOT NULL,
  references_count int DEFAULT 0,
  verified boolean DEFAULT false,
  response_rate FLOAT,
  response_time int,
  languages varchar(255),
  email varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE listings (
  id INT NOT NULL,
  listing_name varchar(200) NOT NULL,
  host_id INT NOT NULL,
  city varchar(255)  NOT NULL,
  state varchar(255)  NOT NULL,
  country varchar(255)  NOT NULL,
  things_to_do varchar(500),
  description varchar(1000) NOT NULL,
  lat_location float,
  lon_location float,
  rating INT,
  photo_url varchar(255) NOT NULL,
  FOREIGN KEY (host_id) REFERENCES hosts(id),
  PRIMARY KEY (id)
);


CREATE TABLE reviews (
  id INT NOT NULL,
  user_id INT NOT NULL,
  list_id INT NOT NULL,
  rating INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES hosts(id),
  FOREIGN KEY (list_id) REFERENCES listings(id),
  PRIMARY KEY (id)
);
