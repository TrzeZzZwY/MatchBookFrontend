'use client';

import { useEffect, useState } from 'react';
import UserBooksService, { UserBookItem } from '../../services/UserBookService';
import { Button } from '@/components/ui/button';
import BookDetailsDialog from '../BookDetailsDialog/BookDetailsDialog';

interface UserBooksCellProps {
  userId: number;
}

export default function UserBooksCell({ userId }: UserBooksCellProps) {
  const [books, setBooks] = useState<UserBookItem[]>([]);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchBooks = UserBooksService.getUserBooks(userId, {
      pageSize: 50,
      pageNumber: 1,
      includeBookAuthors: true,
    });
    fetchBooks
      .then((data) => setBooks(data.items))
      .catch(() => setError('Błąd podczas pobierania książek.'));
    return () => fetchBooks.cancel();
  }, [userId]);

  if (error) {
    return <span className="text-red-500">Błąd</span>;
  }

  if (books.length === 0) {
    return <span>Brak książek</span>;
  }

  const firstBook = books[0];

  return (
    <div>
      <Button variant="link" onClick={() => setShowDetails(true)}>
        {firstBook.bookReference.title} ({firstBook.status})
        {books.length > 1 && <span> +{books.length - 1} więcej</span>}
      </Button>
      {showDetails && (
        <BookDetailsDialog
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          books={books}
        />
      )}
    </div>
  );
}
