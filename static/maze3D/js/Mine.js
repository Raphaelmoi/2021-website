function Mine(x, y, position) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.color = [0, 120, 30]
    this.strokecolor = [150, 150, 30]
    this.position = position

    this.drawMine = function () {
        fill(this.color[0], this.color[1], this.color[2])
        stroke(this.strokecolor[0], this.strokecolor[1], this.strokecolor[2]);
        ellipse(this.x, this.y, this.size);
    }

    this.kill = function (target, id) {
        target.splice(id, 1)
    }
    this.improvePlayerPositionH = function (i) {
        this.x = (i * w) + w / 2
    }
    this.improvePlayerPositionV = function (j) {
        this.y = (j * w) + w / 2
    }
}