count = 10;
direction = true;

$(document).ready(function() {
	$(".images img").hide().eq(0).show().addClass('active');
	$(".pagination a").eq(0).addClass("full");
	$(".thumb-right img").hide();
	$(".thumb-left img").hide();

	slider = setInterval(newImage, 5000);

	$(".arr-right a").on("click", function(event) {
		event.preventDefault();
		clearInterval(slider);
		direction = true;
		newImage();
	});

	$(".arr-left a").on("click", function(event) {
		event.preventDefault();
		clearInterval(slider);
		direction = false;
		newImage();
	});

	$(".pagination a").on("click", function(event) {
		event.preventDefault();
		clearInterval(slider);
		direction = $(this).index(".pagination a");
		newImage();
	});

	$(".arr-right a").hover(
		function() {
			var num = $(".images img.active").index(".images img") + 1;
			if (num == 10) num = 0;
			$(".thumb-right img").eq(num).fadeIn(500);
		},
		function() {
			$(".thumb-right img").hide();
		}
	);

	$(".arr-left a").hover(
		function() {
			var num = $(".images img.active").index(".images img") - 1;
			if (num == -1) num = 9;
			$(".thumb-left img").eq(num).fadeIn(500);
		},
		function() {
			$(".thumb-left img").hide();
		}
	);
});

function newImage() {
	var currentImg = $(".images img.active").index(".images img");
	var nextImg;
	if (direction === true) {
		if (currentImg == 9) {
			nextImg = 0;
		} else {
			nextImg = currentImg + 1;
		}
	} else if (direction === false) {
		if (currentImg == 0) {
			nextImg = 9;
		} else {
			nextImg = currentImg - 1;
		}
	} else {
		nextImg = direction;
	}

	$(".images img").eq(currentImg)
	.removeClass("active").hide("fade", {}, 500, function() {
		$(".images img").eq(nextImg)
		.addClass("active").show("fade", {}, 500);
	});

	$(".pagination a").eq(currentImg).removeClass("full");
	$(".pagination a").eq(nextImg).addClass("full");
}