$(document).ready(function() {

	/**************************************************
		Define variables 
	***************************************************/

	var $window = $(window),
	$siteHead = $(".site-head"),
	$navTrigger = $("<span class='nav-trigger'><span class='hamburger-top'></span><span class='hamburger-middle'></span><span class='hamburger-bottom'></span></span>"),
	$siteNav = $(".nav-primary");

	/**************************************************
		Call Fluidbox plugin
	***************************************************/
	$(".post-entry a, .foto a").fluidbox({
		immediateOpen: true
	});

	/**************************************************
		Site navigation
	***************************************************/

	// Add nav trigger element to the DOM

	$siteNav.prepend($navTrigger);

	// Show & hide main menu items

	var $navList = $(".nav-list");

	$(".nav-primary").addClass("responsive-nav");

	// Show/hide menu on mobile

	$navTrigger.on("click", function(e) {
		$navList.slideToggle(280, function(){
			$(this).attr('style', '').toggleClass("nav-list-open");
		});
		$(this).toggleClass("is-active");
		e.stopPropagation();
	});

	$(".responsive-nav").on("click", function(e) {
		e.stopPropagation();
	});

	// flag to allow clicking
	
	var clickAllowed = true;

	$(document).on("click", function() {
		if(clickAllowed) {
			$navList.slideUp(280, function(){
				$navList.attr('style', '').removeClass("nav-list-open");
			});
			$navTrigger.removeClass("is-active");
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