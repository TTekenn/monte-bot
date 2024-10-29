import { SlashCommandBuilder } from "discord.js";
import { CommandInteraction, EmbedBuilder } from "discord.js";

export const command = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Muestra las redes sociales del bot'),

    async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder()
        .setColor(0X0099ff) 
        .setTitle('Redes Sociales')
        .setDescription('Síguenos en nuestras redes sociales!') 
        .addFields (
            {name: 'Instagram', value: '[Instagram](https://instagram.com/monteolimpo)', inline: true},
            {name: 'Twitter', value: '[Twitter](https://twitter.com/monteolimpo)', inline: true},
            {name: 'Tiktok', value: '[Youtube](https://tiktok.com/monteolimpo)', inline: true}
        )
        .setFooter({text: 'Gracias por seguirnos!'})
        .setTimestamp()

        await interaction.reply({ embeds: [embed]})
    }
}