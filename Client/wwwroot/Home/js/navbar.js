$(document).ready(function(){
	var $navList = $(".nav-list"),
		$currentPage = (window.location.href).toLowerCase();

    function getLastUrlPart(urlString) {
		try {
			// 1. Create a URL object to easily access the 'pathname' (path without query/hash)
			const url = new URL(urlString);
			const pathname = url.pathname; // e.g., "/products/item-slug/" or "/products/item-slug"

			// 2. Split the pathname by slashes
			const segments = pathname.split("/");

			// 3. Filter out any empty strings that may result from leading/trailing slashes
			const filteredSegments = segments.filter(
				(segment) => segment.length > 0,
			);

			// 4. Return the last non-empty segment
			// Use .at(-1) for modern JS, or [filteredSegments.length - 1] for older compatibility
			return filteredSegments.at(-1) || "";
		} catch (error) {
			console.error("Invalid URL:", error);
			return ""; // Return empty string or handle error as appropriate
		}
	}
    $(function () {
        const lastPart = (getLastUrlPart($currentPage)).toLowerCase();
            //   homeTab = $('[data-url="/home/"]');
		$(".nav-list > li > a").each(function () {
			var $address = (this.href.toLowerCase());
			// console.log("address: " + $address);
			// removed this conditional due to revamped navbar
            // if (
			// 	lastPart === "index.html" ||
			// 	lastPart === "Home" ||
			// 	lastPart === "home"
			// ) {
			// 	homeTab.addClass("current-page");
			// 	return false;
			// }
			if (
				$currentPage.indexOf($address) !== -1 ||
				getLastUrlPart($address) == lastPart
			) {
				$(this).addClass("current-page");
				return false;
			}
		});
	});
	// Shift focus from skip-nav link to main content
	// bind a click event to the 'skip' link
	$(".skip-to-main").click(function (event) {
		// strip the leading hash and declare
		// the content we're skipping to
		var skipTo = "#" + this.href.split("#")[1];

		// Setting 'tabindex' to -1 takes an element out of normal
		// tab flow but allows it to be focused via javascript
		$(skipTo)
			.attr("tabindex", -1)
			.on("blur focusout", function () {
				// when focus leaves this element,
				// remove the tabindex attribute
				$(this).removeAttr("tabindex");
			})
			.focus(); // focus on the content container
	});

    $(".mobile-nav-toggle").click(function () {
		if ($navList.is(":animated")) {
			return false;
		} else {
			$navList.slideToggle();
		}
	});

    $.fn.keyboardaccess = function () {
		var $this = $(this);
		$("a", $this)
			.focus(function () {
				var topLI = $(this).parents(".nav-sub-list-toggle");
				topLI.addClass("dropdown-focused");
			})
			.blur(function () {
				var topLI = $(this).parents(".nav-sub-list-toggle");
				topLI.removeClass("dropdown-focused");
			});
	};

    $(".nav-list").keyboardaccess();
});