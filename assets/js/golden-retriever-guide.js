/**
 * Golden Retriever Finance Guide - Draggable Version
 * Positioned: bottom 120px (customizable via drag), right 20px
 * Z-index: 1001 (above both Yoda 997 and chatbot modal)
 * Fully draggable/movable with position persistence
 */

(function() {
    // Inject styles first
    const style = document.createElement('style');
    style.textContent = `
        .gr-container { 
            position: fixed; 
            bottom: 30px; 
            right: 20px; 
            z-index: 1001; 
            pointer-events: auto;
            user-select: none;
        }
        
        .gr-dog { 
            width: 100px; 
            height: 100px; 
            cursor: grab; 
            animation: breathe 3s infinite; 
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
            50% { transform: rotate(-15deg); } 
        }
        
        @keyframes pant { 
            0%, 100% { opacity: 1; } 
            50% { opacity: 0.7; } 
        }
        
        .gr-tongue { 
            animation: pant 1.2s infinite; 
        }
        
        .gr-tail { 
            animation: wag 1.5s infinite; 
            transform-origin: 50% 120px; 
        }
        
        /* Mobile Optimization */
        @media (max-width: 768px) { 
            .gr-container { 
                bottom: 30px; 
                right: 15px;
            } 
            
            .gr-dog { 
                width: 80px; 
                height: 80px; 
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
                bottom: 30px;
                right: 10px;
            }
            
            .gr-dog {
                width: 70px;
                height: 70px;
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
            this.messages = ["🐕 Woof! Sanjeev's finance guide here!", "Choose Chat & Learn, Coaching, or Services!"];
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
                    <svg class="gr-dog" viewBox="0 0 200 200"><ellipse cx="100" cy="130" rx="45" ry="50" fill="#D4A574"/><ellipse cx="100" cy="110" rx="40" ry="45" fill="#E8C89F"/><circle cx="100" cy="70" r="35" fill="#E8C89F"/><ellipse cx="100" cy="85" rx="20" ry="16" fill="#F0D9B5"/><ellipse cx="100" cy="82" rx="8" ry="7" fill="#4A4A4A"/><circle cx="92" cy="62" r="5" fill="#4A4A4A"/><circle cx="108" cy="62" r="5" fill="#4A4A4A"/><circle cx="93" cy="60" r="2" fill="#fff"/><circle cx="109" cy="60" r="2" fill="#fff"/><ellipse cx="75" cy="50" rx="15" ry="25" fill="#D4A574"/><ellipse cx="125" cy="50" rx="15" ry="25" fill="#D4A574"/><ellipse class="gr-tongue" cx="100" cy="95" rx="6" ry="5" fill="#FF9999"/><path class="gr-tail" d="M 50 120 Q 35 110 40 90" stroke="#D4A574" stroke-width="12" fill="none" stroke-linecap="round"/></svg>
                    <div id="gr-bubble" class="gr-bubble" style="display:none;"></div>
                    <div id="gr-menu" class="gr-menu" style="display:none;">
                        <button class="gr-btn" id="gr-chat-btn">💬 Chat & Learn</button>
                        <button class="gr-btn" id="gr-coaching-btn">📚 Coaching</button>
                        <button class="gr-btn" id="gr-services-btn">🎯 Services</button>
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
            if (bubble) bubble.style.display = 'none';
            if (menu) menu.style.display = 'block';
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
                this.showBubble('💬 Find the chat option in the top menu!');
            }
        }
        
        coaching() { 
            this.hideMenu();
            this.showBubble('📚 Check coaching in top menu!'); 
        }
        
        services() { 
            this.hideMenu();
            this.showBubble('🎯 Explore Postmate & Topmate packages!'); 
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
