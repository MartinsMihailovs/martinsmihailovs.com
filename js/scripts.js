$(document).ready(function() {

	/* Show & hide main menu items */

	var $window = $(window),
		$navList = $(".nav-list"),
		$navTrigger = $(".nav-trigger");

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

	// flag to allow clicking
	var clickAllowed = true;

	$(document).on("click", function() {
		if(clickAllowed) {
			$navList.slideUp(280, function(){
				$navList.attr('style', '').removeClass("nav-list-open");
			});
			$navTrigger.removeClass("nav-trigger-active");
		}
	});

	// check if browser size is compatible with click event
	var onResize = function() {
		
		//if browser size is ok, do the click function
		if($(window).width() <= 600){
			clickAllowed = true;
		}
		else{
			// if browser size is greater than expected, disallow clicking
			clickAllowed = false;
		}
	};

	onResize();

	$(window).on("resize", onResize);

});