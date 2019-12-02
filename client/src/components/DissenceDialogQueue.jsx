import { createDialogQueue } from "@rmwc/dialog";

export const queue = createDialogQueue();

export const connectionErrorDialog = () =>
	new Promise(resolve => {
		queue
			.confirm({
				title: "CONNECTION ERROR",
				body: "Couldn't maintain a connection to the server.",
				acceptLabel: "Retry",
				cancelLabel: "Quit"
			})
			.then(res => resolve(res));
	});

export const nicknameDialog = () =>
	new Promise(resolve => {
		queue
			.prompt({
				title: "Enter a nickname",
				acceptLabel: "Submit",
				cancelLabel: "Skip",
				inputProps: {
					outlined: true
				}
			})
			.then(res => resolve(res));
	});
