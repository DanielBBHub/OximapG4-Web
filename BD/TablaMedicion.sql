
-- create table Medicion

DROP TABLE Medicion;
create table Medicion (
    id INTEGER PRIMARY KEY,
    muestra char(8) NOT NULL,
    tipo char(12) NOT NULL,
    fecha DATE NOT NULL,
    usuario char(12) NOT NULL,
    latitud float NOT NULL,
    longitud float NOT NULL
);
INSERT INTO Medicion VALUES (NULL, "1234", "Ozono", '2022-10-18', "Dani", 38.999794344442414, -0.16320239995270047);
INSERT INTO Medicion VALUES (NULL, "1235", "Ozono",'2022-10-19', "Dani", 38.999469165763365, -0.16296636556388053);