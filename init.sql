
CREATE ROLE api_user WITH LOGIN PASSWORD 'password';
ALTER ROLE api_user CREATEDB;

CREATE DATABASE kube_db;


\c kube_db

CREATE TABLE ping_count
(
    count INT NOT NULL
);

-- Insert rows into table 'TableName'
INSERT INTO ping_count
( -- columns to insert data into
 COUNT
)
VALUES
( -- first row: values for the columns in the list above
  0
);
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO api_user;