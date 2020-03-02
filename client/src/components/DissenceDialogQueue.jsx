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

export const ipDialog = () =>
	new Promise(resolve => {
		queue
			.prompt({
				title: "Enter ip address",
				acceptLabel: "Submit",
				cancelLabel: "Quit",
				inputProps: {
					outlined: true
				}
			})
			.then(res => {
				if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(res)) {
					resolve(res);
				} else {
					ipDialog().then(resolve);
				}
			});
	});
