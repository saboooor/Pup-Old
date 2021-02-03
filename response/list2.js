module.exports = {
	name: 'list2',
	description: '',
	execute(message) {
		setTimeout(function() {
			message.delete();
		}, 5500);
	},
};