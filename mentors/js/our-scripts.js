$(function() {
	/**************************************************
		Call Chosen plugin
	***************************************************/

	$(".chosen-select").chosen({no_results_text: "Nekas netika atrasts", width: "100%", allow_single_deselect: true, disable_search_threshold: 5});

	/**************************************************
		Call Fluidbox plugin
	***************************************************/
	$('.post-gallery a').fluidbox({
		immediateOpen: true
	});

	/**************************************************
		Show/Hide posts filter options
	***************************************************/

	var $postsFilterItem = $(".posts-filter-item-secondary"),
		$postsFilterItemSecondary  = $(".posts-filter-item-secondary");

	// Add .is-hidden class to $postsFilterItemSecondary
	function isFilterItemSecondaryHidden() {
		if($postsFilterItem.css("float") == "left"){
			$postsFilterItemSecondary.removeClass("is-hidden");
		} else {
			$postsFilterItemSecondary.addClass("is-hidden");
		}
	}

	isFilterItemSecondaryHidden();

	$(window).on("resize", isFilterItemSecondaryHidden);

	// Show $postsFilterItemSecondary when cursor is in search field
	$("input[type=search]").on("focus click", function() {
		$postsFilterItemSecondary.slideDown(280);
	});

	/**************************************************
		Dropdowns functionality
	***************************************************/

	var $dropdownUser = $(".dropdown-user"),
		$dropdownListUser = $(".dropdown-list-user");

	$dropdownListUser.addClass("is-hidden").on("click", function(e) {
		e.stopPropagation();
	});

	$dropdownUser.on("click", function(e) {
		if($(".site-tagline").css("display")=="none") {
			$dropdownListUser.slideToggle(240, function(){
				$(this).attr("style", "").toggleClass("is-hidden");
			});
		} else {
			$dropdownListUser.slideToggle(130, function(){
				$(this).attr("style", "").toggleClass("is-hidden");
			});
		}
		$dropdownUser.toggleClass("is-active");
		e.stopPropagation();
	});

	$(document).on("click", function() {
		if($(".site-tagline").css("display")=="none") {
			$dropdownListUser.slideUp(240, function(){
				$(this).attr('style', '').addClass("is-hidden");
			});
		} else {
			$dropdownListUser.fadeOut(160, function(){
				$(this).attr('style', '').addClass("is-hidden");
			});
		}
		$dropdownUser.removeClass("is-active");
	});

	/**************************************************
		Add hover effect when deleting Gallery images
	***************************************************/

	$('.btn-delete-gallery-img').hover(function(){
		$(this).next().animate({opacity: 0.5}, 100);
	}, function() {
		$(this).next().animate({opacity: 1}, 100);
	});

	/**************************************************
		Initialize autosize on post title textarea
	***************************************************/

	autosize($(".input-autosize"));

	/**************************************************
		Show profile edit form fields
	***************************************************/

	$(".text-to-input-input").hide();

	$(".btn-group-edit-profile").on("click", ".btn-edit-profile", function(a){
		a.preventDefault();
		$(".text-to-input-txt").hide();
		$(".text-to-input-input").show();
		$(".input-user-job-title").focus();

		var btnGroupEditProfileActive = "<button class=\"btn btn-primary btn-sm btn-save-edit-profile\">Saglabāt</button>&nbsp;<button class=\"btn btn-secondary btn-sm btn-cancel-edit-profile\">Atcelt</button>";

		$(".btn-group-edit-profile").html(btnGroupEditProfileActive);

		$(".profile-cover-img").addClass("profile-cover-img-active");
	});

	$(".btn-group-edit-profile").on("click", ".btn-cancel-edit-profile", function(){
		$(".text-to-input-txt").show();
		$(".text-to-input-input").hide();

		var btnGroupEditProfileDefaut = "<button class=\"btn btn-primary btn-sm btn-edit-profile\" href=\"edit-profile.html\">Labot profilu</button>";

		$(".btn-group-edit-profile").html(btnGroupEditProfileDefaut);

		$(".profile-cover-img").removeClass("profile-cover-img-active");
	});

	/**************************************************
		Overlay functionality
	***************************************************/

	$(".btn-login").on("click", function(e) {
			$(".overlay").fadeIn(150);
		e.preventDefault();
	});

	$(".close-overlay").on("click", function() {
		$(".overlay").fadeOut(200);
	});
	
});