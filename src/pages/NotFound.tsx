
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-6xl font-serif text-craft-terracotta mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved. Don't worry, you can find
          many beautiful handcrafted treasures on our homepage.
        </p>
        <Button asChild className="bg-craft-terracotta hover:bg-craft-clay">
          <Link to="/">Back to Homepage</Link>
        </Button>
      </div>
    </Layout>
  );
}
