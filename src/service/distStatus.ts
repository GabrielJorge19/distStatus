
export default async function GET() {

    try{

        
        const distritos = await (await fetch("https://tcrtcjrkdfjpzvrewhgg.supabase.co/functions/v1/dist-status")).json();
        // console.log(distritos)
        return distritos

    } catch (erro){
        console.error(erro);
        return {}
    }
    

}

