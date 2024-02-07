import { useState, useEffect } from 'react';
import '../styles/flashcards.css';

export default function Flashcard() {
    const [flashcards, setFlashcards] = useState([]);
    
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const mappedFlashcards = data.results.map((result, index) => {
                    const answersMap = new Map();
                    result.incorrect_answers.forEach(answer => answersMap.set(answer, false));
                    answersMap.set(result.correct_answer, true);

                    return {
                        id: index,
                        question: result.question,
                        answers: answersMap
                    };
                });
                setFlashcards(mappedFlashcards);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className='flashcard-container'>
            {flashcards.map(flashcard =>
                <div key={flashcard.id} className='flashcard'>
                    <div className="flipper">
                        <div className="front">
                            <p className='question'>{flashcard.question}</p>
                            <ul className='answers'>
                                {[...flashcard.answers.keys()].map((answer, index) =>
                                    <li key={index} className='answer'>{answer}</li>
                                )}
                            </ul>
                        </div>
                        <div className="back">
                            <p className='question'>{flashcard.question}</p>
                            <p>{[...flashcard.answers.entries()].find(([answer, isCorrect]) => isCorrect)[0]}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
