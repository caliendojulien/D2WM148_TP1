import {monModule} from '../src/js/script2';

describe("scenario", () => {
    it("doit créer tous les boutons de l'alphabet", () => {
        const div = ajoutDom('alphabet', 'div');
        monModule().creerAlphabet();
        const tousLesBoutons = document.querySelectorAll('button');
        expect(tousLesBoutons.length).toBe(26);
        expect(div.id).toBe('alphabet');
    });

    it('doit remettre a zéro toutes les variables et les éléments du DOM', () => {
        const conteneurDesLettres = ajoutDom('alphabet', 'div');
        const motAtrouverDom = ajoutDom('motAtrouver', 'div');
        motAtrouverDom.textContent = 'ENI';
        const essaiRestantDom = document.createElement('span');
        essaiRestantDom.id = 'essaiRestant';
        essaiRestantDom.textContent = "3";
        document.body.appendChild(essaiRestantDom);
        const messageElement = document.createElement('div');
        messageElement.id = 'message';
        document.body.appendChild(messageElement);
        ajoutDom('resetButton', 'button')

        monModule().resetGame();

        expect(essaiRestantDom.textContent).not.toEqual("3");
        expect(essaiRestantDom.textContent).toEqual("5");
        expect(motAtrouverDom.textContent).not.toEqual("ENI");
        expect(conteneurDesLettres.innerHTML).not.toBe('');
        expect(messageElement.textContent).toBe('');
    });

    it('doit créer un nouveau mot', () => {
        const motAtrouverDom = ajoutDom('motAtrouver', 'div');
        motAtrouverDom.textContent = 'ENI';
        ajoutDom('resetButton', 'button')
        monModule().creerMotAtrouverDom();
        expect(motAtrouverDom.textContent).not.toEqual("ENI");
    });

    it("doit dire que c'est gagné", () => {
        const motAtrouverDom = ajoutDom('motAtrouver', 'div');
        motAtrouverDom.textContent = 'ENI';
        const messageDom = document.createElement('div');
        messageDom.id = 'message';
        messageDom.textContent = '';
        document.body.appendChild(messageDom);
        monModule().verifierVictoire();
        expect(messageDom.textContent).toBe("Bravo ! Vous avez deviné la phrase.");
    });

    it("doit révéler une lettre", () => {
        const motAtrouverDom = ajoutDom('motAtrouver', 'div');
        const resetButton = ajoutDom('resetButton', 'button');
        monModule().creerMotAtrouverDom();
        monModule().revelerLettre("J");
        expect(motAtrouverDom.textContent).toBe("____ ___ J_________");
        expect(resetButton.id).toBe("resetButton");
    });

    it("doit deviner la lettre", () => {
        const essaiRestantDom = document.createElement('span');
        essaiRestantDom.id = 'essaiRestant';
        essaiRestantDom.textContent = "5";
        document.body.appendChild(essaiRestantDom);
        const lettreJ = document.createElement('div');
        lettreJ.id = 'J';
        const lettreE = document.createElement('div');
        lettreE.id = 'E';
        const conteneurDesLettres = ajoutDom('alphabet', 'div');
        conteneurDesLettres.appendChild(lettreJ);
        conteneurDesLettres.appendChild(lettreE);
        document.body.appendChild(conteneurDesLettres);
        let evt1 = {
            target: lettreJ
        }
        let evt2 = {
            target: lettreE
        }
        const motAtrouverDom = document.createElement('p');
        motAtrouverDom.id = 'motAtrouver';
        document.body.appendChild(motAtrouverDom);
        const resetButton = ajoutDom('resetButton', 'button');
        monModule().creerMotAtrouverDom();
        monModule().devinerLettre("J", evt1);
        expect(essaiRestantDom.textContent).toBe("5");
        monModule().devinerLettre("E", evt2);
        expect(essaiRestantDom.textContent).toBe("4");
    });

    // Nettoyer le code après chaque test
    afterEach(() => {
        document.body.innerHTML = '';
    });
});


function ajoutDom(id, balise) {
    const element = document.createElement(balise);
    element.id = id;
    document.body.appendChild(element);
    return element;
}
