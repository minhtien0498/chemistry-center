
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';


const isValidUrl = (url) => {
    try {
        return Boolean(new URL(url));
    } catch (e) {
        return false;
    }
};

const supabaseUrl = isValidUrl(SUPABASE_URL) ? SUPABASE_URL : 'https://placeholder.supabase.co';
const supabaseKey = SUPABASE_ANON_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;
