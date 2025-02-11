// src/components/BookDetailsDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { UserBookItem } from '../../services/UserBookService';
import UserBooksService from '../../services/UserBookService';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import ChangeStatusDialog from '../../components/ChangeStatusDialog/ChangeStatusDialog';

interface BookDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  books: UserBookItem[];
}

export default function BookDetailsDialog({
  isOpen,
  onClose,
  books,
}: BookDetailsDialogProps) {
  // Local state so we can update the list after an operation.
  const [bookList, setBookList] = useState<UserBookItem[]>(books);
  useEffect(() => {
    setBookList(books);
  }, [books]);

  // State for the CRUD dialogs:
  const [deleteConfirmItem, setDeleteConfirmItem] =
    useState<UserBookItem | null>(null);
  const [statusChangeItem, setStatusChangeItem] = useState<UserBookItem | null>(
    null,
  );

  const handleDeleteConfirm = () => {
    if (!deleteConfirmItem) return;
    UserBooksService.deleteUserBookItem(deleteConfirmItem.id)
      .then(() => {
        setBookList((prev) =>
          prev.filter((b) => b.id !== deleteConfirmItem.id),
        );
        setDeleteConfirmItem(null);
      })
      .catch((err) => alert(err.message));
  };

  const handleStatusChangeSubmit = (newStatus: string) => {
    if (!statusChangeItem) return;
    UserBooksService.changeUserBookItemStatus(statusChangeItem.id, newStatus)
      .then(() => {
        setBookList((prev) =>
          prev.map((b) =>
            b.id === statusChangeItem.id ? { ...b, status: newStatus } : b,
          ),
        );
        setStatusChangeItem(null);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] max-w-7xl p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl">
                Książki użytkownika
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Informacje o książkach dodanych przez użytkownika.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 md:grid-cols-2">
              {bookList.map((book) => (
                <div
                  key={book.id}
                  className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-lg dark:border-gray-800"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {book.imageId ? (
                      <img
                        src={`http://localhost:8100/api/UserBookItem/image/${book.imageId}`}
                        alt={book.bookReference.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">
                          Brak okładki
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="relative space-y-4 p-6">
                    <h3 className="text-xl font-semibold leading-none tracking-tight">
                      {book.bookReference.title}
                    </h3>
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {book.status}
                    </div>
                    {book.description && (
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {book.description}
                      </p>
                    )}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Autorzy:</h4>
                      <ul className="space-y-1">
                        {book.bookReference.authors.map((author) => (
                          <li
                            key={author.id}
                            className="text-sm text-muted-foreground"
                          >
                            {author.firstName} {author.lastName}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteConfirmItem(book)}
                      >
                        Usuń
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setStatusChangeItem(book)}
                      >
                        Zmień status
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        <div className="flex items-center justify-end border-t bg-background p-4">
          <Button onClick={onClose}>Zamknij</Button>
        </div>
      </DialogContent>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmItem && (
        <ConfirmationDialog
          isOpen={!!deleteConfirmItem}
          onClose={() => setDeleteConfirmItem(null)}
          onConfirm={handleDeleteConfirm}
          title="Potwierdzenie usunięcia"
          description={`Czy na pewno chcesz usunąć użytkownikowi książkę "${deleteConfirmItem.bookReference.title}"?`}
          confirmLabel="Usuń"
          cancelLabel="Anuluj"
        />
      )}

      {/* Change Status Dialog */}
      {statusChangeItem && (
        <ChangeStatusDialog
          isOpen={!!statusChangeItem}
          onClose={() => setStatusChangeItem(null)}
          currentStatus={statusChangeItem.status}
          onSubmit={handleStatusChangeSubmit}
        />
      )}
    </Dialog>
  );
}
