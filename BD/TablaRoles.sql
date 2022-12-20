
-- create table Roles

Drop table Roles;

create table Roles (
    id INTEGER PRIMARY KEY,
    idUsuario INTEGER NOT NULL, -- correo del usuario de la tabla Usuarios de firebase
    rol char(8) NOT NULL -- El rol de cada usuario podrá ser admin o user
);

Insert into Roles (id, idUsuario, rol) values (NULL, 'G322ky0TIzLFXlZqFtNMeCLSGjU2', 'admin');
Insert into Roles (id, idUsuario, rol) values (NULL, 'aa5OymlfK4afCOh4a80UGe9VA7b2', 'user');