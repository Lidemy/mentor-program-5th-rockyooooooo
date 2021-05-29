<?php
  function isAdmin() {
    return !empty($_SESSION['username']);
  }
?>