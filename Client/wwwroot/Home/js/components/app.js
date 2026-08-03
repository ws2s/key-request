import { createApp } from "https://unpkg.com/petite-vue?module";
import { HeaderGlobal } from "/Home/js/components/header-global.js";
import { HeaderSub } from "/Home/js/components/header-sub.js";
import { NavGlobal } from "/Home/js/components/nav-global.js";
import { FooterGlobal } from "/Home/js/components/footer-global.js";
import { PageTemplate } from "/Home/js/components/page-template.js";

createApp({
	NavGlobal,
	HeaderGlobal,
    HeaderSub,
	FooterGlobal,
	PageTemplate,
}).mount();