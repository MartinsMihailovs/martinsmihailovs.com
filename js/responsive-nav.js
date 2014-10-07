/* Show & hide main menu items */
$(document).ready(function(){

	$(".nav-primary").addClass("responsive-nav");
	
	// Show/hide menu on mobile
	$(".nav-trigger").on("click", function() {
		$(".nav-list").slideToggle(280, function(){
			$(this).attr('style', '').toggleClass('nav-list-open');
		});
		$(this).toggleClass("nav-trigger-active");
	});
	
});