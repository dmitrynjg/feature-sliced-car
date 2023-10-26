import { engineList, transmissionList } from '@/entitites/car';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { formCreateCarSchema } from '../lib/form-schema';
import { getValues } from '../lib/getValues';

export interface CreateCarFormProps {
  submit?: (values: z.infer<typeof formCreateCarSchema>) => void;
}

export const CreateCarForm: React.FC<CreateCarFormProps> = ({ submit }) => {
  const [engine, setEngine] = useState<string>('');

  const form = useForm<z.infer<typeof formCreateCarSchema>>({
    resolver: zodResolver(formCreateCarSchema),
    defaultValues: {
      name: '',
      color: '',
      brand: '',
      model: '',
      engine: '',
    },
    
  });

  const onSubmit = async (values: z.infer<typeof formCreateCarSchema>) => {
    try {
      submit && submit(getValues<z.infer<typeof formCreateCarSchema>>(values));
    } catch (error) {
      toast({
        title: 'Создание машины',
        description: 'Не удалось создать машину',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назавание автомобиля</FormLabel>
              <FormControl>
                <Input
                  placeholder='Porsche 911'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='color'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цвет автомобиля</FormLabel>
              <FormControl>
                <Input
                  placeholder='черный'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='brand'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Бренд</FormLabel>
              <FormControl>
                <Input
                  placeholder='Porsche'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='model'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Модель автомобиля</FormLabel>
              <FormControl>
                <Input
                  placeholder='911'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='yearIssue'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Год выписка</FormLabel>
              <FormControl>
                <Input
                  placeholder='2000'
                  type='number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input
                  placeholder='5000000'
                  type='number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='engine'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выберите тип движка</FormLabel>
              <Select
                onValueChange={(engine: string) => {
                  setEngine(engine);
                  console.log(engine);
                  field.onChange(engine);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Выбрать движок' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {engineList.map((engine) => (
                    <SelectItem
                      value={engine.text}
                      key={engine.name}
                    >
                      {engine.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {engine !== 'электрический' && engine !== '' && (
          <FormField
            control={form.control}
            name='transmission'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выберите трансмиссию</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Выбрать трансмиссию' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {transmissionList.map((transmission) => (
                      <SelectItem
                        value={transmission.text}
                        key={transmission.name}
                      >
                        {transmission.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormDescription>Трансмиссия может быть только у машин не с электрическим двигателем</FormDescription>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {engine === 'электрический' && (
          <FormField
            control={form.control}
            name='powerReserve'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Запас хода в км</FormLabel>
                <FormControl>
                  <Input
                    placeholder='480'
                    type='number'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Запас хода нужен для машин с электрическим двигателем</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type='submit'>Создать автомобиль</Button>
      </form>
    </Form>
  );
};
