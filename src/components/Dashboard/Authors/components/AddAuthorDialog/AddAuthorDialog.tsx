'use client';

import React from 'react';
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

interface AddAuthorDialogProps {
  onAuthorAdded: () => void;
}

export function AddAuthorDialog({ onAuthorAdded }: AddAuthorDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      yearOfBirth: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await AuthorService.addAuthor(values);
      onAuthorAdded();
      setIsOpen(false);
      form.reset();
      toast({
        title: 'Sukces',
        description: 'Autor został dodany pomyślnie.',
      });
    } catch (error) {
      console.error('Failed to add author:', error);
      toast({
        title: 'Błąd',
        description: 'Nie udało się dodać autora.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Dodaj autora
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background text-foreground sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Dodaj nowego autora
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Wprowadź dane nowego autora tutaj. Kliknij zapisz, gdy skończysz.
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
                    <Input
                      {...field}
                      className="border-border bg-background text-foreground focus:border-ring focus:ring-ring"
                    />
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
                    <Input
                      {...field}
                      className="border-border bg-background text-foreground focus:border-ring focus:ring-ring"
                    />
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
                    <Input
                      {...field}
                      className="border-border bg-background text-foreground focus:border-ring focus:ring-ring"
                    />
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
                      className="border-border bg-background text-foreground focus:border-ring focus:ring-ring"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Zapisz autora</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
