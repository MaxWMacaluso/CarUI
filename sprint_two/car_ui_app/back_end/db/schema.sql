-- This file doesn't actually do anything but define the shape and structure of our DB

CREATE TABLE profile(
    profile_id BIGSERIAL PRIMARY KEY NOT NULL,
    profile_name VARCHAR(50) NOT NULL,
    profile_last_updated VARCHAR(50),
    profile_password_hashed VARCHAR(50) NOT NULL,
    unique(profile_name)
);

CREATE TABLE tokens(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  access_token VARCHAR(500) NOT NULL,
  profile_id BIGSERIAL NOT NULL,
  FOREIGN KEY(profile_id) REFERENCES profile(profile_id)
);

CREATE TABLE image(
    img_id BIGSERIAL PRIMARY KEY NOT NULL,
    img_source VARCHAR(1000),
    img_transform VARCHAR(1000),
    img_transform_origin VARCHAR(50),
    profile_id BIGSERIAL NOT NULL,
    FOREIGN KEY(profile_id) REFERENCES profile(profile_id)
);



--REFERENCES denotes a Forigen Key