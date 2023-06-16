CREATE DATABASE IF NOT EXISTS cursosdb;

USE cursosdb;

CREATE TABLE cursos (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(60),
  autor VARCHAR(60),
  duracion DECIMAL(65, 2) DEFAULT 0.0,
  clases INT(4) DEFAULT 0,
  PRIMARY KEY (id)
);

DESCRIBE cursos;

INSERT INTO cursos VALUES
  (1, 'Node: De cero a experto', 'Fernando Herrera', 29.0, 284),
  (2, 'Django y Django rest framework', 'Cristhian Santa Cruz', 41.0, 312),
  (3, 'Ingles Total', 'Ivan Serralde', 115.0, 546),
  (4, 'React: De cero a experto', 'Fernando Herrera', 54.0, 502);