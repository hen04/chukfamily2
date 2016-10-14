$(function(){
	var menu = $('.menu-block');
	var secondMenu = $('.second-menu');

	// меню выпадает по клику на иконку на маленьких разрешениях
	function windowmenuSize(){
		if ($(window).width() <= '860'){
			$('.mobile-menu').on('click', function(){
				var $this = $(this);
				$this.mobileMenu();
			});
		}
	}
	$(window).on('load',windowmenuSize);

	$.fn.mobileMenu = function() {
		if( $(this).hasClass("active") ) {
			menu.stop().slideUp();
			$(this).removeClass('active');
		} else {
			menu.stop().slideDown();
			$(this).addClass('active');
		}
	}


	// secondMenu - second menu only mobile
	function windowSize(){
		if ($(window).width() <= '860'){
			$('.js-menu').on('click', function(){
				var $this = $(this);
				$this.secondMenu();
			});
		}
	}
	$(window).on('load',windowSize);
	$.fn.secondMenu = function() {
		if( $(this).hasClass("active") ) {
			secondMenu.stop().slideUp();
			$(this).removeClass('active');
		} else {
			secondMenu.stop().slideUp();
			$(this).children('.second-menu').stop().slideDown();
			$('.js-menu').removeClass('active');
			$(this).addClass('active');
		}
	}

// secondMenu close resize
	function windowResize(){
		secondMenu.stop().slideUp();
		$('.js-menu').removeClass('active');
	}
	$(window).on('resize',windowResize);


	var sceneLnk = 4, // - количество отображаемых блоков
			hidenews = "Скрыть весь материал",
			shownews = "Показать весь материал";

	$(".js-open").html( shownews );
	$(".author-page__lnk:not(:lt("+sceneLnk+"))").hide();

	$(".js-open").click(function (e){
		e.preventDefault();
		if( $(".author-page__lnk:eq("+sceneLnk+")").is(":hidden") )
		{
			$(".author-page__lnk:hidden").show();
			$(".js-open").html( hidenews );
		}
		else
		{
			$(".author-page__lnk:not(:lt("+sceneLnk+"))").hide();
			$(".js-open").html( shownews );
		}
	});



	$('.js-more').on('click', function(){
		var text = $('.js-author-txt');
		if ( $(this).hasClass('open') ) {
			$(this).removeClass('open');
			text.slideUp();
		} else {
			$(this).addClass('open');
			text.slideDown();
		}
	});


	$('.photomaterial-list').slick({
		infinite: true,
		appendArrows: $(".slick-arrows"),
		prevArrow: '<div class="slick-prev"></div>',
		nextArrow: '<div class="slick-next"></div>',
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: true,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					arrows: false
				}
			},
			{
				breakpoint: 1020,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: false,
					arrows: false
				}
			}
		]
	});


	$(".fancybox").fancybox({
		nextEffect: 'fade',
		prevEffect: 'fade'
	});

	$('input').each(function(){
		if ($(this).attr('placeholder') != '') $(this).attr('title', $(this).attr('placeholder'));
		$(this).bind('click', function(){
			$(this).attr('placeholder', '');
		});
		$(this).bind('blur', function(){
			$(this).attr('placeholder', $(this).attr('title'));
		});
	});

	$('.subscribe input').on('focus', function(){
		$('.subscribe').addClass('active');
	});

	$('.lnk-add--download').on('click', function(){
		$(this).download();
	});
	$.fn.download = function() {
		if ( $(this).hasClass('open') ) {
			$(this).removeClass('open');
			$(this).children().css('display', 'none');
			// $(this).children().find('a').css('display', 'none');
		} else {
			$('.proza-download-lnk').css('display', 'none');
			$('.lnk-add--download').removeClass('open');
			$(this).addClass('open');
			$(this).children().css('display', 'block');
			// $(this).children().find('a').css('display', 'inline-block');
		}

	}

});
