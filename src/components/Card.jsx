import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.css';

export default function CardContainer() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetchCards();
    }, []); // Fetch cards on initial render

    const fetchCards = () => {
        fetch('https://opentdb.com/api.php?amount=6&category=9&difficulty=medium')
            .then((response) => response.json())
            .then((data) => {
                const mappedCards = data.results.map((result, index) => {
                    const answersMap = new Map();
                    result.incorrect_answers.forEach(answer => answersMap.set(answer, false));
                    answersMap.set(result.correct_answer, true);
                    return {
                        id: index,
                        question: result.question,
                        answers: answersMap,
                        flip: false
                    };
                });
                setCards(mappedCards);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleNewQuestionsClick = () => {
        setCards([]); // Clear existing cards
        fetchCards(); // Fetch new cards
    };

    return (
        <div>
            <div className='card-container'>
                {cards.map(card =>
                    <Card key={card.id} card={card}></Card>
                )}
            </div>
            <div className="button-container">
                <button className="newQuestionsButton" onClick={handleNewQuestionsClick}>Get New Questions</button>
            </div>
        </div>
    );
}

function Card({ card }) {
    const [flip, setFlip] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleFlip = () => {
        setFlip(!flip);
    };

    const checkAnswer = (selectedAnswer) => {
        const isCorrect = card.answers.get(selectedAnswer);
        setSelectedAnswer(selectedAnswer);
        if (isCorrect) {
            console.log("Correct answer!");
        } else {
            console.log("Incorrect answer!");
        }
    }

    function handleClick(selectedAnswer) {
        checkAnswer(selectedAnswer);
        handleFlip();
    }

    return (
        <div className={`card ${flip ? "flip" : ""}`}>
            <div className="front">
                <div className="cardText">
                    <p className='question'>{card.question}</p>
                    <ul className='answers'>
                        {[...card.answers.keys()].map((answer, index) =>
                            <li key={index} className='answer' onClick={() => handleClick(answer)}>{answer}</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="back" onClick={handleFlip}>
                <div className="cardText">
                    <p>{[...card.answers.entries()].find(([answer, isCorrect]) => isCorrect)[0]}</p>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        answers: PropTypes.instanceOf(Map).isRequired,
        flip: PropTypes.bool.isRequired
    }).isRequired
};


