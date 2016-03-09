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

	/**************************************************
	Parallax effect for bg images
	***************************************************/

	// var bgLayer = $(".featured-image");

	// $(window).on("scroll", function() {
	// var top = pageYOffset;
	// bgLayer.css("background-position", 'left ' + 0 + ' bottom ' + (top * -0.5) + 'px');
	// //bgLayer.css("background-position", 'center ' + (top * 0.5) + 'px');
	// });

	/**************************************************
	Background img animation for BalticWall case study title
	***************************************************/

	var bwTitle = $(".project-best-baltic-brands-in").find(".project-subtitle");
	var bgSize;
	$(window).on("scroll", function() {
		var top = pageYOffset;
		bwTitle.css("background-size", 100 - (top * 0.18) + '%' + '30%');
	});

 

});

/**************************************************
Add youtube video to page via api. This allows to play hd 
***************************************************/

// 1. This code loads the IFrame Player API code asynchronously.  
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: 'auto',
		width: '100%',
		videoId: 'gU6UROuQZw0',
		playerVars: {
			'rel': 0,
			'showinfo': 0,
        },
		events: {
		'onReady': onPlayerReady
		}
	});
}

// 3. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	player.setPlaybackQuality('hd720'); // Here we set the quality (yay!)
}