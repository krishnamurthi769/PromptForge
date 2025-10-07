import { HistorySidebar } from '../HistorySidebar';

export default function HistorySidebarExample() {
  const mockItems = [
    {
      id: "1",
      query: "Write a blog post about AI in healthcare",
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      query: "Create a marketing email for a SaaS product launch",
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "3",
      query: "Explain quantum computing to a beginner",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ];

  const handleSelect = (id: string) => {
    console.log('Selected history item:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Deleted history item:', id);
  };

  return (
    <div className="h-screen p-6">
      <HistorySidebar
        items={mockItems}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
    </div>
  );
}
