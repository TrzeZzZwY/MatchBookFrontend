'use client';

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
import AuthorService from '../../services/AuthorsService';

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Imię musi mieć co najmniej 2 znaki')
    .max(50, 'Imię nie może przekraczać 50 znaków'),
  lastName: z
    .string()
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki')
    .max(50, 'Nazwisko nie może przekraczać 50 znaków'),
  country: z
    .string()
    .min(2, 'Kraj musi mieć co najmniej 2 znaki')
    .max(50, 'Kraj nie może przekraczać 50 znaków'),
  yearOfBirth: z
    .number({
      required_error: 'Rok urodzenia jest wymagany',
      invalid_type_error: 'Rok urodzenia musi być liczbą',
    })
    .int()
    .max(new Date().getFullYear(), 'Rok urodzenia nie może być w przyszłości'),
});

interface EditAuthorDialogProps {
  author: {
    id: number;
    firstName: string;
    lastName: string;
    country: string;
    yearOfBirth: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onAuthorUpdated: () => void;
}

export function EditAuthorDialog({
  author,
  isOpen,
  onClose,
  onAuthorUpdated,
}: EditAuthorDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: author.firstName,
      lastName: author.lastName,
      country: author.country,
      yearOfBirth: author.yearOfBirth,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await AuthorService.updateAuthor(author.id, values);
      onAuthorUpdated();
      onClose();
    } catch (error) {
      console.error('Failed to update author:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background text-foreground sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edytuj autora</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Zaktualizuj dane autora tutaj. Kliknij zapisz, gdy skończysz.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Imię</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-card text-foreground" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Nazwisko</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-card text-foreground" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Kraj</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-card text-foreground" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Rok urodzenia
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      className="bg-card text-foreground"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Zapisz zmiany</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
