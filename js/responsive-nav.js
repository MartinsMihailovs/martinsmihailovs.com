/* Show & hide main menu items */

jQuery(function($){
	// add class 'responsive-nav' to primary navigation              
	$('.nav-primary').addClass('responsive-nav');
	
   $('.nav-primary')
      // toggle the menu items' visiblity
      .find('.nav-trigger')
         .bind('click focus', function(){
            $(this).parent().toggleClass('expanded');
         });
});