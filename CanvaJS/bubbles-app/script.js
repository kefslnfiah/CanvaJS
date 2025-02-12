// I am adding Maximum comments as I can, to make the code more uunderstandable





// Grab the canvas and set up the drawing context
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Set canvas size
canvas.width = 600;
canvas.height = 400;

// Define the bubbles and their properties
const bubbles = [
    { x: 50, y: 80, color: "yellow", isHit: false },  // This is for Bubble 1
    { x: 50, y: 160, color: "blue", isHit: false },   //             Bubble 2
    { x: 50, y: 240, color: "red", isHit: false },    //             Bubble 3
    { x: 50, y: 320, color: "green", isHit: false }   //             Bubble 4
];

// Define the arrows and their properties
const arrows = [
    { x: 550, y: 80, isMoving: false },  // This is for Arrow 1
    { x: 550, y: 160, isMoving: false }, //             Arrow 2
    { x: 550, y: 240, isMoving: false }, //             Arrow 3
    { x: 550, y: 320, isMoving: false }  //             Arrow 4
];

// Grab the reset button
const resetBut = document.getElementById("resetButton");

// Function to draw everything on the canvas
function draw() {
    // Clear the canvas before redrawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each bubble
    bubbles.forEach((bubble, index) => {
        context.fillStyle = bubble.isHit ? "gray" : bubble.color; // Condition to make bubble gray after hittting
        context.beginPath();
        context.arc(bubble.x, bubble.y, 25, 0, Math.PI * 2); // to draw a bubble
        context.fill();
    });

    // Draw each arrow
    arrows.forEach((arrow) => {
        context.strokeStyle = "black";
        context.beginPath();
        context.moveTo(arrow.x, arrow.y); // Start of the arrow
        context.lineTo(arrow.x - 20, arrow.y); // Arrow body
        context.lineTo(arrow.x - 10, arrow.y - 5); // Arrow tip (top)
        context.moveTo(arrow.x - 20, arrow.y); // Back to the body
        context.lineTo(arrow.x - 10, arrow.y + 5); // Arrow tip (bottom)
        context.stroke();
    });
}

// Handle clicks on the canvas
canvas.addEventListener("click", (event) => {
    // Get the click position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Check if a bubble was clicked
    bubbles.forEach((bubble, index) => {
        const distance = Math.sqrt((clickX - bubble.x) ** 2 + (clickY - bubble.y) ** 2);
        if (distance < 25 && !bubble.isHit) { // If clicked and not already hit
            arrows[index].isMoving = true; // Start moving the corresponding arrow
        }
    });
});

// Update the game state (move arrows, check for hits)
function update() {
    arrows.forEach((arrow, index) => {
        if (arrow.isMoving && arrow.x > bubbles[index].x + 30) {
            arrow.x -= 5; // Move the arrow left
        } else if (arrow.isMoving) {
            bubbles[index].isHit = true; // Mark the bubble as hit
            arrow.isMoving = false; // Stop the arrow
        }
    });
}

// Game loop to continuously update and draw the game
function gameLoop() {
    update(); // Update game logic
    draw();  // Draw everything
    requestAnimationFrame(gameLoop); // Repeat
}

// Reset the game when the reset button is clicked
resetBut.addEventListener("click", () => {
    bubbles.forEach(bubble => bubble.isHit = false); // Reset bubbles
    arrows.forEach(arrow => {
        arrow.x = 550; // Reset arrow position
        arrow.isMoving = false; // Stop arrow movement
    });
});

// Start the game loop
gameLoop();