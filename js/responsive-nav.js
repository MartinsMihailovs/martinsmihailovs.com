/* Show & hide main menu items */
$(document).ready(function(){

	var $navList = $(".nav-list");
	var $navTrigger = $(".nav-trigger");

	$(".nav-primary").addClass("responsive-nav");
	
	// Show/hide menu on mobile
	$navTrigger.on("click", function(e) {
		$navList.slideToggle(280, function(){
			$(this).attr('style', '').toggleClass("nav-list-open");
		});
		$(this).toggleClass("nav-trigger-active");
		e.stopPropagation();
	});

	$(".responsive-nav").on("click", function(e) {
		e.stopPropagation();
	});

	// Hide menu when clicked outside .responsive-nav
	$(document).on("click", function() {
		$navList.slideUp(280, function(){
			$navList.attr('style', '').removeClass("nav-list-open");
		});
		$navTrigger.removeClass("nav-trigger-active");
	});
	
});