import { useState, useEffect } from 'react';
import '../styles/flashcards.css';

export default function CardGrid() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=6&category=9&difficulty=medium')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const mappedCards = data.results.map((result, index) => {
                    const answersMap = new Map();
                    result.incorrect_answers.forEach(answer => answersMap.set(answer, false));
                    answersMap.set(result.correct_answer, true);
                    return {
                        id: index,
                        question: result.question,
                        answers: answersMap,
                        flip: false // Add flip state for each card
                    };
                });
                setCards(mappedCards);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className='card-grid'>
            {cards.map(card =>
                <Card key={card.id} card={card}></Card>
            )}
        </div>
    );
}

function Card({ card }) {
    const [flip, setFlip] = useState(false);

    const handleFlip = () => {
        setFlip(!flip);
    };

    return (
        <div className={`card ${flip ? "flip" : ""}`} onClick={handleFlip}>
            <div className="front">
                <div className="cardText">
                    <p className='question'>{card.question}</p>
                    <ul className='answers'>
                        {[...card.answers.keys()].map((answer, index) =>
                            <li key={index} className='answer'>{answer}</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="back">
                <div className="cardText">
                    <p className='question'>{card.question}</p>
                    <p>{[...card.answers.entries()].find(([answer, isCorrect]) => isCorrect)[0]}</p>
                </div>
            </div>
        </div>
    );
}

