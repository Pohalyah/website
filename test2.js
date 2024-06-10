document.getElementById('bouton-deconnexion').addEventListener('click', function(){
    localStorage.removeItem('utilisateurConnecte');
    window.location.href = 'index.html';
})