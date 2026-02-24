/**
 * Golden Retriever Finance Guide - Above Yoda Icon
 * Positioned: above Yoda, right 20px with gap
 * Z-index: 1001 (above Yoda 997)
 */

(function() {
    // Inject styles first
    const style = document.createElement('style');
    style.textContent = `
        .gr-container { 
            position: fixed; 
            bottom: 230px; 
            right: 20px; 
            z-index: 1001; 
            pointer-events: auto;
            user-select: none;
        }
        
        .gr-dog { 
            width: 100px; 
            height: 100px; 
            cursor: grab; 
            animation: breathe 3s infinite, sniff 0.8s infinite; 
            pointer-events: all;
        }
        
        .gr-dog:active {
            cursor: grabbing;
        }
        
        .gr-bubble { 
            position: absolute; 
            bottom: 110px; 
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #FFB366, #FF9999); 
            color: white; 
            padding: 12px 16px; 
            border-radius: 12px; 
            max-width: 280px; 
            font-size: 14px; 
            z-index: 1001; 
            animation: slideIn 0.4s ease-out; 
            pointer-events: none;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            white-space: normal;
        }
        
        .gr-menu { 
            position: absolute; 
            bottom: 110px; 
            left: 50%;
            transform: translateX(-50%);
            background: white; 
            padding: 16px; 
            border-radius: 12px; 
            box-shadow: 0 8px 30px rgba(0,0,0,0.25); 
            z-index: 1001; 
            min-width: 220px;
            pointer-events: all;
        }
        
        .gr-btn { 
            display: block; 
            background: linear-gradient(135deg, #1e3c72, #2a5298); 
            color: white; 
            border: none; 
            padding: 12px 14px; 
            border-radius: 8px; 
            margin: 6px 0; 
            font-size: 13px; 
            font-weight: 600; 
            cursor: pointer; 
            width: 100%; 
            text-align: left; 
            transition: all 0.3s; 
            pointer-events: auto;
        }
        
        .gr-btn:hover { 
            transform: translateX(4px); 
            box-shadow: 0 4px 12px rgba(30, 60, 114, 0.3); 
        }
        
        .gr-close { 
            position: absolute; 
            top: 8px; 
            right: 8px; 
            width: 28px; 
            height: 28px; 
            border-radius: 50%; 
            background: #FF6B6B; 
            color: white; 
            border: none; 
            cursor: pointer; 
            font-weight: bold;
            pointer-events: auto;
            font-size: 16px;
        }
        
        .gr-close:hover {
            background: #FF5252;
        }
        
        @keyframes breathe { 
            0%, 100% { transform: scale(1); } 
            50% { transform: scale(1.03); } 
        }
        
        @keyframes slideIn { 
            0% { opacity: 0; transform: translateY(10px); } 
            100% { opacity: 1; transform: translateY(0); } 
        }
        
        @keyframes wag { 
            0%, 100% { transform: rotate(0deg); } 
            50% { transform: rotate(-30deg); } 
        }
        
        @keyframes sniff {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-4px); }
            50% { transform: translateY(4px); }
            75% { transform: translateY(-2px); }
        }
        
        @keyframes pant { 
            0%, 100% { opacity: 1; } 
            50% { opacity: 0.7; } 
        }
        
        @keyframes coinFall {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(300px) translateX(var(--spread-x, 0)) rotate(720deg) scale(0.7);
                opacity: 0;
            }
        }

        @keyframes mobileWalk {
            0%, 100% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(20px) translateY(-4px); }
            50% { transform: translateX(0) translateY(0); }
            75% { transform: translateX(-20px) translateY(-4px); }
        }
        
        .gr-tongue { 
            animation: pant 1.2s infinite; 
        }
        
        .gr-tail { 
            animation: wag 0.8s infinite; 
            transform-origin: 50% 120px; 
        }
        
        .gr-dog.sniffing {
            animation: sniff 0.6s infinite !important;
        }
        
        .gr-coin {
            position: fixed;
            width: 16px;
            height: 16px;
            background: radial-gradient(circle at 30% 30%, #FFD700, #FFA500);
            border-radius: 50%;
            border: 1px solid #FF8C00;
            pointer-events: none;
            z-index: 1000;
            box-shadow: inset -2px -2px 3px rgba(0, 0, 0, 0.3), 2px 2px 3px rgba(0, 0, 0, 0.2);
        }
        
        /* Mobile Optimization */
        @media (max-width: 768px) { 
            .gr-container { 
                bottom: 220px; 
                right: 10px;
            } 
            
            .gr-dog { 
                width: 75px; 
                height: 75px; 
            } 
            
            .gr-bubble { 
                bottom: 90px;
                left: 50%;
                transform: translateX(-50%);
                max-width: 240px;
                font-size: 12px;
                padding: 10px 12px;
            } 
            
            .gr-menu { 
                bottom: 90px;
                left: 50%;
                transform: translateX(-50%);
                min-width: 200px;
                padding: 12px;
            }
            
            .gr-btn {
                padding: 10px 12px;
                margin: 4px 0;
                font-size: 12px;
            }
        }
        
        @media (max-width: 480px) {
            .gr-container {
                bottom: 60px;
                right: 50%;
                transform: translateX(50%);
            }
            
            .gr-dog {
                width: 70px;
                height: 70px;
                animation: mobileWalk 2.5s infinite, sniff 0.8s infinite !important;
            }
            
            .gr-bubble {
                bottom: 85px;
                left: 50%;
                transform: translateX(-50%);
                max-width: 200px;
                font-size: 11px;
                padding: 8px 10px;
            }
            
            .gr-menu {
                bottom: 85px;
                left: 50%;
                transform: translateX(-50%);
                min-width: 180px;
                padding: 10px;
                display: none;
            }
            
            .gr-btn {
                padding: 8px 10px;
                margin: 3px 0;
                font-size: 11px;
            }
        }
    `;
    document.head.appendChild(style);
    
    class GoldenRetriever {
        constructor() {
            this.messages = ["🐕 Woof! How I can Help you?", "1️⃣ YodaBot for Queries\n2️⃣ Booking for Packages\n3️⃣ Topmate for Coaching"];
            this.isDragging = false;
            this.dragOffsetX = 0;
            this.dragOffsetY = 0;
            this.savedPosition = this.getSavedPosition();
            this.init();
        }
        
        getSavedPosition() {
            try {
                const saved = localStorage.getItem('grDogPosition');
                return saved ? JSON.parse(saved) : null;
            } catch (e) {
                return null;
            }
        }
        
        savePosition(bottom, right) {
            try {
                localStorage.setItem('grDogPosition', JSON.stringify({ bottom, right }));
            } catch (e) {
                // Silently fail if localStorage is not available
            }
        }
        
        init() {
            const html = `
                <div class="gr-container">
                    <svg class="gr-dog" viewBox="0 0 200 200"><ellipse cx="100" cy="130" rx="45" ry="50" fill="#D4A574"/><ellipse cx="100" cy="110" rx="40" ry="45" fill="#E8C89F"/><circle cx="100" cy="70" r="35" fill="#E8C89F"/><ellipse cx="100" cy="85" rx="20" ry="16" fill="#F0D9B5"/><ellipse cx="100" cy="82" rx="8" ry="7" fill="#4A4A4A"/><circle cx="92" cy="62" r="5" fill="#4A4A4A"/><circle cx="108" cy="62" r="5" fill="#4A4A4A"/><circle cx="93" cy="60" r="2" fill="#fff"/><circle cx="109" cy="60" r="2" fill="#fff"/><ellipse cx="75" cy="50" rx="15" ry="25" fill="#D4A574"/><ellipse cx="125" cy="50" rx="15" ry="25" fill="#D4A574"/><path d="M 95 95 Q 100 100 105 95" stroke="#8B6B47" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="105" rx="6" ry="8" fill="#FF6B9D" class="gr-tongue"/><path class="gr-tail" d="M 50 120 Q 35 110 40 90" stroke="#D4A574" stroke-width="12" fill="none" stroke-linecap="round"/></svg>
                    <div id="gr-bubble" class="gr-bubble" style="display:none;"></div>
                    <div id="gr-menu" class="gr-menu" style="display:none;">
                        <button class="gr-btn" id="gr-chat-btn">💬 Click YodaBot for any Query</button>
                        <button class="gr-btn" id="gr-coaching-btn">📦 Click Booking for Packages</button>
                        <button class="gr-btn" id="gr-services-btn">🎯 Click Topmate for Coaching</button>
                        <button class="gr-close" id="gr-close-btn">✕</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);
            
            // Restore saved position
            const container = document.querySelector('.gr-container');
            if (this.savedPosition && container) {
                container.style.bottom = this.savedPosition.bottom + 'px';
                container.style.right = this.savedPosition.right + 'px';
            }
            
            // Set up event listeners with proper scope
            const dog = document.querySelector('.gr-dog');
            if (dog) {
                dog.addEventListener('mousedown', (e) => this.startDrag(e));
                dog.addEventListener('click', (e) => {
                    // Only open menu if not dragging
                    if (!this.isDragging) {
                        this.showMenu();
                    }
                });
            }
            
            const chatBtn = document.getElementById('gr-chat-btn');
            const coachingBtn = document.getElementById('gr-coaching-btn');
            const servicesBtn = document.getElementById('gr-services-btn');
            const closeBtn = document.getElementById('gr-close-btn');
            
            if (chatBtn) chatBtn.addEventListener('click', () => this.chat());
            if (coachingBtn) coachingBtn.addEventListener('click', () => this.coaching());
            if (servicesBtn) servicesBtn.addEventListener('click', () => this.services());
            if (closeBtn) closeBtn.addEventListener('click', () => this.hideMenu());
            
            // Add drag listeners globally
            document.addEventListener('mousemove', (e) => this.drag(e));
            document.addEventListener('mouseup', () => this.stopDrag());
            
            setTimeout(() => this.welcome(), 1500);
        }
        
        startDrag(e) {
            this.isDragging = true;
            const container = document.querySelector('.gr-container');
            if (!container) return;
            
            const rect = container.getBoundingClientRect();
            this.dragOffsetX = e.clientX - rect.left;
            this.dragOffsetY = e.clientY - rect.top;
            
            document.querySelector('.gr-dog').style.cursor = 'grabbing';
        }
        
        drag(e) {
            if (!this.isDragging) return;
            
            const container = document.querySelector('.gr-container');
            if (!container) return;
            
            const x = e.clientX - this.dragOffsetX;
            const y = e.clientY - this.dragOffsetY;
            
            // Keep within viewport bounds
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const containerWidth = 100;
            const containerHeight = 100;
            
            const boundedX = Math.max(0, Math.min(x, viewportWidth - containerWidth));
            const boundedY = Math.max(0, Math.min(y, viewportHeight - containerHeight));
            
            container.style.left = boundedX + 'px';
            container.style.right = 'auto';
            container.style.top = boundedY + 'px';
            container.style.bottom = 'auto';
        }
        
        stopDrag() {
            if (this.isDragging) {
                this.isDragging = false;
                const container = document.querySelector('.gr-container');
                if (container) {
                    const rect = container.getBoundingClientRect();
                    // Save position as left/top instead of bottom/right when dragged
                    this.savePosition(null, null);
                    // But store actual pixel position
                    try {
                        localStorage.setItem('grDogPosition', JSON.stringify({ 
                            left: rect.left, 
                            top: rect.top 
                        }));
                    } catch (e) {
                        // Silently fail
                    }
                }
                document.querySelector('.gr-dog').style.cursor = 'grab';
            }
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
            if (bubble) {
                bubble.textContent = text;
                bubble.style.display = 'block';
                setTimeout(() => {
                    if (bubble.style.display !== 'none') {
                        bubble.style.display = 'none';
                    }
                }, 3000);
            }
        }
        
        showMenu() {
            const bubble = document.getElementById('gr-bubble');
            const menu = document.getElementById('gr-menu');
            const dog = document.querySelector('.gr-dog');
            
            if (bubble) bubble.style.display = 'none';
            if (menu) menu.style.display = 'block';
            
            // Start sniffing and throw coins
            this.sniff();
            this.throwCoins();
        }
        
        hideMenu() {
            const menu = document.getElementById('gr-menu');
            if (menu) menu.style.display = 'none';
        }
        
        chat() {
            this.hideMenu();
            const yoda = document.querySelector('.yoda-chatbot-btn');
            if (yoda) {
                setTimeout(() => yoda.click(), 100);
            } else {
                this.showBubble('💬 YodaBot not found!');
            }
        }
        
        coaching() { 
            this.hideMenu();
            window.open('https://topmate.io/sanjeev_kumar_sharma', '_blank');
        }
        
        services() { 
            this.hideMenu();
            window.open('https://sanjeevsharmasan.github.io/postmate-bookings-package.html', '_blank');
        }
        
        sniff() {
            const dog = document.querySelector('.gr-dog');
            if (!dog) return;
            
            dog.classList.add('sniffing');
            setTimeout(() => {
                dog.classList.remove('sniffing');
            }, 2000);
        }
        
        throwCoins() {
            const container = document.querySelector('.gr-container');
            if (!container) return;
            
            const rect = container.getBoundingClientRect();
            const dogX = rect.left + rect.width / 2;
            const dogY = rect.top;
            
            // Throw 3-5 coins
            const coinCount = 3 + Math.floor(Math.random() * 3);
            for (let i = 0; i < coinCount; i++) {
                setTimeout(() => {
                    const coin = document.createElement('div');
                    coin.className = 'gr-coin';
                    
                    // Random starting position near dog
                    const offsetX = (Math.random() - 0.5) * 40;
                    coin.style.left = (dogX + offsetX) + 'px';
                    coin.style.top = dogY + 'px';
                    
                    // Random horizontal spread
                    const spreadX = (Math.random() - 0.5) * 200;
                    const duration = 1.8 + Math.random() * 0.4;
                    
                    coin.style.animation = `coinFall ${duration}s ease-in forwards`;
                    coin.style.setProperty('--spread-x', spreadX + 'px');
                    
                    document.body.appendChild(coin);
                    
                    // Clean up after animation
                    setTimeout(() => coin.remove(), duration * 1000);
                }, i * 70);
            }
        }
        
        show() {
            const container = document.querySelector('.gr-container');
            if (container) container.style.display = 'block';
        }
        
        hide() {
            const container = document.querySelector('.gr-container');
            if (container) container.style.display = 'none';
        }
    }
    
    window.gr = new GoldenRetriever();
    window.goldenRetriever = window.gr;
})();
