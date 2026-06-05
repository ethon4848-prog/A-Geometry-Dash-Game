/**
 * Level Data Structure
 */

class Level {
    constructor(levelData) {
        this.data = levelData;
        this.blocks = [];
        this.decorations = [];
        this.triggers = [];
        this.width = levelData.width || 5000;
        this.height = 720;
        
        this.loadLevel();
    }

    loadLevel() {
        // Parse level data and create blocks
        if (this.data.blocks) {
            for (let blockData of this.data.blocks) {
                this.blocks.push(new Block(blockData));
            }
        }
        
        if (this.data.decorations) {
            for (let decData of this.data.decorations) {
                this.decorations.push(new Decoration(decData));
            }
        }
    }

    update(deltaTime) {
        for (let block of this.blocks) {
            block.update(deltaTime);
        }
    }

    render(ctx) {
        // Render background
        ctx.fillStyle = '#0099FF';
        ctx.fillRect(0, 0, this.width, this.height);
        
        // Render decorations
        for (let dec of this.decorations) {
            dec.render(ctx);
        }
        
        // Render blocks
        for (let block of this.blocks) {
            block.render(ctx);
        }
    }

    getBlocksInRange(x1, x2) {
        return this.blocks.filter(b => b.x + b.width > x1 && b.x < x2);
    }
}

class Block {
    constructor(data) {
        this.x = data.x || 0;
        this.y = data.y || 0;
        this.width = data.width || 30;
        this.height = data.height || 30;
        this.type = data.type || 'solid';
        this.color = data.color || '#888888';
        this.rotation = data.rotation || 0;
        this.isVisible = true;
        this.isCollected = false;
    }

    update(deltaTime) {
        // Update animations, triggers, etc.
    }

    render(ctx) {
        if (!this.isVisible) return;
        
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Draw border
        ctx.strokeStyle = '#555555';
        ctx.lineWidth = 1;
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        ctx.restore();
    }
}

class Decoration {
    constructor(data) {
        this.x = data.x || 0;
        this.y = data.y || 0;
        this.width = data.width || 50;
        this.height = data.height || 50;
        this.type = data.type || 'glow';
        this.opacity = data.opacity || 0.5;
    }

    render(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#FFFF00';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}