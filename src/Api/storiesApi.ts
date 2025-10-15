import { supabaseApi } from './supabaseApi'
import { supabase } from '@/lib/supabaseClient'

type Story = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string | null;
  published_at: string | null;
};


export const storiesApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all stories
    getStories: builder.query<Story[], void>({
      async queryFn() {
        const { data, error } = await supabase.from('stories').select('*')
        if (error) return { error }
        return { data }
      },
      providesTags: ['Stories'],
    }),

    // ADD a new story
    addStory: builder.mutation<Story[], Partial<Story>>({
      async queryFn(newStory) {
        const { data, error } = await supabase
          .from('stories')
          .insert(newStory)
          .select()
        if (error) return { error }
        return { data }
      },
      invalidatesTags: ['Stories'],
    }),

    // UPDATE a story
    updateStory: builder.mutation<Story[], { id: number; updates: Partial<Story> }>({
      async queryFn({ id, updates }) {
        const { data, error } = await supabase
          .from('stories')
          .update(updates)
          .eq('id', id)
          .select()
        if (error) return { error }
        return { data }
      },
      invalidatesTags: ['Stories'],
    }),

    // DELETE a story
    deleteStory: builder.mutation<{ id: number }, number>({
      async queryFn(id) {
        const { error } = await supabase.from('stories').delete().eq('id', id)
        if (error) return { error }
        return { data: { id } }
      },
      invalidatesTags: ['Stories'],
    }),
  }),
})


export const {
  useGetStoriesQuery,
  useAddStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
} = storiesApi
