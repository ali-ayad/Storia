import { supabaseApi } from './supabaseApi'
import { supabase } from '@/lib/supabaseClient'

type Author = {
  id: string;
  created_at: string;
  name: string;
  email:string;
  bio?: string | null;
};

export const authorsApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // ✅ GET all authors
    getAuthors: builder.query<Author[], void>({
      async queryFn() {
        const { data, error } = await supabase.from('authors').select('*')
        if (error) return { error }
        return { data }
      },
      providesTags: ['Authors'],
    }),

    // ✅ ADD a new author
    addAuthor: builder.mutation<Author[], Partial<Author>>({
      async queryFn(newAuthor) {
        const { data, error } = await supabase
          .from('authors')
          .insert(newAuthor)
          .select()

        if (error) return { error }
        return { data }
      },
      invalidatesTags: ['Authors'],
    }),

    // ✅ UPDATE an author
    updateAuthor: builder.mutation<Author[], { id: string; updates: Partial<Author> }>({
      async queryFn({ id, updates }) {
        const { data, error } = await supabase
          .from('authors')
          .update(updates)
          .eq('id', id)
          .select()

        if (error) return { error }
        return { data }
      },
      invalidatesTags: ['Authors'],
    }),

    // ✅ DELETE an author
    deleteAuthor: builder.mutation<{ id: string }, string>({
      async queryFn(id) {
        const { error } = await supabase.from('authors').delete().eq('id', id)
        if (error) return { error }
        return { data: { id } }
      },
      invalidatesTags: ['Authors'],
    }),
  }),
})

export const {
  useGetAuthorsQuery,
  useAddAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} = authorsApi
