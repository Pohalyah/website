function verifierConnexion() {
    const utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte'));

    if (!utilisateurConnecte) {
        window.location.href = 'index.html';
    } else {
        console.log(`Bienvenue, ${utilisateurConnecte.username}`);
    }
}