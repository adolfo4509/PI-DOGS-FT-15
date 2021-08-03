create table breeds (
   id INTEGER  AUTOINCREMENT PRIMARY KEY ,
   name TEXT NOT NULL,
   life_span TEXT NOT NULL,
   weight TEXT NOT NULL,
   height TEXT NOT NULL,
   FOREIGN KEY(id) REFERENCES temperament(id)
   )

