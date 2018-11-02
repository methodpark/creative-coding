function floodfill(baseCoord) {
    let seen = {[baseCoord.x + '_' + baseCoord.y]: true}
    let generations = [[baseCoord]]
    let previousGeneration = generations[0]

    for (var i = 0; i < 20; i++) {
        let nextGeneration = calculateGeneration(previousGeneration)
        if (nextGeneration.length === 0) {
            return generations
        }

        generations.push(nextGeneration)
        previousGeneration = nextGeneration
    }

    return generations

    function calculateGeneration(previousGeneration) {
        let result = []
        previousGeneration.forEach(entry => {
            let neighbours = getNeigbours(entry)
                .filter(entry => validate(entry))
                .filter(entry => !seen[entry.x + '_' + entry.y])

            neighbours.forEach(entry => seen[entry.x + '_' + entry.y] = true)

            result = result.concat(neighbours)
        })

        return result
    }
}

function getNeigbours(coord) {
    return [
        {x: coord.x - 1, y: coord.y},
        {x: coord.x + 1, y: coord.y},
        {x: coord.x, y: coord.y + 1},
        {x: coord.x, y: coord.y - 1},

        // {x: coord.x - 1, y: coord.y - 1},
        // {x: coord.x + 1, y: coord.y + 1},
        // {x: coord.x - 1, y: coord.y + 1},
        // {x: coord.x + 1, y: coord.y - 1}
    ]
}

function validate(coord) {
    return !(coord.x < 0 || coord.x > 7 || coord.y < 0 || coord.y > 7)
}

module.exports = floodfill;