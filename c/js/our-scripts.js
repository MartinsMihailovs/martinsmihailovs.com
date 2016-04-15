$(function() {

	/**************************************************
		Define variables
	***************************************************/

	var $siteNav = $(".site-nav"),
		$navTrigger = $(".nav-trigger"),
		$pageContent = $('.page'),
		$pageOverlay = $('<div class="page-overlay">'),
		$sidebarMobile = $('.sidebar-mobile'),
		$btnOpenSidebarMobile = $('.btn-open-sidebar-mobile'),
		$btnCloseSidebarMobile = $('.btn-close-sidebar-mobile'),
		$removeAttachmentBtn = $('.attachments-item-btn-remove'),
		$chatMsgs = $('.chat-msgs'),
		clickAllowed = true;

	/**************************************************
		Flag document click
	***************************************************/

	// check if browser size is compatible with click event
	var isClickAllowed = function() {
		
		//if browser size is ok, do the click function
		if($(window).width() <= 850){
			clickAllowed = true;
		}
		else{
			// if browser size is greater than expected, disallow clicking
			clickAllowed = false;
		}
	};

	isClickAllowed();

	/**************************************************
		Code that should execute on window resize
	***************************************************/

	$(window).on("resize", function() {
		isClickAllowed();
		
		if ($chatMsgs.length) {
			setChatMsgsHeight();
		}
	});

	/**************************************************
		Page overlay
	***************************************************/

	$pageOverlay.insertBefore('.page');

	function activatePageOverlay() {
		$pageOverlay.fadeToggle(200, function(){
			$(this).attr('style', '').toggleClass("page-overlay-active");
		});
	}

	function deactivatePageOverlay() {
		$pageOverlay.fadeOut(200, function(){
			$(this).attr('style', '').removeClass("page-overlay-active").removeClass('page-overlay-user-chat');
		});
	}

	/**************************************************
		Site navigation
	***************************************************/

	$siteNav.addClass("site-nav-responsive");
	

	// Show/hide menu on mobile if responsive class is present

	if($siteNav.hasClass("site-nav-responsive")) {
		$navTrigger.on("click", function(e) {
			$siteNav.slideToggle(280, function(){
				$(this).attr('style', '').toggleClass("site-nav-open");
			});
			$(this).toggleClass("is-active");

			activatePageOverlay();

			e.stopPropagation();
		});

		$(".site-nav-responsive").on("click", function(e) {
			e.stopPropagation();
		});

		$(document).on("click", function() {
			if(clickAllowed) {

				$siteNav.slideUp(280, function(){
					$siteNav.attr('style', '').removeClass("site-nav-open");
				});

				closeSidebarMobile();

				$navTrigger.removeClass("is-active");

				deactivatePageOverlay();
			}
		});

		$sidebarMobile.on('swiperight', function() {
			closeSidebarMobile();
			deactivatePageOverlay();
		});
	}

	/**************************************************
		Add class to 'attachment-item' when its delete btn is hovered
	***************************************************/

	$removeAttachmentBtn.hover(function() {
		$(this).parent().addClass('attachments-item-delete-alert');
	}, function() {
		$(this).parent().removeClass('attachments-item-delete-alert');
	});

	/**************************************************
		Sidebar animation from right on mobile
	***************************************************/
	
	$sidebarMobile.addClass('sidebar-mobile-activated');

	$btnOpenSidebarMobile.on('click', function(e) {
		$('.sidebar-mobile-activated').animate({
			right: 0
		}, 200, 'swing', function() {
			$(this).attr('style', '').toggleClass('sidebar-mobile-active');
		});

		e.stopPropagation();

		$pageOverlay.toggleClass('page-overlay-user-chat');

		activatePageOverlay();
	});

	function closeSidebarMobile() {
		if($('.sidebar-mobile-activated').hasClass('sidebar-mobile-active')) {
			$('.sidebar-mobile-activated').animate({
				right: -300
			}, 200, 'swing', function() {
				$(this).attr('style', '').removeClass('sidebar-mobile-active');
			});
		}
	}

	$btnCloseSidebarMobile.on('click', function() {
		closeSidebarMobile();
		deactivatePageOverlay();
	});

	$sidebarMobile.on('swiperight', function() {
		closeSidebarMobile();
		deactivatePageOverlay();
	});

	$sidebarMobile.on("click", function(e) {
		e.stopPropagation();
	});

	/**************************************************
		Set chat window height on mobile devices. To cover 100% height
	***************************************************/


	function setChatMsgsHeight() {

		var chatFormHeight = $('.chat-new-msg').outerHeight(true),
			ChatMsgsPosition = $chatMsgs.position(),
			ChatMsgsPositionTop = ChatMsgsPosition.top;

		if($(window).width() <= 850){
			$chatMsgs.css('height', $(window).height()  - chatFormHeight - ChatMsgsPositionTop);
		}
		else{
			$chatMsgs.css('height', '');
		}
	}

	if ($chatMsgs.length) {
		setChatMsgsHeight();
	}

	/**************************************************
		Tabbing functionality
	***************************************************/

	var $tabAnchors = $('.nav-tabs > li');

	$('.tab-pane').not('.tab-pane-active').addClass('hidden');
	$('.nav-tabs').on('click', 'a', function(e) {
		var currentAttrValue = $(this).attr('href');
		// Show/Hide Tabs
		$('.tab-pane' + currentAttrValue).fadeIn(300).siblings().hide();

		if ($chatMsgs.length) {
			setChatMsgsHeight();
		}

		// Change/remove current tab to active
		$(this).parent().siblings().removeClass('nav-tabs-active');
		$(this).parent().addClass('nav-tabs-active');
		e.preventDefault();
	});

	/**************************************************
		Show content based on selected value
	***************************************************/

	var $selectedDesc = $('.selected-desc');

	$('.select-show-content').change(function() {
        var val = $(this).val();
        if (val) {
            $('.selected-desc:not(#selected-desc-' + val + ')').hide();
            $('#selected-desc-' + val).fadeIn();
        } else {
            $selectedDesc.hide();
        }
    });

    /**************************************************
		Order details hide/show
	***************************************************/

	var $orderDetails = $('.order-details').addClass('order-details-accordion');

	$('.item-list-orders').on('click', '.item-txt', function() {
		var $targetOrderDetails = $(this).parent().next();
		$targetOrderDetails.slideToggle(300);
		$orderDetails.not($targetOrderDetails).slideUp(300);
	});

	/**************************************************
		Confirm click action on certain buttons
	***************************************************/

	$(document).on('click', '.confirm-action', function() {
		var $actionTxt = $(this).text();
		confirm($actionTxt + '? Ты уверен?');
	});
	
});