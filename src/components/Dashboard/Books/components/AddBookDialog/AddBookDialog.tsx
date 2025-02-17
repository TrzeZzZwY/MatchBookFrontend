'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import BookService from '../../services/BooksService';

const addBookSchema = z.object({
  title: z.string().min(1, 'Tytuł jest wymagany'),
  authorsIds: z
    .string()
    .min(1, 'Każda książka musi mieć co najmniej jednego autora')
    .refine((val) => {
      const ids = val.split(/[\s,]+/).map((id) => parseInt(id.trim(), 10));
      return ids.every((id) => !isNaN(id));
    }, 'Wprowadzone identyfikatory autorów są nieprawidłowe'),
});

type AddBookFormValues = z.infer<typeof addBookSchema>;

interface AddBookDialogProps {
  onBookAdded: () => void;
}

export function AddBookDialog({ onBookAdded }: AddBookDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<AddBookFormValues>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      title: '',
      authorsIds: '',
    },
  });

  const onSubmit = async (data: AddBookFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const authorsIdsArray = data.authorsIds
      .split(/[\s,]+/)
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));

    try {
      await BookService.addBook({
        title: data.title,
        AuthorsIds: authorsIdsArray,
      });

      toast({
        title: 'Sukces',
        description: 'Książka została dodana pomyślnie.',
      });

      onBookAdded();
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error('Failed to add book:', error);
      toast({
        title: 'Błąd',
        description:
          'Nie udało się dodać książki, sprawdź przy ID Autora/ów są poprawne.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Dodaj książkę
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background text-foreground sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Dodaj nową książkę
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Wprowadź dane nowej książki, a następnie kliknij przycisk Zapisz
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Tytuł</FormLabel>
                  <FormControl>
                    <Input
                      className="border-border bg-background text-foreground focus:border-ring focus:ring-ring"
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
                  <FormLabel className="text-foreground">
                    Autor/Autorzy (IDs)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-border bg-background text-foreground focus:border-ring focus:ring-ring"
                      placeholder="Wpisz ID autorów oddzielone przecinkami lub spacjami"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                Zapisz książkę
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
