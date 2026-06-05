/**
 * Level Selection Screen
 */

class LevelSelect {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.selectedLevel = 0;
        this.levels = LEVEL_DATA || [];
        this.setupControls();
    }

    show() {
        // Level select is now visible
    }

    setupControls() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        if (this.gameManager.currentMode !== 'levelSelect') return;
        
        if (e.key === 'ArrowLeft') {
            this.selectedLevel = (this.selectedLevel - 1 + this.levels.length) % this.levels.length;
        }
        if (e.key === 'ArrowRight') {
            this.selectedLevel = (this.selectedLevel + 1) % this.levels.length;
        }
        if (e.key === 'Enter') {
            this.gameManager.startLevel(this.selectedLevel + 1);
        }
        if (e.key === 'Escape') {
            this.gameManager.showMenu();
        }
    }

    render(ctx) {
        ctx.fillStyle = '#0099FF';
        ctx.fillRect(0, 0, 1280, 720);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SELECT LEVEL', 640, 80);

        if (this.levels.length > 0) {
            const level = this.levels[this.selectedLevel];
            ctx.font = '32px Arial';
            ctx.fillText(`${this.selectedLevel + 1}. ${level.name}`, 640, 200);
            ctx.fillText(`Difficulty: ${level.difficulty}`, 640, 250);

            // Draw level indicators
            const startX = 400;
            const spacing = 60;
            for (let i = 0; i < Math.min(this.levels.length, 5); i++) {
                const x = startX + (i * spacing);
                ctx.fillStyle = i === this.selectedLevel ? '#FF00FF' : '#CCCCCC';
                ctx.fillRect(x, 350, 50, 50);
                ctx.fillStyle = '#000000';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(String(i + 1), x + 25, 385);
            }

            ctx.fillStyle = '#FFFFFF';
            ctx.font = '20px Arial';
            ctx.fillText('Use Arrow Keys to navigate, Enter to play, Escape to menu', 640, 600);
        }
    }
}