<?php 
$result = file_get_contents("https://api.instagram.com/v1/users/self/media/recent/?access_token=1469072922.1e0882d.ae1f62b1abc14bf2b26801666b299312");
echo $result;
?>
