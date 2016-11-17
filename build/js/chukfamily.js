$(function(){
	var menu = $('.menu-block');
	var secondMenu = $('.second-menu');

	// меню выпадает по клику на иконку на маленьких разрешениях
	$.fn.mobileMenu = function() {
		if( $(this).hasClass("active") ) {
			menu.stop().slideUp();
			$(this).removeClass('active');
		} else {
			menu.stop().slideDown();
			$(this).addClass('active');
		}
	}
	$('.mobile-menu').on('click', function(){
		var $this = $(this);
		$this.mobileMenu();
	});


	// secondMenu - second menu only mobile
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
	$('.js-menu').on('click', function(){
		var $this = $(this);
		$this.secondMenu();
	});


// scene-page show all material
	var sceneLnk = 4, // - количество отображаемых ссылок в блоке
			hidenews = "Скрыть весь материал",
			shownews = "Показать весь материал",
			$itemBlock = $('.author-page__item .author-page__info');

	// hide link if count of material less than 4
	$('.author-page__info').each(function(){
		var lnkCountEl = $(this).children('p').length;
		if (lnkCountEl < sceneLnk) {
			$(this).parent().find('.more').hide();
		}
	});

	// hide all links, if they are more than 4
	$itemBlock.each(function(){
		$(this).children("p:not(:lt("+sceneLnk+"))").hide();
	});

	// show all links if click all material
	$('.js-open').on('click', function(){
		if( $(this).parent().hasClass('open') ) { // если есть класс open
			$(this).parent().find(".author-page__info p:not(:lt("+sceneLnk+"))").hide(); // все открытые ссылки закрываем
			$(this).html(shownews); // меняем обратно надпись в исходное положение
			$(this).parent().removeClass('open'); // ликвидируем класс open
		}
		else {
			$(this).parent().find(".author-page__info p:not(:lt("+sceneLnk+"))").show(); // находим все ссылки у этого блока и открываем
			$(this).html(hidenews); // подменяем ссылку по которой кликнули
			$(this).parent().addClass('open'); // родителю присваиваем класс open
		}
	});

	// about show more information
	$('.about-info__item').each(function(){
		$(this).find('p').not(':first').hide();
	});
	$('.js-open').on('click', function(){
		var $about = $(this).parent();
		if( $about.hasClass('open') ) { // если есть класс open
			$about.find('p').show();
		} else {
			$about.find('p').not(':first').hide();
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

	if( $('html').hasClass('desktop') ) {
		$('.various').addClass('fancybox.iframe');
	} else {
		$('.various').addClass('fancybox');
	}

	$('.fancybox').fancybox({
		nextEffect: 'fade',
		prevEffect: 'fade',
		helpers : {
			title : {
				type : 'inside'
			}
		},
		afterShow: function() {
			$('.fancybox-wrap').swipe({
					swipe : function(event, direction) {
							if (direction === 'left' || direction === 'up') {
									$.fancybox.prev( direction );
							} else {
									$.fancybox.next( direction );
							}
					}
			});
		}
	});

	$(".various").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers : {
			title : {
				type : 'inside'
			}
		},
	});

	$(".js-various").fancybox({
		// maxWidth	: 800,
		maxHeight	: 300,
		fitToView	: false,
		width		: '100%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers : {
			title : {
				type : 'inside'
			}
		},
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

	// gallery.html
	$.fn.tabs = function() {
		var menuItem = $(this).data('item'),
				$this = $(this);

		// add active class on click menu
		$('.gallery-menu li').removeClass('active');
		$this.addClass('active');


		// show all or clicked item
		if ( menuItem == "all") {
			$('.gallery-albom-item').show().addClass('js-visible');
		} else {
			$('.gallery-albom-item').hide().removeClass('js-visible');
			$this.parent().next().find('.gallery-albom-item[data-result="'+ menuItem +'"]').show().addClass('js-visible');
		}
	}
	$('.gallery-menu li').on('click', function(){
		var $this = $(this);
		$this.tabs();

		// hide/show pagination if galleryCount < 5
		var galleryCount = $('.js-visible').length;
		if (galleryCount < 6) {
			$('.pagination').css('display', 'none');
		} else {
			$('.pagination').css('display', 'flex');
		}
	});



});
