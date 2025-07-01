'use server'

import { CreateCompanion, GetAllCompanions } from "@/types"
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('Companions')
        .insert({...formData, author})
        .select();
    if(error || !data) throw new Error(error?.message);
    return data[0];
}


export const getAllCompanions = async ({limit = 10, page= 1, subject, topic}: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('Companions').select();
    
    if(subject && topic) {
        query = query.ilike('subject', `${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: Companions, error} = await query;

    if (error) throw new Error(error?.message);

    return Companions;
}