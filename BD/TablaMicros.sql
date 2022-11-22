
-- create table Micros

DROP TABLE Micros;

create table Micros(

    id INTEGER primary key,
    correoUser varchar(20) NOT NULL,
    IdMicro int NOT NULL,
    Disponibilidad boolean NOT NULL,
    UltimaVezActivo DATE NOT NULL

);