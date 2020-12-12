<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Your Order</title>
</head>

<body>
	<?php

		// extract info from form in index.html
		extract ($_POST);

		// Array of items on menu
		$menuItems = array("Chicken Chop Suey", "Sweet and Sour Pork",
			"Shrimp Lo Mein", "Moo Shi Chicken", "Fried Rice");

		// Print out order details of each menu item
		echo "Your order:<p>";
		for ($i = 0; $i < 5; $i++) {
			if (${'quan' . $i} > 0) {
				echo "${'quan' . $i} $menuItems[$i] = ${'cost' . $i}<br />";
			}
		}

		// Print subtotal, tax, and total
		echo "<p>";
		echo "The subtotal is $subtotal<p>";
		echo "The tax is $tax<p>";
		echo "The total is $total<p>";

		if (($_POST['p_or_d']) == "pickup") {
			$dateInfo = getdate(date("U"));
			echo ("Please pick up your order on given date and time: ");
			echo "$dateInfo[weekday], $dateInfo[month] $dateInfo[mday], $dateInfo[year], $dateInfo[hours]:$dateInfo[minutes] (UTC)";

			// The email message
			$msg = "Hello $fname $lname,\nThank you for your order.\n
			Your total is $total. Please pick up your order on\n
			$dateInfo[weekday], $dateInfo[month] $dateInfo[mday], $dateInfo[year], $dateInfo[hours]:$dateInfo[minutes] (UTC)\n
			Have a nice day!";
		} else {
			$dateInfo = getdate(date("U"));
			echo ("Your order should be delivered on given date and time: ");
			echo "$dateInfo[weekday], $dateInfo[month] $dateInfo[mday], $dateInfo[year], $dateInfo[hours]:$dateInfo[minutes] (UTC)";

			// The email message
			$msg = "Hello $fname $lname,\nThank you for your order.\n
			Your total is $total. Your order should be delivered on:\n
			$dateInfo[weekday], $dateInfo[month] $dateInfo[mday], $dateInfo[year], $dateInfo[hours]:$dateInfo[minutes] (UTC)\n
			Have a nice day!";
		}

		// send email
		mail($email, "Your Order - Jade Delight", $msg);

	?>
</body>
</html>