import { createServiceRoleClient } from "@/utils/supabase-server"

/**
 * A server-side function for getting the list of report categories from the db
 * @returns An array of the report categories
 */
async function getReportCategories(): Promise<string[]> {
    const supabase = createServiceRoleClient()
    const { data, error } = await supabase.from("report_categories").select("*")

    if (error) {
        console.log(error)
        return []
    }

    return data.map(a => {
        return a.name
    })
}

export default getReportCategories