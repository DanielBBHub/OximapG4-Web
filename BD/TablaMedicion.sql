
-- create table Medicion

DROP TABLE Medicion;
create table Medicion (
    id INTEGER PRIMARY KEY,
    muestra char(8) NOT NULL,
    fecha DATE NOT NULL,
    usuario char(12) NOT NULL
);
INSERT INTO Medicion VALUES (NULL, "1234", '2022-10-18', "Dani");
INSERT INTO Medicion VALUES (NULL, "1235", '2022-10-19', "Dani");