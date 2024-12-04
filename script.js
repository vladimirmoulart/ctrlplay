let spinning = false; // Empêche plusieurs clics simultanés
let currentRotation = 0; // Stocke la rotation actuelle

const segments = [
    "Too bad! You move back one space...", "Congratulations! Your points for the next question are doubled!", "Too bad, you lose your turn...", "Congratulations, you can play again!",
    "Too bad! You move back one space...", "Congratulations! Your points for the next question are doubled!", "Too bad, you lose your turn...", "Congratulations, you can play again!"
]; // Définissez les segments de la roue


function spinWheel() {
    if (spinning) return; // Empêche de relancer si la roue tourne déjà
    spinning = true;

    const wheel = document.getElementById("wheel");

    // Génère une rotation aléatoire (minimum 4 tours complets)
    const randomRotation = Math.floor(Math.random() * 360) + 1440; // 1440 degrés = 4 tours complets
    const totalRotation = currentRotation + randomRotation; // Calcule la rotation finale

    // Applique la rotation avec une animation fluide
    wheel.style.transition = "transform 4s cubic-bezier(0.1, 0.9, 0.2, 1)";
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    // Attends que l'animation soit terminée
    setTimeout(() => {
        currentRotation = totalRotation % 360; // Réduit la rotation pour rester entre 0 et 360 degrés

        // Détermine le segment gagnant
        const segmentIndex = Math.floor((360 - currentRotation) / 45) % 8; // 45° par segment, ajusté à l'envers
        const result = segments[segmentIndex]; // Trouve le segment correspondant

        // Affiche le résultat
        alert(`${result}`);

        // Réinitialise pour la prochaine rotation
        wheel.style.transition = "none"; // Désactive temporairement la transition
        wheel.style.transform = `rotate(${currentRotation}deg)`; // Réinitialise la position visible
        setTimeout(() => {
            wheel.style.transition = "transform 4s cubic-bezier(0.1, 0.9, 0.2, 1)"; // Réactive la transition
            spinning = false; // Permet de relancer la roue
        }, 50); // Petit délai pour garantir une réinitialisation propre
    }, 4000); // Durée de l'animation (4 secondes)
}