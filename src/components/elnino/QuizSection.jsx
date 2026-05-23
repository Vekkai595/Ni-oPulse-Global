import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { quizQuestions } from "@/lib/elNinoData";
import { Button } from "@/components/ui/button";

export default function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentQ];

  const handleAnswer = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setFinished(false);
  };

  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <section className="px-4 py-16 max-w-3xl mx-auto" id="quiz">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          <span className="text-primary">Quiz</span> El Niño
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Teste seus conhecimentos sobre o fenômeno climático
        </p>

        <div className="glass rounded-2xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">
                    Pergunta {currentQ + 1} de {quizQuestions.length}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {score} ponto{score !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="h-1.5 bg-secondary rounded-full mb-8 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: `${(currentQ / quizQuestions.length) * 100}%` }}
                    animate={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Question */}
                <div className="flex items-start gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-display font-semibold text-foreground">{question.question}</h3>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {question.options.map((option, i) => {
                    let optionClass = "bg-secondary/50 hover:bg-secondary border-transparent hover:border-primary/30";
                    if (answered) {
                      if (i === question.correct) {
                        optionClass = "bg-risk-low/10 border-risk-low text-risk-low";
                      } else if (i === selected && i !== question.correct) {
                        optionClass = "bg-destructive/10 border-destructive text-destructive";
                      } else {
                        optionClass = "bg-secondary/30 border-transparent opacity-50";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={answered}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${optionClass} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-background text-sm font-semibold">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-sm">{option}</span>
                          {answered && i === question.correct && (
                            <CheckCircle2 className="w-5 h-5 ml-auto text-risk-low" />
                          )}
                          {answered && i === selected && i !== question.correct && (
                            <XCircle className="w-5 h-5 ml-auto text-destructive" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          <strong className="text-foreground">Explicação: </strong>
                          {question.explanation}
                        </p>
                      </div>
                      <Button onClick={nextQuestion} className="w-full">
                        {currentQ < quizQuestions.length - 1 ? (
                          <><span>Próxima Pergunta</span><ArrowRight className="w-4 h-4 ml-2" /></>
                        ) : (
                          <><span>Ver Resultado</span><Trophy className="w-4 h-4 ml-2" /></>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">Resultado</h3>
                <p className="text-4xl font-display font-bold text-primary mb-2">
                  {score}/{quizQuestions.length}
                </p>
                <p className="text-muted-foreground mb-2">{percentage}% de acerto</p>
                <p className="text-sm text-muted-foreground mb-8">
                  {percentage >= 80 ? "Excelente! Você domina o assunto!" :
                   percentage >= 60 ? "Bom trabalho! Continue estudando!" :
                   "Continue aprendendo sobre o El Niño!"}
                </p>
                <Button onClick={restart} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Tentar Novamente
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}