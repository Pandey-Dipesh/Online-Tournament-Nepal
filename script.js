// Hardcoded Password
const ADVANCED_PANEL_PASSWORD = "Dipesh";

// Game Data Array (from localStorage if available)
let gameData = JSON.parse(localStorage.getItem("gameData")) || [];

// Access Advanced Panel
function accessAdvancedPanel() {
    const password = prompt("Enter the password to access the Advanced Panel:");

    if (password === ADVANCED_PANEL_PASSWORD) {
        document.getElementById("advanced-panel").style.display = "block";
    } else {
        alert("Incorrect password! Access denied.");
    }
}

// Add Game Details
function addGame() {
    const gameName = document.getElementById("gameName").value.trim();
    const teamName = document.getElementById("teamName").value.trim();
    const placement = parseInt(document.getElementById("placement").value, 10);
    const points = parseInt(document.getElementById("points").value, 10);

    if (!gameName || !teamName || isNaN(placement) || isNaN(points) || placement <= 0 || points < 0) {
        alert("Please fill out all fields correctly!");
        return;
    }

    // Add to gameData array
    const newGame = { gameName, teamName, placement, points };
    gameData.push(newGame);

    // Save to localStorage
    localStorage.setItem("gameData", JSON.stringify(gameData));

    // Update Table
    updateTable();

    // Clear Inputs
    document.getElementById("gameName").value = "";
    document.getElementById("teamName").value = "";
    document.getElementById("placement").value = "";
    document.getElementById("points").value = "";
}

// Update the Leaderboard Table
function updateTable() {
    const tableBody = document.getElementById("gameTable");
    tableBody.innerHTML = ""; // Clear previous rows

    gameData.forEach((data) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.gameName}</td>
            <td>${data.teamName}</td>
            <td>${data.placement}</td>
            <td>${data.points}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Mobile Menu Toggle Script
const mobileMenu = document.getElementById('mobile-menu');
const navbarMenu = document.querySelector('.navbar_menu');

mobileMenu.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

document.getElementById("mobile-menu").addEventListener("click", function () {
    document.querySelector(".navbar_menu").classList.toggle("show");
  });
  
  