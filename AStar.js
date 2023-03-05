class Element {
    constructor(value, priority) {
        this.value = value
        this.priority = priority
    }
}

class PQueue {
    constructor() {
        this.elements = []
    }

    enqueue(value, priority) {
        var element = new Element([value[0], value[1]], priority)
        
        // if (element in this.elements) return

        for (var i = 0; i < this.elements.length; i++) {
            if (element.priority < this.elements[i].priority) {
                // correct spot found
                this.elements.splice(i, 0, element)
                return
            }
        }

        // new element is highest priority, append it
        this.elements.push(element)
    }

    dequeue() {
        if (this.isEmpty()) return

        // removes and returns element with lowest priority
        return this.elements.shift() 
    }

    peek() {
        if (this.isEmpty()) return

        // returns element with lowest priority
        return this.elements[0]
    }

    isEmpty() {
        return this.elements.length == 0
    }

    length() {
        return this.elements.length
    }

}

function neighbors(r, c) {
    return [[r+1, c],[r, c+1],[r-1, c],[r, c-1]]
}

// grid -> 2d array; start, end -> Tiles
function findPath(grid, start, end) {
    // the frontier are the elements that are about to be visited
    var frontier = new PQueue()
    frontier.enqueue(start, 0)

    // record visited tiles
    var visited = new Set()

    // record path
    var cameFrom = {}
    cameFrom[start] = null
    
    // cumulative distance
    var totalDist = {}
    totalDist[start] = 0

    while (!frontier.isEmpty()) {
        var current = frontier.dequeue().value

        if(current[0] == end[0] && current[1] == end[1]) {
            return getPath(current, cameFrom, totalDist[current])
        }

        neighbors(current[0], current[1]).forEach(neighbor => {
            // already visited
            if (neighbor in visited) return

            // out of bounds or is a wall
            var inBounds = 0 <= neighbor[0] && neighbor[0] < grid.length &&
            0 <= neighbor[1] && neighbor[1] < grid[0].length
            if(!inBounds || grid[neighbor[0]][neighbor[1]] == 0) return

            // new priority from cumulative distance and distance to endpoint
            var dist = totalDist[current] + 1
            if (neighbor in totalDist) {
            }
            if (!(neighbor in totalDist) || dist < totalDist[neighbor]) {

                visited.add(neighbor)
                totalDist[neighbor] = dist

                var priority = dist + getDist(neighbor, end)
                frontier.enqueue(neighbor, priority)

                cameFrom[neighbor] = current
            }
        });

    }
    
    return null;
}

// gets distance to endpoint
function getDist(start, end) {
    return Math.abs(end.r - start.r) + Math.abs(end.c - start.c)
}

// gets path after it is found
function getPath(current, cameFrom, dist) {
    var path = new Array(dist).fill(0)

    for (var i = dist - 1; i >= 0; i--) {
        if (current == null) break
        path[i] = current
        current = cameFrom[current]
    }

    return path
}