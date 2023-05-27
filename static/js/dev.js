$(document).ready(function(){

$(".number_input").keypress(function(event){
  event = event || window.event;
  if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
    return false;
});


//$("#file").attr("required", "true");

      $('.captchaHelp').click(function(){
		  
	
         $('#whiteBlock').show();
         $.getJSON('/ajax/reload_captcha.php', function(data) {
            $('.captchaImg').attr('src','/bitrix/tools/captcha.php?captcha_sid='+data);
             $('.captcha_sid').val(data);
            $('#whiteBlock').hide();
         });
         return false;
      });


	  $(".step2 label").each(function(){
	    if($(this).next('input').val() === ''){
	      $(this).css('top','25px');
	    }
	  });
	  
	  $(".step2 input").focus(function(){
	    $(this).prev('label').animate({top:'0px'},200);
	  }).blur(function(){
	    if($(this).val() === ''){
	      $(this).prev('label').animate({top:'25px'},200);
	    }
	    else {
	      $(this).prev('label').animate({top:'5px'},200);
	    }
	  });
	  $(".shipping").find(".custom-control-input:checked").parent().parent().next().children(".step2").show();
	  
	  $("#dostavka_samovyvoz").click(function(){
	    $("#dostavka-pochtoy").slideUp();
	    $("#samovyvoz").slideDown();
	  });
	  
	  $("#dostavka_pochtoy").click(function(){
	    $("#dostavka-pochtoy").slideDown();
	    $("#samovyvoz").slideUp();
	  });


	 $(".number_handler span").on("click", function(){
		if($(this).hasClass("add")){
			$(this).parent().prev(".number_input").val(parseInt($(this).parent().prev(".number_input").val()) + parseInt(1));
		}
		else if($(this).parent().prev(".number_input").val() > 1){
			$(this).parent().prev(".number_input").val(parseInt($(this).parent().prev(".number_input").val()) - parseInt(1));
		}
	});
	
	$(".checkbox-send-form").on("click", function(){
		setTimeout(function(){
			$("#filter_form_send").submit();
		}, 200);
	});

	$('.edit_items_count').click(function(){
	    var itemsCount = $(this).prev('.items_count');
	    var buttonImg = $(this).find('img');
	    if(itemsCount.hasClass('focus')){
	      itemsCount.attr('disabled',"disabled").removeClass('focus');
	      buttonImg.attr("src","/upload/edit.svg");
	      
	     	var elemID = $(this).data("id");
			var elemCount = $(this).prev(".items_count").val();
			var getCart = getCookie("product");
			var getCount = getCookie("count");
			var links_data = $(this).data("link");
	
			if(getCart == null)
			{
				getCart = "";
				getCount = "";
			}
			console.log(elemCount);
			var date = new Date(new Date().getTime() + 60 * 1000);
	// 		document.cookie = "name=value; path=/; expires=" + date.toUTCString();
			$.post("/ajax/viewCart.php", {id: elemID, count: elemCount}, function(data){
				
				setCookie("product", getCart + elemID + ";", {"expires": 10000, "path":"/"});
				setCookie("count", getCount + elemCount + ";", {"expires": 10000, "path":"/"});
				
 				location.href = links_data;
			});

	      
	    }
	    else {
	      itemsCount.removeAttr('disabled').addClass('focus').focus();
	      buttonImg.attr("src","/upload/ptichka.png");
	    }
	});

	$(".del_item").on("click", function(){
		var elemID = $(this).data("id");
		var elemCount = $(this).prev(".items_count").val();
		var getCart = getCookie("product");
		var getCount = getCookie("count");
		var links_data = $(this).data("link");
		
		var splCart = getCart.split(";");
		var splCount = getCount.split(";");

		var newCart = "";
		var newCount = "";

		for(var i = 0; i < splCart.length; i++)
		{
			if(splCart[i] != elemID)
			{
				newCart += splCart[i] + ";";
				newCount += splCount[i] + ";";
			}
// 			console.log(splCart[i] + "|||||\n");
		}
		$.post("/ajax/viewCart.php", {id: elemID, count: elemCount}, function(data){
				
			setCookie("product", newCart, {"expires": 10000, "path":"/"});
			setCookie("count", newCount, {"expires": 10000, "path":"/"});
			
			location.href = links_data;
		});
		console.log(newCart + " - " + newCount);
	})
	
	$("#choose-region").on('change', function(){
		setCookie("region", $(this).val(), {"expires": 10000, "path": "/"})
	})
	
	$("input[name=forma-sobstvennosti]").on("click", function(){
		setCookie("typeUser", $(this).val(), {"expires": 10000, "path": "/"})
	})
	
	$("#next_step_index a").on("click", function(){
		if(getCookie("region") && getCookie("typeUser"))
			location.href = $(this).data("link");
	})
	
	$("#dd ul li a").on("click", function (){
		location.href = $(this).attr("href")
	})
	
/*
	$(".request.link-send").on("click", function(){
		location.href = $(this).data("link")
	})
*/
	
	$("#send_form").on("click",function(){
	    var selectTrue = false;
	    $(".step2").each(function(){
		if($(this).css("display") == "block")
		{
		//    if(($(this).find(".check_read").lenght > 0 && $(this).find(".check_read").find("input[type=checkbox]").is(':checked')) || $(this).find(".check_read").lenght == 0){
			selectTrue = true;
		        console.log($("#" + $(this).attr("id")).parent().parent().parent().parent().parent().parent().find("form").attr("method"));
		        $("#" + $(this).attr("id")).parent().parent().parent().parent().parent().parent().find("form").children(".submit").click();
		//    }
		}
	    });
		
	    if(!selectTrue)
		alert("Выберите способ доставки и заполните поля");
	})
	
	$("button.request:not(.not_link)").click(function(){
		if(!$(this).hasClass("to-cart")) {
			location.href = $(this).data("link");
			console.info('no-to-cart');
		}
		else
		{
			console.info('has-to-cart');
			var elemID = $(this).data("id");
			var elemCount = $(this).data("count");
			var getCart = getCookie("product");
			var getCount = getCookie("count");
			var links_data = $(this).data("link");
	
			if(getCart == null)
			{
				getCart = "";
				getCount = "";
			}
			var date = new Date(new Date().getTime() + 60 * 1000);
	// 		document.cookie = "name=value; path=/; expires=" + date.toUTCString();
			$.post("/ajax/viewCart.php", {id: elemID, count: elemCount}, function(data){
				
				setCookie("product", getCart + elemID + ";", {"expires": 10000, "path":"/"});
				setCookie("count", getCount + elemCount + ";", {"expires": 10000, "path":"/"});
				
				location.href = links_data;
			});

		}
	  	return false;
	});


	$(".order_btn").on("click", function(){
		var elemID = $(this).data("id");
		var elemCount = $(this).parent().find(".number_input").val();
		var getCart = getCookie("product");
		var getCount = getCookie("count");

		if(getCart == null){
			getCart = "";
			getCount = "";
		}
		
		console.log(getCart);
		
		var date = new Date(new Date().getTime() + 60 * 1000);
// 		document.cookie = "name=value; path=/; expires=" + date.toUTCString();
		$.post("/ajax/viewCart.php", {id: elemID, count: elemCount}, function(data){
			
			setCookie("product", getCart + elemID + ";", {"expires": 10000, "path":"/"});
			setCookie("count", getCount + elemCount + ";", {"expires": 10000, "path":"/"});
			
			console.log(data);
			location.href = "./";			
// 			$("#cart_load_info").html(data);
		});
	});
	
	// возвращает cookie с именем name, если есть, если нет, то undefined
	function getCookie(name) {
	  var matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	
	// устанавливает cookie с именем name и значением value
	// options - объект с свойствами cookie (expires, path, domain, secure)
	function setCookie(name, value, options) {
	  options = options || {};
	
	  var expires = options.expires;
	
	  if (typeof expires == "number" && expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires * 1000);
	    expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) {
	    options.expires = expires.toUTCString();
	  }
	
	  value = encodeURIComponent(value);
	
	  var updatedCookie = name + "=" + value;
	
	  for (var propName in options) {
	    updatedCookie += "; " + propName;
	    var propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += "=" + propValue;
	    }
	  }
	
	  document.cookie = updatedCookie;
	}
	
	// удаляет cookie с именем name
	function deleteCookie(name) {
	  setCookie(name, "", {
	    expires: -1
	  })
	}
})
