<?php 
	
	// Переменные

	$name = $_POST['name'];
	$phone = $_POST['tel'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$theme = $_POST['theme'];

	// Переменные
	
	

	// Сообщение для почты

	$message_all = 
	"Сообщение из сайта Uwell: " .
	"\n\nИмя: " . $name.
	"\nТелефон: " . $phone.
	"\nE-mail: " . $email.
	"\nmessage: " . $message;

	// Сообщение для почты



	// Отправка на почту

	$ok = mail('hello@uwell.com.ua', $theme, $message_all); // mail('На какую почту отправлять', 'Тема сообщения', 'Сообщение'); 

	// Отправка на почту



	// Проверка отправки на почту

	if ($ok){
		echo true;
		/* sleep(2);
		header('Location: ' . $_SERVER['HTTP_REFERER']); */
	}else{
		echo 'Фэйл(((';
	}

	// Проверка отправки на почту
 ?>