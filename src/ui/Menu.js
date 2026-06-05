/**
 * Main Menu
 */

class Menu {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.buttons = [
            { text: 'PLAY', action: () => gameManager.showLevelSelect() },
            { text: 'EDITOR', action: () => gameManager.startEditor() },
            { text: 'SETTINGS', action: () => this.showSettings() },
            { text: 'QUIT', action: () => this.quit() }
        ];
        this.selectedButton = 0;
        this.setupControls();
    }

    show() {
        // Menu is now visible
    }

    setupControls() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        if (this.gameManager.currentMode !== 'menu') return;
        
        if (e.key === 'ArrowUp') {
            this.selectedButton = (this.selectedButton - 1 + this.buttons.length) % this.buttons.length;
        }
        if (e.key === 'ArrowDown') {
            this.selectedButton = (this.selectedButton + 1) % this.buttons.length;
        }
        if (e.key === 'Enter') {
            this.buttons[this.selectedButton].action();
        }
    }

    render(ctx) {
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, 1280, 720);

        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 72px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GEOMETRY DASH', 640, 150);

        const buttonHeight = 80;
        const startY = 300;

        for (let i = 0; i < this.buttons.length; i++) {
            const y = startY + i * buttonHeight;
            const isSelected = i === this.selectedButton;

            ctx.fillStyle = isSelected ? '#FF00FF' : '#0099FF';
            ctx.font = isSelected ? 'bold 48px Arial' : '36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.buttons[i].text, 640, y);
        }
    }

    showSettings() {
        // Settings implementation
    }

    quit() {
        window.close();
    }
}