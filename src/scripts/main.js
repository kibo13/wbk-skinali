function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms) { }
}

sleep(20);

document.body.onload = function () {
	setTimeout(function () {
		var preloader = document.getElementById('loader');
		if (!preloader.classList.contains('done')) {
			preloader.classList.add('done');
		}
	}, 1000);
};

$(window).load(function () {

	/* ============================================== */
	/* connection plugins for section of before-after */
	/* ============================================== */

	$('.modern__item').twentytwenty({
		before_label: 'До',
		after_label: 'После',
	});

	/* ============================================== */
	/* connection plugins for section of testimonials */
	/* ============================================== */

	$('.feedback__list').slick({
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 875,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 630,
				settings: {
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	/* ============================= */
	/* control active link on scroll */
	/* ============================= */

	var lastId,
		topMenu = $(".menu__list"),
		topMenuHeight = topMenu.outerHeight() + 15,
		// All list items
		menuItems = topMenu.find(".menu__link"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});

	menuItems.click(function (e) {
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top;
		$('html, body').stop().animate({
			scrollTop: offsetTop - 50
		}, 1500);
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function () {

		// Get container scroll position
		var fromTop = $(this).scrollTop() + topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop)
				return this;
		});

		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
				.parent().removeClass("active")
				.end().filter("[href='#" + id + "']").parent().addClass("active");
		}
	});

	/* ===================== */
	/* check on/off checkbox */
	/* ===================== */

	$('.menu__link').on('click', function () {
		$('#checkbox').prop('checked', false);
	});

	/* ======================== */
	/* setting masks for inputs */
	/* ======================== */

	$('input[type="tel"]').mask('+7 (999) 999-99-99');

});

/* ================================== */
/* loading yandex map with setTimeout */
/* ================================== */

setTimeout(function () {
	var elem = document.createElement('script');
	elem.type = 'text/javascript';
	elem.src = '//api-maps.yandex.ru/2.0/?load=package.standard&lang=ru-RU&onload=getYaMap';
	document.getElementsByTagName('body')[0].appendChild(elem);
}, 2000);

function getYaMap() {
	var myMap = new ymaps.Map("map", { center: [55.663, 37.631], zoom: 9 });
	ymaps.geocode("Москва, Каширское шоссе, 23").then(function (res) {
		var coord = res.geoObjects.get(0).geometry.getCoordinates();
		var myPlacemark = new ymaps.Placemark(coord);
		myMap.geoObjects.add(myPlacemark);
		myMap.setCenter(coord);
	});
}




