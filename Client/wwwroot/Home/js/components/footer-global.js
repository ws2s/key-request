export function FooterGlobal(currentYear) {
	return {
		year: currentYear,
		$template: `
            <footer>
                <div class="gutter">
                    <div class="footerColumns">
                        <div class="footercol">
                            <div id="footeruvaLogo">
                                <a href="https://www.virginia.edu/" target="_blank" aria-label="University of Virginia">
                                    <img src="/home/images/layout/logo-uva-footer.svg" alt="University of Virginia">
                                </a>
                            </div>
                        </div>

                        <address class="footercol">
                            <a href="https://www.fm.virginia.edu" target="_blank" class="bold">Facilities Management</a><br>
                            1450 Leake Drive<br>
                            P.O. Box 400726<br>
                            Charlottesville, VA 22904-4726
                        </address>

                        <div class="footercol">
                            <ul>
                                <li>
                                    <div class="label">Phone</div>
                                    <div class="labelContent">(434) 924-1777</div>
                                </li>
                                <li>
                                    <div class="label">Email</div>
                                    <div class="labelContent"><a href="mailto:fm-service-call@virginia.edu">fm-service-call@virginia.edu</a></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p class="copyright">
                        &copy; {{ year }} By the Rector and Visitors of the University of Virginia
                    </p>
                </div>
            </footer>
        `,
	};
}