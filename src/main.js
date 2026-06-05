/**
 * Geometry Dash Game - Main Entry Point
 */

class GameManager {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.game = null;
        this.currentMode = 'menu'; // menu, levelSelect, game, editor
        this.menu = null;
        this.levelSelect = null;
        this.editor = null;
        
        this.setupCanvas();
        this.initializeGame();
    }

    setupCanvas() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
    }

    initializeGame() {
        this.menu = new Menu(this);
        this.levelSelect = new LevelSelect(this);
        this.showMenu();
    }

    showMenu() {
        this.currentMode = 'menu';
        this.menu.show();
    }

    showLevelSelect() {
        this.currentMode = 'levelSelect';
        this.levelSelect.show();
    }

    startLevel(levelNumber) {
        const levelData = LEVEL_DATA[levelNumber - 1];
        this.game = new Game(this, levelData, levelNumber);
        this.currentMode = 'game';
        this.game.start();
    }

    startEditor() {
        this.editor = new LevelEditor(this);
        this.currentMode = 'editor';
        this.editor.show();
    }

    returnToMenu() {
        if (this.game) this.game.stop();
        if (this.editor) this.editor.stop();
        this.showMenu();
    }

    update(deltaTime) {
        if (this.currentMode === 'game' && this.game) {
            this.game.update(deltaTime);
        }
        if (this.currentMode === 'editor' && this.editor) {
            this.editor.update(deltaTime);
        }
    }

    render() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.currentMode === 'game' && this.game) {
            this.game.render(this.ctx);
        }
        if (this.currentMode === 'editor' && this.editor) {
            this.editor.render(this.ctx);
        }
        if (this.currentMode === 'menu') {
            this.menu.render(this.ctx);
        }
        if (this.currentMode === 'levelSelect') {
            this.levelSelect.render(this.ctx);
        }
    }
}

// Game loop
let lastTime = Date.now();
const gameManager = new GameManager();

function gameLoop() {
    const now = Date.now();
    const deltaTime = (now - lastTime) / 1000;
    lastTime = now;

    gameManager.update(Math.min(deltaTime, 0.016)); // Cap at 60 FPS
    gameManager.render();
    
    requestAnimationFrame(gameLoop);
}

gameLoop();