export function HeaderGlobal() {
	return {
		$template: `
            <header class="header-global bg-blue-primary">
                <div class="flex flex-row align-items-center justify-content-between">
                    <div class="fm-logo-wrap flex justify-content-start">
                        <a href="https://www.fm.virginia.edu" class="fm-logo" aria-label="University of Virginia Facilities Management">
                            <img src="/Home/images/layout/uva-fm-horiz-logo.svg" alt="University of Virginia Facilities Management">
                        </a>
                    </div>
                    <div class="cp-logo flex justify-content-center">
                        <a href="/" class="cp-logo-text copy-white">Customer Portal</a>
                    </div>
                    <div class="flex-filler"></div>
                </div>
            </header>
        `,
	};
}