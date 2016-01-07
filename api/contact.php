<?php
    $email_to = "info@ragam.org.in";
 
    $email_subject = "Website Query";
   
    function died($error) {
 
        $response = array();

        $response["code"] = 1;
        $response['error'] = $error;

        echo json_encode($response);
 
        die();
 
    }

 
    // validation expected data exists
 
    if(!isset($_POST['contact_name']) ||
 
        !isset($_POST['contact_email']) ||
 
        !isset($_POST['contact_message']) ||
 
        !isset($_POST['contact_spam'])) {
 
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
 
    }
 
     
 
    $first_name = htmlspecialchars($_POST['contact_name']); // required
 
    $email = htmlspecialchars($_POST['contact_email']); // required
 
    $message = htmlspecialchars($_POST['contact_message']); // required
 
    $spam = htmlspecialchars($_POST['contact_spam']); // required
 
 	if(isset($_POST['contact_college'])) {
 		$college = htmlspecialchars($_POST['contact_college']); // required
 	}
    
 
    $error_message = "";
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  	if(!preg_match($email_exp,$email)) {
 
    	$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
 
  	}
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  	if(!preg_match($string_exp,$first_name)) {
 
    	$error_message .= 'The First Name you entered does not appear to be valid.<br />';
 
  	}
 
 
  	if(strlen($error_message) > 0) {
 
    	died($error_message);
 
  	}
 
    $email_message = "Form details below.\n\n";
 
     
 
    function clean_string($string) {
 
     	$bad = array("content-type","bcc:","to:","cc:","href");
 
      	return str_replace($bad,"",$string);
 
    }
 
     
 
    $email_message .= "First Name: ".clean_string($first_name)."\n";
 
    $email_message .= "Email: ".clean_string($email)."\n";
 
    $email_message .= "Message: ".clean_string($message)."\n";
 
     
 
     
 
	// create email headers
 
	$headers = 'From: '.$email."\r\n".
 
	'Reply-To: '.$email."\r\n" .
 
	'X-Mailer: PHP/' . phpversion();
 
	@mail($email_to, $email_subject, $email_message, $headers);  


	//response to frontend
	$response = array();

    $response["code"] = 0;

    echo json_encode($response);
?>
