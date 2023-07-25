const motAtrouver = 'HTML CSS JAVASCRIPT'; // Mot ou phrase à deviner
const conteneurDesLettres = document.getElementById('alphabet');
const motAtrouverDom = document.getElementById('motAtrouver');
const essaiRestantDom = document.getElementById('essaiRestant');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let essaiRestant = 5; // Nombre de tentatives restantes
let guessedlettres = []; // Lettres devinées

if (resetButton) {
    resetButton.addEventListener('click', resetGame);
}

// tag:reset[]
function resetGame() {

    motAtrouverDom.textContent = '';
    essaiRestantDom.textContent = '5';
    messageElement.textContent = '';
    guessedlettres = [];
    creerAlphabet();
    creerMotAtrouverDom();
}

// end:reset[]

// tag:creation_bouton[]
function creerAlphabet() {
    if (conteneurDesLettres) {
        conteneurDesLettres.innerHTML = '';

        for (let i = 65; i <= 90; i++) {
            const lettre = String.fromCharCode(i);
            const button = document.createElement('button');
            button.textContent = lettre;
            button.addEventListener('click', (evt) => devinerLettre(lettre, evt));
            conteneurDesLettres.appendChild(button);
        }
    }
}

// end:reset[]

// tag:creation_du_mot_a_trouver[]
function creerMotAtrouverDom() {
    if (motAtrouverDom) {
        motAtrouverDom.textContent = motAtrouver.replace(/\S/g, '_');
    }
}

// end:creation_du_mot_a_trouver[]

// tag:recherche_d_une_lettre[]
function devinerLettre(lettre, evt) {
    if (essaiRestant <= 0 || guessedlettres.includes(lettre)) {
        return;
    }

    guessedlettres.push(lettre);

    if (motAtrouver.includes(lettre)) {
        revelerLettre(lettre);
        verifierVictoire();
    } else {
        essaiRestant--;
        essaiRestantDom.textContent = essaiRestant;

        if (essaiRestant <= 0) {
            messageElement.textContent = 'Vous avez épuisé toutes vos tentatives. Vous avez perdu.';
            revelerMot();
        }
    }
    conteneurDesLettres.removeChild(evt.target);
}

// end:recherche_d_une_lettre[]

// tag:revelation_d_une_lettre[]
function revelerLettre(lettre) {
    const tabDeMot = motAtrouver.split('');
    const motAtrouverArray = motAtrouverDom.textContent.split('');

    for (let i = 0; i < tabDeMot.length; i++) {
        if (tabDeMot[i] === lettre) {
            motAtrouverArray[i] = lettre;
            motAtrouverDom.textContent = motAtrouverArray.join('');
        }
    }
}

// end:revelation_d_une_lettre[]

// tag:verif_victoire[]
function verifierVictoire() {
    if (!motAtrouverDom.textContent.includes('_')) {
        messageElement.textContent = 'Bravo ! Vous avez deviné la phrase.';
        revelerMot();
    }
}

// end:verif_victoire[]

// tag:revelation_du_mot[]
function revelerMot() {
    if (motAtrouverDom) {
        motAtrouverDom.textContent = motAtrouver;
    }
}

// end:revelation_du_mot[]

creerAlphabet();
creerMotAtrouverDom();