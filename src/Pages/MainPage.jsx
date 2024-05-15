import React, { useState } from "react";
import axios from 'axios';

function MainPage() {
    const [text, setText] = useState('');
    const [data, setData] = useState('');

    const handleEvent = (e) => {
        setText(e.target.value);
    }

    const handleSearch = () => {
        searchWord(text);
    }

    const searchWord = (word) => {
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data[0]);
            })
            .catch((e) => {
                console.log(e);
                console.log("Error in fetching the data");
            })
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center" style={{ color: '#D2649A' }}>Free Dictionary</h1>
            <div className="flex flex-col md:flex-row items-center justify-center">
                <input type="text" value={text} placeholder="Enter your word" onChange={handleEvent} className="border rounded-l px-4 py-2 mb-2 md:mb-0 md:mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <button onClick={handleSearch} className="bg-pink-400 hover:bg-pink-600 text-white rounded-r px-4 py-2 focus:outline-none">
                    Search
                </button>
            </div>
            {data &&
                <div className="mt-4 border rounded p-4">
                    <h1 className="text-2xl font-bold mb-2">{data.word}</h1>
                    <div>
                        <h3 className="text-lg mb-2">Type: {data.meanings[0].partOfSpeech}</h3>
                        <h3 className="text-lg mb-2">Meaning: {data.meanings[0].definitions[0].definition}</h3>
                        <h3 className="text-lg mb-2">Example: {data.meanings[0].definitions[0].example}</h3>
                        {data.meanings[0].definitions[1] && (
                            <h3 className="text-lg">Another Meaning: {data.meanings[0].definitions[1].definition}</h3>
                        )}
                    </div>
                </div>}
        </div>
    )
}

export default MainPage;
