import axios from 'axios';

export const translate = async (text, languageFrom, languageTo) => {
    

    const options = {
        method: 'GET',
        url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
        params: { text: text, to: languageTo, from: languageFrom },
        headers: {
            'X-RapidAPI-Key': '5472b27e8dmsh755c54d2606b423p184c9cjsn9797e23eb3f5',
            'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
        }
    };

    const response = await axios.request(options).catch(function (error) {
        console.error(error);
    });

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Translate call failed. Response status: "+response.status);
    }
    return response.data;
}