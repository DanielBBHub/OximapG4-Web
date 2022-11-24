
-- create table Micros

DROP TABLE Micros;

create table Micros(

    id INTEGER primary key,
    correoUser varchar(20) NOT NULL,
    IdMicro int NOT NULL,
    Disponibilidad boolean NOT NULL,
    UltimaVezActivo DATE NOT NULL

);

INSERT INTO Micros VALUES (NULL,'alba.olivern@gmail.com',111,1,'2019-05-01');
INSERT INTO Micros VALUES (NULL,'hola@gmail.com',222,1,'2019-05-01');
INSERT INTO Micros VALUES (NULL,'prueba23@gmail.com',333,0,'2019-07-01');