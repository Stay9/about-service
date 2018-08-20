

CREATE TABLE hosts (
  id SERIAL PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  join_in_date DATE NOT NULL,
  references_count int DEFAULT 0,
  verified boolean DEFAULT false,
  response_rate FLOAT,
  response_time int,
  languages varchar(255),
  email varchar(255) NOT NULL
  -- PRIMARY KEY (id)
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  listing_name varchar(200) NOT NULL,
  host_id INT NOT NULL REFERENCES hosts(id),
  city varchar(255)  NOT NULL,
  state varchar(255)  NOT NULL,
  country varchar(255)  NOT NULL,
  things_to_do varchar(500),
  description varchar(1000) NOT NULL,
  lat_location float,
  lon_location float,
  rating INT,
  photo_url varchar(255) NOT NULL
  -- FOREIGN KEY (host_id) REFERENCES hosts(id),
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL references hosts(id),
  list_id INT NOT NULL REFERENCES listings(id),
  rating INT NOT NULL
);


COPY hosts (list everything) from 'absolute path' DELIMITER ',' CSV;