CREATE DATABASE pract3;

USE pract3;

CREATE TABLE usuario (
	id INTEGER IDENTITY(1,1) NOT NULL, 
	nombres VARCHAR(50) NOT NULL,
	apellidos VARCHAR(150) NOT NULL,
	dpi VARCHAR(150) NOT NULL,
	no_cuenta VARCHAR(150) NOT NULL UNIQUE,
	saldo_inicial INTEGER NOT NULL,
	correo VARCHAR(150) NOT NULL,
	clave VARCHAR(25) NOT NULL,
	codigo INTEGER NOT NULL
);

CREATE TABLE transferencia (
	id INTEGER IDENTITY(1,1) NOT NULL, 
	id_usuario_envia INTEGER NOT NULL,
	id_usuario_recibe INTEGER NOT NULL,
	fecha DATETIME,
	monto FLOAT NOT NULL
);

ALTER TABLE usuario
	ADD CONSTRAINT usuario_pk
		PRIMARY KEY (id);

ALTER TABLE transferencia
	ADD CONSTRAINT transferencia_pk
		PRIMARY KEY (id);
		
ALTER TABLE transferencia
	ADD CONSTRAINT usuario_envia_fk 
		FOREIGN KEY (id_usuario_envia)
			REFERENCES usuario(id);

ALTER TABLE transferencia
	ADD CONSTRAINT usuario_recibe_fk 
		FOREIGN KEY (id_usuario_recibe)
			REFERENCES usuario(id);
