
-- create table Roles

Drop table Roles;

create table Roles (
    id INTEGER PRIMARY KEY,
    CorreoUsuario char(20) NOT NULL, -- correo del usuario de la tabla Usuarios de firebase
    rol char(8) NOT NULL -- El rol de cada usuario podrá ser admin o user
);

Insert into Roles (id, CorreoUsuario, rol) values (NULL, 'carlosipiens@gmail.com', 'admin');
Insert into Roles (id, CorreoUsuario, rol) values (NULL, 'alba.olivern@gmail.com', 'user');