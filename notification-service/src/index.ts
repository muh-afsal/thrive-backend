import server from './presentation/server'


(async()=>{
    try {
        server;
    } catch (error:any) {
        console.error(error?.message || 'An error occurred in server connection');
        process.exit(1);
    }
})(); 