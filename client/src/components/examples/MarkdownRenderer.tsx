import { MarkdownRenderer } from '../MarkdownRenderer';

export default function MarkdownRendererExample() {
  const mockContent = `Artificial Intelligence has revolutionized healthcare through advanced diagnostic capabilities and personalized treatment plans. The integration of AI in medical imaging has improved early detection rates significantly.

## Key Applications

### Diagnostic Tools
AI-powered diagnostic systems analyze medical images with remarkable accuracy. Studies show that AI can detect certain conditions with **95% accuracy**, matching or exceeding human radiologists in specific tasks.

### Patient Care
Machine learning algorithms help predict patient outcomes and recommend personalized treatment plans. This includes:
- Risk assessment for chronic diseases
- Medication optimization
- Treatment response prediction
- Early warning systems for deteriorating conditions

## Code Example

Here's a simple example of how AI models process medical data:

\`\`\`python
import tensorflow as tf

def predict_diagnosis(image_data):
    model = tf.keras.models.load_model('medical_model.h5')
    prediction = model.predict(image_data)
    return prediction
\`\`\`

## Statistics

| Application | Accuracy | Adoption Rate |
|-------------|----------|---------------|
| Medical Imaging | 95% | 67% |
| Disease Prediction | 88% | 52% |
| Treatment Planning | 91% | 45% |

**Note:** All data represents 2024 industry benchmarks.`;

  return (
    <div className="p-6">
      <MarkdownRenderer content={mockContent} />
    </div>
  );
}
