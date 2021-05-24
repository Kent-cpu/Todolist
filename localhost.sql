-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Май 23 2021 г., 12:44
-- Версия сервера: 5.7.24
-- Версия PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `database`
--
CREATE DATABASE IF NOT EXISTS `database` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `database`;

-- --------------------------------------------------------

--
-- Структура таблицы `dela`
--

CREATE TABLE `dela` (
  `Id_d` int(10) UNSIGNED NOT NULL,
  `DateTime_d` datetime NOT NULL,
  `Text_d` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `dela`
--

INSERT INTO `dela` (`Id_d`, `DateTime_d`, `Text_d`) VALUES
(1, '2021-05-19 17:47:14', 'аоавллпл'),
(2, '2021-05-19 20:44:23', 'Вынести мусор.');

-- --------------------------------------------------------

--
-- Структура таблицы `prom`
--

CREATE TABLE `prom` (
  `Id_users` int(10) UNSIGNED NOT NULL,
  `Id_dela` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `prom`
--

INSERT INTO `prom` (`Id_users`, `Id_dela`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `Id` int(11) UNSIGNED NOT NULL,
  `Login` varchar(20) NOT NULL,
  `Password` varchar(32) NOT NULL,
  `Name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`Id`, `Login`, `Password`, `Name`) VALUES
(1, 'qwerty', '1234', 'Сергей'),
(2, 'asdfg', '98765', 'Евгений'),
(3, '123456', '123456', 'Егор');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `dela`
--
ALTER TABLE `dela`
  ADD PRIMARY KEY (`Id_d`);

--
-- Индексы таблицы `prom`
--
ALTER TABLE `prom`
  ADD PRIMARY KEY (`Id_users`,`Id_dela`),
  ADD KEY `Id_d` (`Id_dela`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Login` (`Login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `prom`
--
ALTER TABLE `prom`
  MODIFY `Id_users` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `dela`
--
ALTER TABLE `dela`
  ADD CONSTRAINT `dela_ibfk_1` FOREIGN KEY (`Id_d`) REFERENCES `users` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
