import { supabaseApi } from './supabaseApi'
import { supabase } from '@/lib/supabaseClient'

export type Story = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  author_id: string | null;
  published_at: string | null;
  image_url?: string | null;
  authors?: {
    id: string;
    name: string;
  } | null;
};



export const storiesApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all stories
    getStories: builder.query<Story[], void>({
      async queryFn() {
        const { data, error } = await supabase.from('stories').select(`
  *,
  authors (
    id,
    name
  )
`)

        if (error) return { error }
        return { data }
      },
      providesTags: ['Stories'],
    }),
    // ✅ GET stories with pagination support
// ✅ GET stories with pagination + search support
getStoriesPaginated: builder.query<
  { data: Story[]; count: number },
  { page: number; pageSize: number; search?: string }
>({
  async queryFn({ page, pageSize, search = "" }) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    // Base query
    let query = supabase
      .from("stories")
      .select(
        `
        *,
        authors (
          id,
          name
        )
      `,
        { count: "exact" }
      )
      .range(start, end)
      .order("created_at", { ascending: false });

    // 🔍 Apply search filter if search string is not empty
 if (search.trim() !== "") {
  query = query.ilike("title", `%${search}%`);
}

    const { data, error, count } = await query;

    if (error) return { error };

    return {
      data: {
        data: data ?? [],
        count: count ?? 0,
      },
    };
  },
  providesTags: ["Stories"],
}),

// ✅ GET a single story by ID
getStoryById: builder.query<Story, string>({
  async queryFn(id) {
    const { data, error } = await supabase
      .from("stories")
      .select(
        `
        *,
        authors (
          id,
          name
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) return { error };
    return { data };
  },
  providesTags: ["Stories"],
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
    updateStory: builder.mutation<Story[], { id: string; updates: Partial<Story> }>({
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
    deleteStory: builder.mutation<{ id: string }, string>({
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
  useGetStoriesPaginatedQuery,
  useGetStoryByIdQuery,
} = storiesApi
