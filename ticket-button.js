class TicketButton extends HTMLElement {
    constructor() {
        super();
        this.hasShadow = false;

        try {
            // Try attaching the Shadow DOM (works on the live site)
            this.attachShadow({ mode: 'open' });
            this.hasShadow = true;
        } catch (e) {
            // If the editor sandbox blocks attachShadow, we fail gracefully
            console.warn("Shadow DOM blocked. Falling back to Light DOM rendering.");
        }
    }

    connectedCallback() {
        const content = `
            <style>
                /* Core Ticket Button Styling */
                .ticket-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%; 
                    background-color: #d8c3a5; /* Old-fashioned paper color */
                    color: #3e2723; /* Dark brown rustic text */
                    font-family: "Courier New", Courier, monospace, serif;
                    font-weight: bold;
                    font-size: 26px;
                    text-transform: uppercase;
                    text-decoration: none;
                    letter-spacing: 2px;
                    border: 3px double #8e7f70;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    cursor: pointer;
                    user-select: none;
                    transition: all 0.2s ease;
                    position: relative;
                    box-sizing: border-box;
                    transform: rotate3d(1, 1, 1, 3deg);
                }

                /* Left and Right "Ticket Punch" Cuts */
                .ticket-btn::before,
                .ticket-btn::after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    /* Match the color of your Wix background page to fake a cutout */
                    background-color: #ffffff; 
                    border-radius: 50%;
                    top: 50%;
                    transform: translateY(-50%);
                    border: 3px double #8e7f70;
                    box-sizing: border-box;
                }
                .ticket-btn::before { left: -11px; }  /* Left Notch */
                .ticket-btn::after { right: -11px; } /* Right Notch */

                /* HOVER State */
                .ticket-btn:hover {
                    background-color: #e3cca8;
                    border-color: #8d0b0b; /* Crimson border */
                    color: #1a0f0d;
                    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
                    transform: translateY(-1px);
                }

                /* ACTIVE / CLICK State */
                .ticket-btn:active {
                    background-color: #bfa585; /* Darker, worn paper */
                    border-color: #5c0808;
                    color: #000000;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transform: translateY(1px);
                }
            </style>
            <button class="ticket-btn">Book Now!</button>
        `;

        if (this.hasShadow) {
            // Live Site Rendering
            this.shadowRoot.innerHTML = content;
            
            // Wire up your Velo event listeners
            const button = this.shadowRoot.querySelector('.ticket-btn');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.dispatchEvent(new CustomEvent('ticketClicked', {
                    bubbles: true,
                    composed: true
                }));
            });
        } else {
            // Editor / Sandbox Fallback (Renders directly in the Light DOM)
            this.innerHTML = '<br/><br/><br/>Book Now!';
            console.log('rendered non-shadow dom');
        }
    }
}

customElements.define('ticket-button', TicketButton);