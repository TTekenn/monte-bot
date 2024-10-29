import { Client, Collection, GatewayIntentBits, Message, Events } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import ExtendedClient from './client/ExtendedClient'
import { REST, Routes } from 'discord.js'

class App {
    private client: ExtendedClient
    private token: string
    static loadCommands: any

    constructor(token: string) {
        this.client = new ExtendedClient()
        this.token = token
    }

    start() {
        this.loadCommands()
        this.client.login(this.token)
        this.client.once(Events.ClientReady, () => {
            console.log('Bot listo')
            registerCommands('1216075757533663314', '1241353275878670336', this.token)
        })
        this.initialize()
    }

    initialize() {
        this.client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isCommand()) return
            
            const command = this.client.commands.get(interaction.commandName)
            
            if (!command) return
            
            
            try {
                await command.execute(interaction)
            } catch (error) {
                console.error(error)
                await interaction.reply({ content: 'Hubo un error al ejecutar este comando!', ephemeral: true })
            }
        })
    }
    
    loadCommands() {
        const commandsPath = join(__dirname, 'commands')
        const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts'))
        
        for (const file of commandFiles) {
            const command = require(join(commandsPath, file)).command
            if (command && command.data && command.execute) {
                this.client.commands.set(command.data.name, command)
            } else {
                console.warn(`El comando en ${file} no tiene un "data" o "execute" válido.`)
            }
        }
    }
}

async function registerCommands(clientId: string, guildId: string, token: string) {
    const commands = new Collection<string, any>()
    const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.ts'))
    
    for (const file of commandFiles) {
        const command = require(join(__dirname, 'commands', file)).command
        if (command && command.data) {
            commands.set(command.data.name, command)
        }
    }
    
    const rest = new REST({ version: '10' }).setToken(token)
    
    try {
        console.log('Empezando a actualizar los comandos de aplicación (/)')
        
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands.map(cmd => cmd.data.toJSON()),
        })
        
        console.log('Comandos actualizados correctamente')
    } catch (error) {
        console.error(error)
    }
}

export default App
