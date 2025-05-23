import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index'; // Adjust path

// Define interfaces based on your ТЗ (adjust properties as needed)
export interface Vuz {
    id: string; // Or number
    name_ru: string;
    name_kg: string;
    location: string;
    reg_certificate: string;
    tin: string; // ИНН
    accreditation_decision_date: string; // Use string for dates from API, format later
    accreditation_certificate_details: string;
    accreditation_expiry_date: string;
    createdAt: string; // ISO 8601 date string
    updatedAt: string;
    // Add other fields from ТЗ item #12
}

export interface Program {
    id: string; // Or number
    code: string; // Шифр
    name_ru: string;
    name_kg: string;
    level: 'Бакалавр' | 'Магистр'; 
    vuzId: string;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // Foreign key to link to Vuz
    // Add other program-specific fields if any
}

// Define types for mutation arguments (omit 'id' for creation)
type NewVuzData = Omit<Vuz, 'id'>;
type UpdateVuzData = Vuz;
type NewProgramData = Omit<Program, 'id'>;
type UpdateProgramData = Program;


export const apiSlice = createApi({
    reducerPath: 'api', // Default is 'api'
    baseQuery: fetchBaseQuery({
        baseUrl: '/api', // Or your actual API base URL (e.g., http://localhost:5000/api)
        prepareHeaders: (headers, { getState }) => {
            // Add authorization token if available
            // const token = (getState() as RootState).auth.token;
            // if (token) {
            //     headers.set('authorization', `Bearer ${token}`);
            // }
            return headers;
        },
    }),
    tagTypes: ['Vuz', 'Program'], // Define tags for caching invalidation
    endpoints: (builder) => ({
        // VUZ Endpoints
        getVuzs: builder.query<Vuz[], void>({
            query: () => '/vuzs', // Your endpoint to get all VUZs
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Vuz' as const, id })),
                          { type: 'Vuz', id: 'LIST' },
                      ]
                    : [{ type: 'Vuz', id: 'LIST' }],
        }),
        getVuzById: builder.query<Vuz, string>({
            query: (id) => `/vuzs/${id}`, // Your endpoint to get a single VUZ
            providesTags: (result, error, id) => [{ type: 'Vuz', id }],
        }),
        addVuz: builder.mutation<Vuz, NewVuzData>({
            query: (newVuz) => ({
                url: '/vuzs', // Your endpoint to create a VUZ
                method: 'POST',
                body: newVuz,
            }),
            invalidatesTags: [{ type: 'Vuz', id: 'LIST' }], // Invalidate list on add
        }),
        updateVuz: builder.mutation<Vuz, UpdateVuzData>({
            query: ({ id, ...updateData }) => ({
                url: `/vuzs/${id}`, // Your endpoint to update a VUZ
                method: 'PUT', // Or PATCH
                body: updateData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Vuz', id }, { type: 'Vuz', id: 'LIST' }],
        }),
        deleteVuz: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/vuzs/${id}`, // Your endpoint to delete a VUZ
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Vuz', id }, { type: 'Vuz', id: 'LIST' }],
        }),

        // Program Endpoints (Similar structure)
        getPrograms: builder.query<Program[], void>({
            query: () => '/programs',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Program' as const, id })),
                          { type: 'Program', id: 'LIST' },
                      ]
                    : [{ type: 'Program', id: 'LIST' }],
        }),
        getProgramById: builder.query<Program, string>({
             query: (id) => `/programs/${id}`,
             providesTags: (result, error, id) => [{ type: 'Program', id }],
        }),
        addProgram: builder.mutation<Program, NewProgramData>({
             query: (newProgram) => ({ url: '/programs', method: 'POST', body: newProgram }),
             invalidatesTags: [{ type: 'Program', id: 'LIST' }],
        }),
        updateProgram: builder.mutation<Program, UpdateProgramData>({
             query: ({ id, ...updateData }) => ({ url: `/programs/${id}`, method: 'PUT', body: updateData }),
             invalidatesTags: (result, error, { id }) => [{ type: 'Program', id }, { type: 'Program', id: 'LIST' }],
        }),
        deleteProgram: builder.mutation<{ success: boolean; id: string }, string>({
             query: (id) => ({ url: `/programs/${id}`, method: 'DELETE' }),
             invalidatesTags: (result, error, id) => [{ type: 'Program', id }, { type: 'Program', id: 'LIST' }],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetVuzsQuery,
    useGetVuzByIdQuery,
    useAddVuzMutation,
    useUpdateVuzMutation,
    useDeleteVuzMutation,
    useGetProgramsQuery,
    useGetProgramByIdQuery,
    useAddProgramMutation,
    useUpdateProgramMutation,
    useDeleteProgramMutation,
} = apiSlice;