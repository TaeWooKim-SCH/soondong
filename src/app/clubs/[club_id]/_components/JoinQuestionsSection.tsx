export default function JoinQuestionsSection({ questions }: PropsType) {
  return (
    <section className="w-full sm:w-[500px]">
      <div className="text-2xl text-blue font-bold mb-5">가입질문</div>
      <div className="space-y-5">
        {questions.map((question, idx) => (
          <article className="w-full border-[1.5px] border-blue p-5 rounded-md" key={idx}>
            <div className="text-blue font-bold mb-3">Q{idx + 1}. {question}</div>
            <textarea className="w-full min-h-[200px] border border-silver rounded-md px-3 py-2 outline-none resize-none" />
          </article>
        ))}
      </div>
    </section>
  );
}

interface PropsType {
  questions: string[];
}