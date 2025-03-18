
CREATE DATABASE igm_db;
GO


USE igm_db;
GO

CREATE TABLE Usuarios (
    id_usuario UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Contrasenia VARCHAR(100) NOT NULL,
    Rol BIT NOT NULL, 
    Estado BIT NOT NULL 
GO

CREATE TABLE Pais (
    id_pais INT PRIMARY KEY,
    NombrePais VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Pasaportes (
    id_pasaporte BIGINT PRIMARY KEY IDENTITY(1000000000000, 1),
    TipoPasaporte INT NOT NULL, 
    FechaEmision DATE NOT NULL,
    FechaVencimiento DATE NOT NULL,
    Lugar VARCHAR(100),
    Id_pais INT FOREIGN KEY REFERENCES Pais(id_pais),
    Id_usuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Usuarios(id_usuario),
    Estado BIT NOT NULL 
);
GO
