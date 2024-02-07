import { useState, useEffect } from 'react';
import '../styles/flashcards.css';

export default function Flashcard() {
    const [flashcards, setFlashcards] = useState([]);
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const mappedFlashcards = data.results.map((result, index) => ({
                    id: index,
                    question: result.question,
                    answers: [result.correct_answer, ...result.incorrect_answers]
                }));
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
                            {flashcard.answers.map(answer =>
                            <li key={flashcard.id} className='answer'>{answer}</li>
                            )}
                        </ul>
                    </div>
                    <div className="back">
                        <p className='question'>{flashcard.question}</p>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}