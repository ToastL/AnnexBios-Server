import { Client } from "pg"

const client = new Client({
    user: 'annexuser',
    password: 'ocVLMpIYdyyAEeBK4YbNZGY4Sl5ZP5CF',
    host: 'dpg-cri2ge3v2p9s73bj1im0-a.frankfurt-postgres.render.com',
    port: 5432,
    database: 'annexbios_okwf',
    ssl: true
})
client.connect()

export default client