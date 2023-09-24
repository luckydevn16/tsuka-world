"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBrowserClient = void 0;
const auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
const createBrowserClient = () => (0, auth_helpers_nextjs_1.createBrowserSupabaseClient)();
exports.createBrowserClient = createBrowserClient;
