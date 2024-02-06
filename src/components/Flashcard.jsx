import React, { useState, useEffect } from 'react';

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
        <div>
            {flashcards.map(flashcard =>
            <div key={flashcard.id}>
                <p>{flashcard.question}</p>
                <ul>
                    {flashcard.answers.map(answer =>
                    <li key={flashcard.id}>{answer}</li>
                    )}
                </ul>
            </div>
            )}
        </div>
    );
}