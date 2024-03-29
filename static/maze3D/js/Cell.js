function Cell(i, j) {
    this.i = i;
    this.j = j;
    //top right bottom left
    this.walls = [true, true, true, true];
    this.visited = false;
    this.isPlayerPosition = false
    this.showPath = true
    this.checkNeighbors = function () {
        var neighbors = [];
        var top = grid[this.index(i, j - 1)];
        var right = grid[this.index(i + 1, j)];
        var bottom = grid[this.index(i, j + 1)];
        var left = grid[this.index(i - 1, j)];
        // if (mazeIsDrawing) {
        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }
        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length))
            return neighbors[r]
        } else {
            return undefined;
        }
        // }
    }

    this.checkNeighborsForPlayer = function () {
        var neighbors = [];
        var top = grid[this.index(i, j - 1)];
        var right = grid[this.index(i + 1, j)];
        var bottom = grid[this.index(i, j + 1)];
        var left = grid[this.index(i - 1, j)];
        // if (mazeIsDrawing) {
        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }
        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length))
            return neighbors[r]
        } else {
            return undefined;
        }
        // }
    }
    this.index = function (i, j) {
        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
            return -1
        }
        return i + j * cols;
    }
    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;

        if (this.visited) {
            noStroke();

            if (this.isPlayerPosition && this.showPath) {
                fill(color(currentR, currentB, currentG, 80))
            } else {
                noFill();
            }
            rect(x, y, w, w);
            stroke(currentR, currentB, currentG);
            strokeWeight(wallWeight);
            if (this.walls[0]) {
                // line(x, y, w + x, y);
                push();
                translate(x, y);
                strokeWeight(0);
                // rotateZ(21);
                // rotateY(25);
                rotateX(-10);
                fill(255)
                plane(w, w * 0.5);
                pop();
            }
            if (this.walls[1]) { line(x + w, y, x + w, y + w); }
            if (this.walls[2]) { line(x + w, y + w, x, y + w); }
            if (this.walls[3]) {
                line(x, y + w, x, y);
                push();
                translate(x, y + w);
                strokeWeight(0);
                // rotateZ(21);
                rotateY(26);
                // rotateX(-10);
                fill(100)
                plane(w * 0.5, w);
                pop();
            }
        }

    }
}