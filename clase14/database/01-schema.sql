-- Conectarse a libreria_db y crear la tabla de libros
CREATE TABLE libros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    ejemplares INTEGER NOT NULL DEFAULT 0,
    portada_url TEXT
);
