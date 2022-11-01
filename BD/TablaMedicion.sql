
-- create table Medicion

DROP TABLE Medicion;
create table Medicion (
    id INTEGER PRIMARY KEY,
    muestra char(8) NOT NULL,
    fecha DATE NOT NULL,
    usuario char(12) NOT NULL
);