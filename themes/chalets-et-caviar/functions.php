<?php 
	 add_action( 'wp_enqueue_scripts', 'chalets_et_caviar_enqueue_styles' );
	 function chalets_et_caviar_enqueue_styles() {
 		  wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' ); 
 		  } 
 ?>