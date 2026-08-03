export function NavGlobal() {
	return {
		$template: `
            <nav class="main-nav">
                <div>
                    <button class="mobile-nav-toggle" aria-label="Navigation menu" aria-expanded="false">
                        <span class="mobile-nav-toggle-graphic">
                            <span class="fa-solid fa-bars"></span>
                        </span>
                    </button>
                    <ul class="nav-list">
                        <!-- <li><a href="/home/index.html" data-url="/home/">Home</a></li> -->
                        <li>
                            <a href="/home/index.html" data-url="customerrequest">
                                Request service</a> 
                            </a>
                        </li>
                        <li>
                            <a href="/WOStatus" data-url="/WOStatus/">Work order search</a>
                        </li>
                        <li>
                            <a href="/Surplus" data-url="/Surplus/">ReUSE Store</a>
                        </li>
                        <li>
                            <a href="/buildingInformation" data-url="buildingInformation">Building information</a>
                        </li>
                        <li>
                            <a href="/home/faqs.html" data-url="faqs">FAQs</a>
                        </li>
                        <li>
                            <a href="/home/contactus.html" data-url="contactus">Contact us</a>
                        </li>
                    </ul>
                </div>
            </nav>
        `,
	};
}

// export default { NavGlobal };