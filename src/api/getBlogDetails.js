// Obtenir les détails d'un blog
export const getBlogDetails = async (id) => {
    try {
        //Remplacez l'URL par l'endpoint de l'API
        const response = await fetch(`/api/blogs/${id}`);
        /* const response = await fetch(`https://premier-app-485e4.firebaseio.com/blogs/${id}.json`); */


        //Vérifier si la réponse est correcte
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        //Convertir la réponse en JSON
        const data = await response.json();
        console.log('Détails du blog :', data);

        //Retourner les données du blog
        return data;

    } catch (error) {
        console.error('Erreur :', error);
        throw error
    }
};
