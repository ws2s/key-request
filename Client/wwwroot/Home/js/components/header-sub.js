export function HeaderSub() {
	return {
		$template: `
            <header aria-label="Emergency contacts" class="contact-emergency bg-blue-primary">
                <div class="flex flex-row align-items-start justify-content-center">
                    <div class="flex-item">
                        <p><strong class="copy-cyan">For urgent requests:</strong></p>
                        <ul class="copy-white">
                            <li>Risk to people</li>
                            <li>Building damage</li>
                            <li>Building systems outage</li>
                            <li><a href="https://uvaemergency.virginia.edu/emergency-procedures" class="copy-white">Emergency Procedures</a></li>
                        </ul>
                    </div>
                    <div class="flex-item">
                        <p><strong class="copy-cyan">Please call for immediate attention:</strong></p>
                        <ul class="copy-white">
                            <li>Academic/Housing properties: (434) 924-1777</li>
                            <li>UVA Health properties: (434) 924-2267</li>
                        </ul>
                    </div>
                </div>
            </header>
        `,
	};
}