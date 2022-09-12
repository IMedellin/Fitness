DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_bmi;
CREATE TABLE users(
  userid SERIAL,
  username VARCHAR(50),
  fullName VARCHAR(225),
  PRIMARY KEY(userid)
);
CREATE TABLE users_bmi(
  bmiid SERIAL,
  userid INT REFERENCES users,
  age INT,
  weight NUMERIC,
  height INT,
  PRIMARY KEY(bmiid)
);