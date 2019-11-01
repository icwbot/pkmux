module.exports = {
	name: 'eval',
	description: 'eval',
	execute(message, args, bot) {
		if (message.author.id !== botowner) {
                message.reply('this command is only for bot owner!!!');
                return;
            }
            if (/bot.token/.exec(message.content.split(" ").slice(1).join(" "))) return message.channel.send("I think im not idiot");
            const code = comarg.join(" ");
            const token = bot.token.split("").join("[^]{0,2}");
            const rev = bot.token.split("").reverse().join("[^]{0,2}");
            const filter = new RegExp(`${token}|${rev}`, "g");
            try {
                let output = eval(code);
                if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
                output = inspect(output, { depth: 0, maxArrayLength: null });
                output = output.replace(filter, "[TOKEN]");
                output = clean(output);
                if (output.length < 1950) {
                    message.channel.send(`\`\`\`js\n${output}\n\`\`\``);
                } else {
                    message.channel.send(`${output}`, { split: "\n", code: "js" });
                }
            } catch (error) {
                message.channel.send(`The following error occured \`\`\`js\n${error}\`\`\``);
            }
	},
};
