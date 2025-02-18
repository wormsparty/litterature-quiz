import {FormEvent, useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Book } from 'lucide-react';

const questions = [
    {
        question: "Dans 'Les Misérables', quel objet Jean Valjean vole-t-il à l'évêque Myriel qui changera sa vie ?",
        reponse: "chandelier",
        indices: ["C'est un objet en argent", "Il y en a plusieurs", "Ils servent à éclairer"],
        livre: "Les Misérables - Victor Hugo",
        pdfLink: "https://beq.ebooksgratuits.com/vents/Hugo-miserables-1.pdf"
    },
    {
        question: "Dans 'Le Père Goriot', quelle est la profession d'Eugène de Rastignac avant son arrivée à Paris ?",
        reponse: "etudiant en droit",
        indices: ["Il étudie une discipline", "C'est lié à la justice", "Il n'a pas encore terminé ses études"],
        livre: "Le Père Goriot - Balzac",
        pdfLink: "https://beq.ebooksgratuits.com/balzac/Balzac-39.pdf"
    },
    {
        question: "Dans 'Madame Bovary', dans quelle ville Charles Bovary rencontre-t-il Emma pour la première fois ?",
        reponse: "bertaux",
        indices: ["C'est une ferme", "C'est là où vit le père d'Emma", "C'est lors d'une visite médicale"],
        livre: "Madame Bovary - Flaubert",
        pdfLink: "https://beq.ebooksgratuits.com/vents/Flaubert-Bovary.pdf"
    },
    {
        question: "Dans 'Notre-Dame de Paris', quel est le véritable prénom d'Esmeralda ?",
        reponse: "agnes",
        indices: ["C'est un prénom chrétien", "Sa mère le révèle à la fin", "Elle ne le sait pas elle-même"],
        livre: "Notre-Dame de Paris - Victor Hugo",
        pdfLink: "https://www.bibebook.com/files/ebook/libre/V2/hugo_victor_-_notre-dame_de_paris.pdf"
    },
    {
        question: "Dans 'Les Trois Mousquetaires', quel est le véritable nom de Milady de Winter ?",
        reponse: "anne de breuil",
        indices: ["Elle a été marquée au fer", "Elle était religieuse", "C'est son premier nom connu"],
        livre: "Les Trois Mousquetaires - Alexandre Dumas",
        pdfLink: "https://beq.ebooksgratuits.com/vents/Dumas_Les_trois_mousquetaires_1.pdf"
    },
    {
        question: "Dans 'Germinal', quel est le nom du cheval qui travaille dans la mine et que Bataille déteste ?",
        reponse: "trompette",
        indices: ["C'est un nom d'instrument", "Il est nouveau dans la mine", "Il meurt dans la mine"],
        livre: "Germinal - Émile Zola",
        pdfLink: "https://beq.ebooksgratuits.com/vents/zola-13.pdf"
    },
    {
        question: "Dans 'Le Rouge et le Noir', quel livre Julien Sorel connaît-il par cœur ?",
        reponse: "le memorial de sainte-helene",
        indices: ["C'est lié à Napoléon", "C'est un livre historique", "C'est écrit par Las Cases"],
        livre: "Le Rouge et le Noir - Stendhal",
        pdfLink: "https://beq.ebooksgratuits.com/vents/Stendhal-rouge.pdf"
    },
    {
        question: "Dans 'Les Fleurs du Mal', combien de poèmes ont pour thème principal le vin ?",
        reponse: "5",
        indices: ["Ces poèmes forment une section spécifique", "Ils incluent l'âme du vin", "Ils décrivent différents types de buveurs"],
        livre: "Les Fleurs du Mal - Baudelaire",
        pdfLink: "https://www.vousnousils.fr/casden/pdf/id00106.pdf"
    },
    {
        question: "Dans 'Candide', quel est le nom du pays imaginaire où tout est parfait selon le maître Pangloss ?",
        reponse: "eldorado",
        indices: ["C'est un pays légendaire", "On y trouve beaucoup d'or", "C'est en Amérique du Sud"],
        livre: "Candide - Voltaire",
        pdfLink: "https://www.ebooksgratuits.com/blackmask/voltaire_candide.pdf"
    },
    {
        question: "Dans 'Le Comte de Monte-Cristo', quel est le nom du geôlier sourd-muet qui s'occupe de Faria et Dantès au château d'If ?",
        reponse: "antonio",
        indices: ["Il est décrit comme un geôlier compatissant", "Son prénom est d'origine italienne", "Il aide parfois Faria en lui donnant plus de nourriture"],
        livre: "Le Comte de Monte-Cristo - Alexandre Dumas",
        pdfLink: "https://beq.ebooksgratuits.com/vents/Dumas_Le_comte_de_Monte_Cristo_1.pdf"
    }
];

const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [indiceIndex, setIndiceIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showIndice, setShowIndice] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [skippedQuestions, setSkippedQuestions] = useState(new Set());

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const isCorrect = userAnswer.toLowerCase().trim() === questions[currentQuestion].reponse.toLowerCase();

        if (isCorrect) {
            setScore(score + 1);
            setFeedback('Correct! 🎉');
            setTimeout(() => {
                nextQuestion();
            }, 1000);
        } else {
            setFeedback('Incorrect. Essayez encore ou demandez un indice.');
        }
    };

    const skipQuestion = () => {
        setSkippedQuestions(prev => new Set([...prev, currentQuestion]));
        nextQuestion();
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setUserAnswer('');
            setIndiceIndex(0);
            setShowIndice(false);
            setFeedback('');
        } else {
            setGameFinished(true);
        }
    };

    const showNextIndice = () => {
        if (indiceIndex < questions[currentQuestion].indices.length) {
            setShowIndice(true);
            setIndiceIndex(indiceIndex + 1);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setUserAnswer('');
        setIndiceIndex(0);
        setShowIndice(false);
        setGameFinished(false);
        setFeedback('');
        setSkippedQuestions(new Set());
    };

    const getFinalMessage = () => {
        if (score === 10) return "Parfait! Vous êtes un véritable expert de la littérature française! 🏆";
        if (score >= 7) return "Excellent! Vous connaissez très bien vos classiques! 📚";
        if (score >= 5) return "Pas mal! Vous avez une bonne connaissance des œuvres! 👏";
        return "Ces livres méritent d'être (re)lus! Bon courage dans vos lectures! 📖";
    };

    return (
        <div className="min-h-screen p-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Quiz des Classiques de la Littérature Française
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {!gameFinished ? (
                        <div className="space-y-6">
                            <div className="text-sm opacity-70 mb-4">
                                Question {currentQuestion + 1}/10
                            </div>
                            <div className="font-medium mb-4 flex items-center justify-between">
                                <span>{questions[currentQuestion].livre}</span>
                                <Button
                                    variant="default"
                                    className="bg-blue-400 hover:bg-blue-500"
                                    onClick={() => window.open(questions[currentQuestion].pdfLink, '_blank')}
                                >
                                    <Book className="h-4 w-4 mr-2" />
                                    Lire le livre
                                </Button>
                            </div>
                            <div className="text-lg mb-6">
                                {questions[currentQuestion].question}
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    className="w-full p-2 border rounded-md bg-transparent"
                                    placeholder="Votre réponse..."
                                />
                                <div className="flex space-x-4">
                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-400 hover:bg-blue-500"
                                    >
                                        Valider
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={showNextIndice}
                                        disabled={indiceIndex >= 3}
                                        variant="destructive"
                                        className="w-full"
                                    >
                                        Indice ({indiceIndex}/3)
                                    </Button>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={skipQuestion}
                                    className="w-full mt-2"
                                >
                                    Passer à la question suivante
                                </Button>
                            </form>
                            {showIndice && indiceIndex > 0 && (
                                <div className="mt-4 p-4 bg-blue-950 rounded-md border border-blue-800">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-blue-400" />
                                        <span>Indice {indiceIndex}: {questions[currentQuestion].indices[indiceIndex - 1]}</span>
                                    </div>
                                </div>
                            )}
                            {feedback && (
                                <div className={`mt-4 p-4 rounded-md ${
                                    feedback.includes('Correct')
                                        ? 'bg-green-950 text-green-400 border border-green-800'
                                        : 'bg-red-950 text-red-400 border border-red-800'
                                }`}>
                                    {feedback}
                                </div>
                            )}
                            <div className="text-sm opacity-70">
                                Score actuel: {score}/{currentQuestion + 1}
                                {skippedQuestions.size > 0 && (
                                    <span className="ml-4">
                    Questions passées: {skippedQuestions.size}
                  </span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="text-2xl font-bold mb-4">
                                Quiz terminé!
                            </div>
                            <div className="text-lg">
                                Score final: {score}/10
                            </div>
                            {skippedQuestions.size > 0 && (
                                <div className="text-sm opacity-70">
                                    Questions passées: {skippedQuestions.size}
                                </div>
                            )}
                            <div className="text-lg">
                                {getFinalMessage()}
                            </div>
                            <Button
                                onClick={restartQuiz}
                                className="mt-4 bg-blue-400 hover:bg-blue-500"
                            >
                                Recommencer le quiz
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default QuizApp;