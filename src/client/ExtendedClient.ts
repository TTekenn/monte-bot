import { Client, Collection, GatewayIntentBits} from 'discord.js'

class ExtendedClient extends Client {
    public commands: Collection<string, any>

    constructor() {
        super ({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]

        })
        this.commands = new Collection()
    }
}

export default ExtendedClient