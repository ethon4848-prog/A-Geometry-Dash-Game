/**
 * Head-Up Display
 */

class HUD {
    constructor(game) {
        this.game = game;
        this.showComplete = false;
        this.completeTime = 0;
    }

    render(ctx) {
        // Score display
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Score: ${this.game.score}`, 20, 30);
        ctx.fillText(`Coins: ${this.game.collectedCoins}`, 20, 60);

        // Level name
        ctx.textAlign = 'center';
        ctx.fillText(`Level ${this.game.levelNumber}: ${this.game.levelData.name}`, 640, 30);

        // Complete screen
        if (this.showComplete) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, 1280, 720);
            
            ctx.fillStyle = '#00FF00';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('LEVEL COMPLETE!', 640, 300);
            
            ctx.font = '32px Arial';
            ctx.fillText(`Score: ${this.game.score}`, 640, 400);
            ctx.fillText(`Coins Collected: ${this.game.collectedCoins}`, 640, 450);
            ctx.fillText('Press ENTER for next level', 640, 550);
        }
    }

    showCompleteScreen() {
        this.showComplete = true;
    }
}