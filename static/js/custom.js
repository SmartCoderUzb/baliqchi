jQuery(document).ready(function(){
	jQuery(".collapse_btn").click(function(){
		jQuery(this).hide();
		jQuery(this).next(".collapse_text").collapse("show");
	});
	jQuery(".collapse_less_btn").click(function(){
		jQuery(this).parent().collapse("hide");
		jQuery(this).parent().prev().show();
	});

    loadGallery(true, 'a.photogallery');
    loadGallery(true, 'a.persongalleryimg');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current){
        jQuery('#show-previous-image, #show-next-image').show();
        if(counter_max == counter_current){
            jQuery('#show-next-image').hide();
        } else if (counter_current == 1){
            jQuery('#show-previous-image').hide();
        }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr){
        var current_image,
            selector,
            counter = 0;

        jQuery('#show-next-image, #show-previous-image').click(function(){
            if(jQuery(this).attr('id') == 'show-previous-image'){
                current_image--;
            } else {
                current_image++;
            }

            selector = $('[data-image-id="' + current_image + '"]');
            updateGallery(selector);
        });

        function updateGallery(selector) {
            var $sel = selector;
            current_image = $sel.data('image-id');
            jQuery('#image-gallery-caption').text($sel.data('caption'));
            jQuery('#image-gallery-title').text($sel.data('title'));
            jQuery('#image-gallery-image').attr('src', $sel.data('image'));
            disableButtons(counter, $sel.data('image-id'));
        }

        if(setIDs === true){
            jQuery('[data-image-id]').each(function(){
                counter++;
                jQuery(this).attr('data-image-id',counter);
            });
        }
        jQuery(setClickAttr).on('click',function(){
            updateGallery($(this));
        });
    }
	
	jQuery('.js-input').each(function(){
		if(jQuery(this).val()){
	     jQuery(this).addClass('not-empty');
	  }
	});
	jQuery('.js-input').change(function() {
	  if(jQuery(this).val()) {
	     jQuery(this).addClass('not-empty');
	  } else {
	     jQuery(this).removeClass('not-empty');
	  }
	});
	jQuery('.upload-file #file').change(function(){
		var files = jQuery(this).prop('files');
		jQuery(this).next().next('label').text(files[0].name);
	});
	jQuery("#vacanciesform").validate({
		errorPlacement: function($this, $place, $element) {
		}
	});
	jQuery("#individualsform").validate({
		errorPlacement: function($this, $place, $element) {
		}
	});
	jQuery("#legalEntitiesform").validate({
		errorPlacement: function($this, $place, $element) {
		}
	});	
	// For Search Box
	jQuery('#mm-search .search_btn').click(function(){
		jQuery(this).prev().toggleClass('active');
	});
	jQuery(".totop").click(function(){
		jQuery("html, body").animate({scrollTop:0}, 600);
	});
	jQuery('.partner_wrap').slick({
		dots: false,
		arrows: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
  		autoplaySpeed: 2000,
  		infinite: true,
  		//variableWidth: true,
  		centerPadding: '0px',
		  responsive: [
		    {
		      breakpoint: 1199,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    }
		  ]		  
	});
	jQuery('.slider-text > li').hide();
	jQuery('.slider-text > li:first-child').show();

	// For News page
	if(jQuery(".news_list .row").length > 0) {
	  var grid = document.querySelector('.news_list .row');

	  var msnry = new Masonry( grid, {
	    itemSelector: '.news_item_wrap',
	    columnWidth: '.grid-sizer',
	    gutter: 0,
	    percentPosition: true
	  });

	  imagesLoaded( grid ).on( 'progress', function() {
	    // layout Masonry after each image loads
	    msnry.layout();
	  });
	}


	// hall of fame page dropdown menu
	function DropDown(el) {
		this.dd = el;
		this.placeholder = this.dd.children('span');
		this.opts = this.dd.find('ul.dropdown > li');
		this.val = '';
		this.index = -1;
		this.initEvents();
	}
	DropDown.prototype = {
		initEvents : function() {
			var obj = this;

			obj.dd.on('click', function(event){
				jQuery(this).toggleClass('active');
				return false;
			});

			obj.opts.on('click',function(){
				var opt = jQuery(this);
				obj.val = opt.text();
				obj.index = opt.index();
				obj.placeholder.text(obj.val);
			});
		},
		getValue : function() {
			return this.val;
		},
		getIndex : function() {
			return this.index;
		}
	};

	jQuery(function() {
		var dd = new DropDown( jQuery('#dd') );
		jQuery(document).click(function() {
			// all dropdowns
			jQuery('.wrapper-dropdown-3').removeClass('active');
		});
	});
	jQuery(function() {
		var dd = new DropDown( jQuery('#languageMobile') );
		jQuery(document).click(function() {
			// all dropdowns
			jQuery('.language-sm').removeClass('active');
		});
	});
	jQuery('#languageMobile li a').click(function()
	{
	    window.location = jQuery(this).attr('href');
	});
	jQuery(function() {
		var dd = new DropDown( jQuery('#regionalBox') );
		jQuery(document).click(function() {
			// all dropdowns
			jQuery('.regional-box').removeClass('active');
		});
	});
	jQuery(function() {
		var dd = new DropDown( jQuery('#regionalMenu') );
		jQuery(document).click(function() {
			// all dropdowns
			jQuery('.regional_menu').removeClass('active');
		});
	});

	// For Grid And List view 
/*	jQuery(".btn-cat").on('click',function(e) {
	    if (jQuery(this).hasClass('grid')) {
	        jQuery(".category_item").removeClass('list');        

	    }
	    else if(jQuery(this).hasClass('list')) {
	        jQuery(".category_item").removeClass('grid').addClass('list');
	    }
	});*/

	jQuery('.btn-cat').on('click',function(e) {
		if (jQuery(this).hasClass('gridview')) {
			jQuery('.category_item_wrap').removeClass('listview');
			jQuery('.rightBox .gridview').addClass('active');
			jQuery('.rightBox .listview').removeClass('active');					
		}
		else if(jQuery(this).hasClass('listview')) {
			jQuery('.category_item_wrap').removeClass('gridview').addClass('listview');
			jQuery('.rightBox .gridview').removeClass('active');
			jQuery('.rightBox .listview').addClass('active');								
		}
	});

	jQuery('.navbar-toggler-icon').on('click', function () {
		jQuery(this).toggleClass('open');
	});
	
	var windowHeight = $(window).height();
	var appearanceList = $(".appearance");
	var documentScroll = $(document).scrollTop();
	var startIndx;
	function checkPosition(indx)
	{
		if(($(appearanceList.eq(indx)).offset().top - documentScroll) < (windowHeight * 0.8))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	function showHiddenElements(indx){
		appearanceList.eq(indx).animate({opacity:1,top:0},500,
			function(){
				$(this).removeClass('appearance');
			}
		);
	}
	function pageLoad(indx)
	{	
		if(checkPosition(indx) === true)
		{
			showHiddenElements(indx);
			if((indx + 1) < appearanceList.length)
			{
			setTimeout(function()
			{
				pageLoad(indx + 1);
			},200);
			}
		}
		else
		{
			startIndx = indx;
			return startIndx;
		}
	}
	setTimeout(function(){
		pageLoad(0);
	},200);
	
	$(document).scroll(function()
	{
		if(startIndx < appearanceList.length)
		{
			documentScroll = $(document).scrollTop();
			pageLoad(startIndx);
		}
	});
	$('div.form-group input[type="text"]').each(function(){
		if(!$(this).val()){
			$(this).prev().css("bottom",-25);
		}
	});
	
	$('.form-control.calendar').change(function(){
		$(this).prev().css("bottom",0);
	});
//	$('body').click(function(){
//		$('#mainmenu ul.nav.navbar-nav > li.dropdown.parent > ul.dropdown-menu.expanded').removeClass('expanded');
//	});
//	$('#mainmenu ul.nav.navbar-nav > li.dropdown.parent > a').click(function(e) {
//		$(this).parent().siblings('li.dropdown.parent').children('ul.dropdown-menu').removeClass('expanded');
//		var navChild = $(this).next('ul.dropdown-menu');
//		if(navChild.hasClass('expanded'))
//		{
//			navChild.removeClass('expanded');
//		}
//		else
//		{
//			navChild.addClass('expanded');
//		}
//		e.preventDefault();
//		e.stopPropagation();
// });
  $(".form-group.number select").chosen({
	placeholder_text_multiple: 'можно выбрать несколько',
  });
});