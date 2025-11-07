import { supabaseApi } from './supabaseApi'
import { supabase } from '@/lib/supabaseClient'

type Author = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  bio?: string | null;
  image_url?: string | null;
};

export const authorsApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // ✅ GET paginated authors
    getAuthorsPaginated: builder.query<
      { data: Author[]; count: number },
      { page: number; pageSize: number }
    >({
      async queryFn({ page, pageSize }) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        const { data, error, count } = await supabase
          .from('authors')
          .select("*", { count: "exact" })
          .range(start, end)

        if (error) return { error }
        return { data: { data, count: count ?? 0 } }
      },
      providesTags: ["Authors"],
    }),

    // ✅ GET all authors (no pagination)
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
  useGetAuthorsPaginatedQuery,
  useAddAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} = authorsApi
