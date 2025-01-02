'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import BookService from '../../services/BooksService';
import { useToast } from '@/hooks/use-toast';

const editBookSchema = z.object({
  title: z.string().min(1, 'Tytuł jest wymagany'),
  authorsIds: z
    .string()
    .min(1, 'Każda książka musi mieć co najmniej jednego autora')
    .refine((val) => {
      const ids = val.split(/[\s,]+/).map((id) => parseInt(id.trim(), 10));
      return ids.every((id) => !isNaN(id));
    }, 'Wprowadzone identyfikatory autorów są nieprawidłowe'),
});

type EditBookFormValues = z.infer<typeof editBookSchema>;

interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

interface EditBookDialogProps {
  book: { id: number; title: string; authors: Author[] } | null;
  onClose: () => void;
  fetchBooks: () => void;
}

export function EditBookDialog({
  book,
  onClose,
  fetchBooks,
}: EditBookDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<EditBookFormValues>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      title: '',
      authorsIds: '',
    },
  });
  const { toast } = useToast();

  useEffect(() => {
    if (book) {
      form.reset({
        title: book.title,
        authorsIds: book.authors.map((author) => author.id).join(', '),
      });
    }
  }, [book, form]);

  const onSubmit = async (data: EditBookFormValues) => {
    if (isSubmitting || !data.authorsIds || data.authorsIds.length === 0) {
      return;
    }

    setIsSubmitting(true);

    const authorsIdsArray = data.authorsIds
      .split(/[\s,]+/)
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));

    if (book) {
      try {
        await BookService.updateBook(book.id, {
          title: data.title,
          AuthorsIds: authorsIdsArray,
        });

        toast({
          title: 'Sukces',
          description: 'Książka została pomyślnie edytowana.',
        });

        fetchBooks();

        onClose();
      } catch (error) {
        console.error('Failed to update book:', error);
        toast({
          variant: 'destructive',
          title: 'Błąd',
          description: 'Nie udało się edytować książki.',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={!!book} onOpenChange={onClose}>
      <DialogContent className="text-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black">Edycja Książki</DialogTitle>
          <DialogDescription>
            Dokonaj zmian, a następnie kliknij przycisk Zapisz zmiany.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Tytuł</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Wpisz tytuł książki"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorsIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    Autor/Autorzy (IDs)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Wpisz identyfikatory autorów oddzielone przecinkami lub spacjami"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                Zapisz zmiany
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
