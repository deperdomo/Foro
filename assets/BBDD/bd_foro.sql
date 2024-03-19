-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-03-2024 a las 23:10:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_foro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `men_id` int(11) NOT NULL,
  `men_mensaje` mediumtext NOT NULL,
  `men_tema_id` int(11) NOT NULL,
  `men_usu_id` int(11) NOT NULL,
  `men_fecha_hora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`men_id`, `men_mensaje`, `men_tema_id`, `men_usu_id`, `men_fecha_hora`) VALUES
(41, '¡Hola a todos! ¿Alguien puede ayudarme con un problema de posicionamiento en CSS? Estoy tratando de centrar un elemento div en la página y no logro que funcione correctamente. ¡Cualquier consejo sería muy apreciado!', 2, 13, '2024-03-19 19:53:58'),
(42, '¡Hola a todos! Estoy trabajando en un proyecto en Python y me encuentro atascado con el manejo de archivos CSV. ¿Alguien tiene experiencia con la biblioteca csv de Python y puede darme algunos consejos sobre cómo leer y escribir archivos CSV de manera eficiente? ¡Gracias de antemano!', 27, 13, '2024-03-19 19:55:42'),
(43, '¡Hola! La biblioteca csv de Python es muy útil para trabajar con archivos CSV de manera eficiente. Puedes usar el módulo csv.reader para leer datos desde un archivo CSV y csv.writer para escribir datos en un archivo CSV. Recuerda manejar adecuadamente el manejo de archivos utilizando bloques with para asegurarte de que los archivos se cierren correctamente después de su uso.', 27, 14, '2024-03-19 19:58:12'),
(44, '¡Saludos, programadores! Tengo una pregunta sobre el manejo de excepciones en Java. ¿Cuál es la mejor práctica para manejar excepciones específicas versus excepciones genéricas en mis programas? ¡Agradezco cualquier orientación que puedan proporcionar!', 26, 14, '2024-03-19 19:59:25'),
(45, '¡Hola! Para centrar un elemento div en la página con CSS, puedes probar utilizando el método de alineación horizontal y vertical combinado con un ancho y alto fijo para el div. ', 2, 14, '2024-03-19 20:00:28'),
(46, '¡Buen día, comunidad! Tengo una consulta sobre formularios HTML. Estoy intentando crear un formulario con campos de entrada y botones, pero estoy teniendo problemas para alinear los elementos correctamente. ¿Alguien tiene sugerencias sobre cómo diseñar formularios HTML de manera efectiva?', 28, 2, '2024-03-19 20:04:42'),
(47, 'Hola, manejar excepciones en Java es crucial para escribir código robusto. Para excepciones específicas, es mejor atraparlas individualmente y manejarlas de manera adecuada según el contexto. Para excepciones genéricas, como Exception, es posible manejarlas en un bloque catch final para capturar cualquier excepción que no haya sido manejada específicamente. Recuerda siempre seguir el principio de manejo de excepciones adecuado para mantener tu código limpio y fácil de mantener.', 26, 1, '2024-03-19 20:06:09'),
(50, '¡Hola! Para diseñar formularios HTML de manera efectiva, te recomendaría usar un diseño basado en rejillas (grid) o flexbox para una mayor flexibilidad en el posicionamiento de los elementos. Además, asegúrate de utilizar etiquetas semánticas HTML como form, input, label, etc., para una mejor accesibilidad y SEO. Si puedes compartir tu código HTML actual, estaré encantado de ayudarte a resolver los problemas de alineación que estás experimentando.', 28, 1, '2024-03-19 20:10:29'),
(51, '¡Hola a todos! Estoy aprendiendo JavaScript y me encuentro con un desafío relacionado con los eventos del DOM. Quiero realizar ciertas acciones cuando se hace clic en un elemento de mi página, pero no estoy seguro de cómo implementarlo correctamente. ¿Alguien puede orientarme sobre cómo manejar eventos en JavaScript de manera adecuada?', 29, 1, '2024-03-19 20:11:22'),
(52, 'Respuesta: \"¡Hola! Para manejar eventos en JavaScript, primero necesitas seleccionar el elemento al que deseas agregar el evento utilizando document.querySelector o métodos similares. Luego, puedes agregar un \"escuchador\" de eventos utilizando addEventListener. ', 29, 14, '2024-03-19 20:13:12'),
(53, 'Mala respuesta para ponerle dislikes', 29, 3, '2024-03-19 20:51:46'),
(54, 'Comprobando el cambio de color del contador de Dislikes', 2, 3, '2024-03-19 21:04:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

CREATE TABLE `temas` (
  `tema_id` int(11) NOT NULL,
  `tema_tema` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `temas`
--

INSERT INTO `temas` (`tema_id`, `tema_tema`) VALUES
(2, 'CSS'),
(26, 'Java'),
(27, 'Python'),
(28, 'HTML'),
(29, 'JavaScript');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usu_id` int(11) NOT NULL,
  `usu_nombre` varchar(50) NOT NULL,
  `usu_alias` varchar(50) NOT NULL,
  `usu_password` varchar(256) NOT NULL,
  `usu_foto` varchar(50) NOT NULL,
  `usu_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usu_id`, `usu_nombre`, `usu_alias`, `usu_password`, `usu_foto`, `usu_admin`) VALUES
(1, 'administrador', 'administrador', '91f5167c34c400758115c2a6826ec2e3', 'u15.gif', 1),
(2, 'usuario', 'usuario', 'f8032d5cae3de20fcec887f395ec9a6a', 'u13.gif', 0),
(3, 'Pepe', 'pepe', '926e27eecdbc7a18858b3798ba99bddd', 'u06.gif', 0),
(7, 'Pepe2', 'pepe2', '926e27eecdbc7a18858b3798ba99bddd', 'anonimo.png', 0),
(8, 'Juana', 'juana', 'a94652aa97c7211ba8954dd15a3cf838', 'u03.gif', 0),
(12, 'x', 'x', '9dd4e461268c8034f5c8564e155c67a6', 'u02.gif', 0),
(13, 'Manuel', 'Manuel', '96917805fd060e3766a9a1b834639d35', 'u04.gif', 0),
(14, 'Deivi', 'Deivi', 'cfa0a58fb84cb2a83767c24c0d617a0f', 'u16.gif', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votos`
--

CREATE TABLE `votos` (
  `voto_id` int(11) NOT NULL,
  `usu_id` int(11) NOT NULL,
  `men_id` int(11) NOT NULL,
  `voto_positivo` tinyint(1) DEFAULT NULL,
  `voto_negativo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `votos`
--

INSERT INTO `votos` (`voto_id`, `usu_id`, `men_id`, `voto_positivo`, `voto_negativo`) VALUES
(105, 12, 51, 1, 0),
(106, 12, 51, 1, 0),
(107, 12, 51, 1, 0),
(108, 12, 53, 0, 1),
(109, 12, 51, 1, 0),
(110, 12, 53, 0, 1),
(111, 12, 51, 1, 0),
(112, 12, 52, 1, 0),
(113, 12, 52, 1, 0),
(114, 12, 53, 0, 1),
(115, 12, 53, 0, 1),
(116, 12, 44, 1, 0),
(117, 12, 44, 1, 0),
(118, 12, 42, 1, 0),
(119, 12, 42, 1, 0),
(120, 12, 50, 1, 0),
(121, 12, 50, 1, 0),
(122, 12, 50, 1, 0),
(123, 12, 52, 1, 0),
(124, 12, 46, 1, 0),
(125, 12, 46, 1, 0),
(126, 12, 41, 1, 0),
(127, 12, 41, 1, 0),
(128, 12, 45, 1, 0),
(129, 12, 45, 1, 0),
(130, 12, 51, 1, 0),
(131, 12, 51, 0, 1),
(132, 12, 51, 1, 0),
(133, 12, 53, 0, 1),
(134, 12, 51, 1, 0),
(135, 12, 43, 1, 0),
(136, 12, 43, 1, 0),
(137, 12, 54, 0, 1),
(138, 12, 54, 0, 1),
(139, 12, 52, 0, 1),
(140, 12, 52, 0, 1),
(141, 12, 52, 0, 1),
(142, 12, 52, 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`men_id`),
  ADD KEY `men_tema_id` (`men_tema_id`),
  ADD KEY `men_usu_id` (`men_usu_id`);

--
-- Indices de la tabla `temas`
--
ALTER TABLE `temas`
  ADD PRIMARY KEY (`tema_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usu_id`),
  ADD UNIQUE KEY `usu_alias` (`usu_alias`);

--
-- Indices de la tabla `votos`
--
ALTER TABLE `votos`
  ADD PRIMARY KEY (`voto_id`),
  ADD KEY `usu_id` (`usu_id`),
  ADD KEY `men_id` (`men_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `men_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `temas`
--
ALTER TABLE `temas`
  MODIFY `tema_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `votos`
--
ALTER TABLE `votos`
  MODIFY `voto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `fk_tema_mensajes` FOREIGN KEY (`men_tema_id`) REFERENCES `temas` (`tema_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`men_usu_id`) REFERENCES `usuarios` (`usu_id`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`men_tema_id`) REFERENCES `temas` (`tema_id`);

--
-- Filtros para la tabla `votos`
--
ALTER TABLE `votos`
  ADD CONSTRAINT `votos_ibfk_1` FOREIGN KEY (`usu_id`) REFERENCES `usuarios` (`usu_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `votos_ibfk_2` FOREIGN KEY (`men_id`) REFERENCES `mensajes` (`men_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
