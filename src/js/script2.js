export const monModule = () => {
    const motAtrouver = 'HTML CSS JAVASCRIPT'; // Mot ou phrase à deviner
    let essaiRestant = 5; // Nombre de tentatives restantes
    let lettresDevinees = []; // Lettres devinées

    const resetGame = () => {
        document.getElementById('motAtrouver').textContent = '';
        document.getElementById('essaiRestant').textContent = '5';
        document.getElementById('message').textContent = '';
        lettresDevinees = [];
        creerAlphabet();
        creerMotAtrouverDom();
    }

    const creerAlphabet = () => {
        if (document.getElementById('alphabet')) {
            document.getElementById('alphabet').innerHTML = '';
            for (let i = 65; i <= 90; i++) {
                const lettre = String.fromCharCode(i);
                const button = document.createElement('button');
                button.textContent = lettre;
                button.addEventListener('click', (evt) => devinerLettre(lettre, evt));
                document.getElementById('alphabet').appendChild(button);
            }
        }
    }

    const creerMotAtrouverDom = () => {
        document.getElementById('resetButton').addEventListener('click', resetGame);
        if (document.getElementById('motAtrouver')) {
            document.getElementById('motAtrouver').textContent = motAtrouver.replace(/\S/g, '_');
        }
    }

    const devinerLettre = (lettre, evt) => {
        if (essaiRestant <= 0 || lettresDevinees.includes(lettre)) {
            return;
        }
        lettresDevinees.push(lettre);
        if (motAtrouver.includes(lettre)) {
            revelerLettre(lettre);
            verifierVictoire();
        } else {
            essaiRestant--;
            document.getElementById('essaiRestant').textContent = essaiRestant;
            if (essaiRestant <= 0) {
                document.getElementById('message').textContent = 'Vous avez épuisé toutes vos tentatives. Vous avez perdu.';
                revelerMot();
            }
        }
        document.getElementById('alphabet').removeChild(evt.target);
    }

    const revelerLettre = (lettre) => {
        const tabDeMot = motAtrouver.split('');
        const motAtrouverArray = document.getElementById('motAtrouver').textContent.split('');
        for (let i = 0; i < tabDeMot.length; i++) {
            if (tabDeMot[i] === lettre) {
                motAtrouverArray[i] = lettre;
                document.getElementById('motAtrouver').textContent = motAtrouverArray.join('');
            }
        }
    }

    const verifierVictoire = () => {
        if (!document.getElementById('motAtrouver').textContent.includes('_')) {
            document.getElementById('message').textContent = 'Bravo ! Vous avez deviné la phrase.';
            revelerMot();
        }
    }

    const revelerMot = () => {
        if (document.getElementById('motAtrouver')) {
            document.getElementById('motAtrouver').textContent = motAtrouver;
        }
    }
    return {
        creerAlphabet,
        creerMotAtrouverDom,
        resetGame,
        revelerMot,
        devinerLettre,
        revelerLettre,
        verifierVictoire
    }
};