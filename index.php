$request_uri = $_SERVER['REQUEST_URI'];

// Определение маршрута и вызов соответствующего контента или обработчика
if ($request_uri == '/' || $request_uri == '/home') {
    include('home.php'); // Включить файл с контентом для главной страницы
} elseif ($request_uri == '/about') {
    include('about.php'); // Включить файл с контентом для страницы "О нас"
} elseif ($request_uri == '/contact') {
    include('contact.php'); // Включить файл с контентом для страницы "Контакты"
} else {
    include('404.php'); // Включить файл с контентом для страницы "404 Not Found", если маршрут не найден
}