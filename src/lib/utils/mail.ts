import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
	apiKey: import.meta.env.VITE_MAILJET_API_KEY,
	apiSecret: import.meta.env.VITE_MAILJET_API_SECRET
});

export const sendMail = async (
	to: string,
	templateId: string,
	variables: Record<string, string>
) => {
	mailjet
		.post('send', { version: 'v3.1' })
		.request({
			Messages: [
				{
					From: {
						Email: import.meta.env.VITE_MAILJET_SENDER_EMAIL,
						Name: import.meta.env.VITE_MAILJET_SENDER_NAME
					},
					To: [
						{
							Email: to
						}
					],
					TemplateID: templateId,
					TemplateLanguage: true,
					Variables: variables
				}
			]
		})
		.then((result) => {
			console.log(result.body);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const sendMailConfirmAccount = async (
	to: string,
	variables: { name: string; validation_link: string }
) => {
	sendMail(to, '4154680', variables);
	console.log(
		'fake send mail to ' + variables.name + ' with validation link: ' + variables.validation_link
	);
};

export const sendMailPasswordLost = async (
	to: string,
	variables: { name: string; password_reset_link: string }
) => {
	sendMail(to, '4154680', variables);
	console.log(
		'fake send mail to ' +
			variables.name +
			' with password lost link: ' +
			variables.password_reset_link
	);
};
