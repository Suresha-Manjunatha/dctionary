export type RandomWordType = {
    word: string,
    definition:string,
    pronunciation: string,
    onPress: () => void
}

export const DictionayAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const RandomWordAPI = "https://random-words-api.vercel.app/word";

