"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceRoleClient = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const createServiceRoleClient = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE;
    if (!url || !key) {
        throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE");
    }
    else {
        return (0, supabase_js_1.createClient)(url, key);
    }
};
exports.createServiceRoleClient = createServiceRoleClient;
