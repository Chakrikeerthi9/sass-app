'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Textarea } from "@/components/ui/textarea"

  
import { Input } from "@/components/ui/input"
import { subjects } from "@/constants"
import { createCompanion } from "@/lib/actions/companion.actions"
import { redirect } from "next/navigation"
 
const formSchema = z.object({
  name: z.string().min(2, {message: 'Name is required'}),
  subject: z.string().min(2, {message: 'Subject is required'}),
  topic: z.string().min(2, {message: 'Topic is required'}),
  voice: z.string().min(2, {message: 'Voice is required'}),
  style: z.string().min(2, {message: 'Style is required'}),
  duration: z.coerce.number().min(1, {message: 'Duration is required'}),
})

const CompanionForm = () => {

    // 1. Define your form.
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          subject: "",
          topic: "",
          voice: "",
          style: "",
          duration: 15,
    },
  })

 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createCompanion(values)

    if(companion) {
      redirect(`/companions`);
    } else {
      console.log('Failed to create a companion');
      redirect('/');
    }
  }


  return (
    <div>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input 
                    className="input"
                    placeholder="Enter a name for your companion" {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the subject" />
                </SelectTrigger>
                <SelectContent>
                    {
                        subjects.map((subject)=>(
                            <SelectItem 
                                key={subject}
                                value={subject}
                                className="capitalize"
                            >
                                {subject}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea 
                    className="input"
                    placeholder="Ex. Derivates & Integrals" {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the voice" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                </SelectContent>
            </Select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select the style" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
            </Select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input 
                    type="number"
                    className="input"
                    placeholder="Ex. 15" {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">Build your companion</Button>
      </form>
    </Form>
    </div>
  )
}

export default CompanionForm
