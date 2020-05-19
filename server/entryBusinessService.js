
module.exports = {
    readEntries: async function (db){
        try{
            const results = await db.query(`select * from public."Entries";`)
            return results.rows
        }
        catch(e){
            console.error(`Failed to add ${e}`)
            return [];
        }
    },

    createEntry: async function (db, entry){
        try{
            await db.query(`INSERT INTO public."Entries"(
                id, data)
                VALUES (${entry})`)
            return true
        }
        catch(e){
            return false
        }
    }
}