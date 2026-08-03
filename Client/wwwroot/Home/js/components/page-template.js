export function PageTemplate() {
	return {
		currentYear: new Date().getFullYear(),
		$template: `
            <div class="header-wrap" v-scope="HeaderGlobal()">
                <header-global></header-global>
            </div>
            <div class="wrap-nav" v-scope="NavGlobal()">
                <nav-global></nav-global>
            </div>
            <main id="main">
                <div class="gutter main-content">
                    <div v-if="document.body.classList.contains('has-header-urgent')" v-scope="HeaderSub()">
                        <header-sub></header-sub>
                    </div>
                    <div v-html="slot">
                    </div>
                </div>
            </main>
            <div class="wrap-footer" v-scope="FooterGlobal(currentYear)">
                <footer-global></footer-global>
            </div>
        `,
		slot: document.querySelector("#slot").innerHTML,
	};
}