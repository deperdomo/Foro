-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2024 a las 07:35:48
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_animales`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `cat_id` int(11) NOT NULL,
  `cat_nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`cat_id`, `cat_nombre`) VALUES
(1, 'Osos'),
(2, 'Loros'),
(3, 'Perros'),
(4, 'Caballos'),
(5, 'Gatos'),
(6, 'Tigres');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotos`
--

CREATE TABLE `fotos` (
  `foto_id` int(11) NOT NULL,
  `foto_foto` varchar(50) NOT NULL,
  `foto_cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fotos`
--

INSERT INTO `fotos` (`foto_id`, `foto_foto`, `foto_cat_id`) VALUES
(1, 'oso01.jpg', 1),
(2, 'oso02.jpg', 1),
(3, 'oso03.jpg', 1),
(4, 'oso04.jpg', 1),
(5, 'oso05.jpg', 1),
(6, 'oso06.jpg', 1),
(7, 'oso07.jpg', 1),
(8, 'oso08.jpg', 1),
(9, 'loro01.jpg', 2),
(10, 'loro02.jpg', 2),
(11, 'loro03.jpg', 2),
(12, 'loro04.jpg', 2),
(13, 'loro05.jpg', 2),
(14, 'loro06.jpg', 2),
(15, 'loro07.jpg', 2),
(16, 'loro08.jpg', 2),
(17, 'perro01.jpg', 3),
(18, 'perro02.jpg', 3),
(19, 'perro03.jpg', 3),
(20, 'perro04.jpg', 3),
(21, 'perro05.jpg', 3),
(22, 'perro06.jpg', 3),
(23, 'perro07.jpg', 3),
(24, 'perro08.jpg', 3),
(25, 'caballo01.jpg', 4),
(26, 'caballo02.jpg', 4),
(27, 'caballo03.jpg', 4),
(28, 'caballo04.jpg', 4),
(29, 'gato01.jpg', 5),
(30, 'gato02.jpg', 5),
(31, 'gato03.jpg', 5),
(32, 'gato04.jpg', 5),
(33, 'gato05.jpg', 5),
(34, 'gato06.jpg', 5),
(35, 'gato07.jpg', 5),
(36, 'gato08.jpg', 5),
(37, 'tigre01.jpg', 6),
(38, 'tigre02.jpg', 6),
(39, 'tigre03.jpg', 6),
(40, 'tigre04.jpg', 6),
(41, 'tigre05.jpg', 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indices de la tabla `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`foto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `fotos`
--
ALTER TABLE `fotos`
  MODIFY `foto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
