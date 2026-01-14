 import {neon} from '@neondatabase/serverless'

    // const db = neon.createClient({
    //     connectionString: process.env.DATABASE_URL,
    //     ssl: true,
    //   })
 
    const db = neon(`${process.env.DATABASE_URL}`);

    export default db;
