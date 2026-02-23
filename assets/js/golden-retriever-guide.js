/**
 * Golden Retriever Finance Guide - Simple Version
 * Positioned: bottom 20px, right 50px (next to Yoda chatbot)
 */

(function() {
    // Inject styles first
    const style = document.createElement('style');
    style.textContent = `
        .gr-container { position: fixed; bottom: 20px; right: 50px; z-index: 996; }
        .gr-dog { width: 100px; height: 100px; cursor: pointer; animation: breathe 3s infinite; }
        .gr-bubble { position: fixed; bottom: 140px; right: 50px; background: linear-gradient(135deg, #FFB366, #FF9999); color: white; padding: 12px 16px; border-radius: 12px; max-width: 280px; font-size: 14px; z-index: 998; animation: slideIn 0.4s ease-out; }
        .gr-menu { position: fixed; bottom: 140px; right: 50px; background: white; padding: 12px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.15); z-index: 998; min-width: 200px; }
        .gr-btn { display: block; background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; border: none; padding: 10px 14px; border-radius: 8px; margin: 8px 0; font-size: 13px; font-weight: 600; cursor: pointer; width: 100%; text-align: left; transition: all 0.3s; }
        .gr-btn:hover { transform: translateX(4px); box-shadow: 0 4px 12px rgba(30, 60, 114, 0.3); }
        .gr-close { position: absolute; top: -8px; right: -8px; width: 28px; height: 28px; border-radius: 50%; background: #FF6B6B; color: white; border: none; cursor: pointer; font-weight: bold; }
        @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        @keyframes slideIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes wag { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }
        @keyframes pant { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .gr-tongue { animation: pant 1.2s infinite; }
        .gr-tail { animation: wag 1.5s infinite; transform-origin: 50% 120px; }
        @media (max-width: 768px) { .gr-container { bottom: 90px; right: 10px; } .gr-dog { width: 70px; height: 70px; } .gr-bubble { bottom: 95px; } .gr-menu { bottom: 95px; } }
    `;
    document.head.appendChild(style);
    
    class GoldenRetriever {
        constructor() {
            this.messages = ["🐕 Woof! Sanjeev's finance guide here!", "Chat → O2C mastery | 📚 Coaching | 🎯 Services"];
            this.init();
        }
        
        init() {
            const html = `
                <div class="gr-container">
                    <svg class="gr-dog" viewBox="0 0 200 200"><ellipse cx="100" cy="130" rx="45" ry="50" fill="#D4A574"/><ellipse cx="100" cy="110" rx="40" ry="45" fill="#E8C89F"/><circle cx="100" cy="70" r="35" fill="#E8C89F"/><ellipse cx="100" cy="85" rx="20" ry="16" fill="#F0D9B5"/><ellipse cx="100" cy="82" rx="8" ry="7" fill="#4A4A4A"/><circle cx="92" cy="62" r="5" fill="#4A4A4A"/><circle cx="108" cy="62" r="5" fill="#4A4A4A"/><circle cx="93" cy="60" r="2" fill="#fff"/><circle cx="109" cy="60" r="2" fill="#fff"/><ellipse cx="75" cy="50" rx="15" ry="25" fill="#D4A574"/><ellipse cx="125" cy="50" rx="15" ry="25" fill="#D4A574"/><ellipse class="gr-tongue" cx="100" cy="95" rx="6" ry="5" fill="#FF9999"/><path class="gr-tail" d="M 50 120 Q 35 110 40 90" stroke="#D4A574" stroke-width="12" fill="none" stroke-linecap="round"/></svg>
                    <div id="gr-bubble" class="gr-bubble" style="display:none;"></div>
                    <div id="gr-menu" class="gr-menu" style="display:none;"><button class="gr-btn" onclick="window.gr.chat()">💬 Chat & Learn</button><button class="gr-btn" onclick="window.gr.coaching()">📚 Coaching</button><button class="gr-btn" onclick="window.gr.services()">🎯 Services</button><button class="gr-close" onclick="document.getElementById('gr-menu').style.display='none'">✕</button></div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);
            document.querySelector('.gr-dog').addEventListener('click', () => this.showMenu());
            setTimeout(() => this.welcome(), 1500);
        }
        
        welcome() {
            this.showBubble(this.messages[0]);
            setTimeout(() => {
                this.showBubble(this.messages[1]);
                setTimeout(() => this.showMenu(), 3500);
            }, 3500);
        }
        
        showBubble(text) {
            const bubble = document.getElementById('gr-bubble');
            bubble.textContent = text;
            bubble.style.display = 'block';
            setTimeout(() => bubble.style.display = 'none', 3000);
        }
        
        showMenu() {
            document.getElementById('gr-bubble').style.display = 'none';
            document.getElementById('gr-menu').style.display = 'block';
        }
        
        chat() {
            const yoda = document.querySelector('.yoda-chatbot-btn');
            if (yoda) yoda.click();
        }
        
        coaching() { this.showBubble('📚 Check coaching in top menu!'); }
        services() { this.showBubble('🎯 Explore Postmate & Topmate packages!'); }
    }
    
    window.gr = new GoldenRetriever();
})();
