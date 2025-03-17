#!/bin/bash

# Script pour pousser les modifications vers GitHub
echo "Début du push vers GitHub..."

# Exécuter la commande git push
git push origin main

# Vérifier le statut du push
if [ $? -eq 0 ]; then
    echo "Push réussi !"
else
    echo "Le push a échoué. Veuillez essayer avec GitHub Desktop."
fi

echo "Fin du script." 