import { PromptEditor } from '../PromptEditor';

export default function PromptEditorExample() {
  const handleEvaluate = (prompt: string) => {
    console.log('Evaluating prompt:', prompt);
  };

  return (
    <div className="p-6">
      <PromptEditor onEvaluate={handleEvaluate} isLoading={false} />
    </div>
  );
}
