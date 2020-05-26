
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

    createEntry: async function (db, data){
        try{
            await db.query(`
                INSERT INTO public."Entries"(
                data, date)
                VALUES ( '${data}', (to_timestamp(${Date.now()} / 1000.0)));`)
            return true
        }
        catch(e){
            return false
        }
    }
}