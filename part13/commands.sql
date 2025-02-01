CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes int DEFAULT 0
);

insert into blogs (author, url, title) values ('Dan Abramov', 'www.dan.com', 'Writing Resilient Components');
insert into blogs (author, url, title) values ('Martin Fowler', 'www.martin.com', 'Is High Quality Software Worth the Cost?');
insert into blogs (author, url, title) values ('Robert C. Martin', 'www.robert.com', 'FP vs. OO List Processing');