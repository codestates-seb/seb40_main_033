export interface BasicFormProps {
	content: string;
	handleContent: React.ChangeEventHandler<HTMLTextAreaElement>;
	handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

export interface DefaultFormProps extends BasicFormProps {
	placeholder: string;
	maxLength: number;
	height: number;
	target: string;
}

export interface TalkFormProps extends BasicFormProps {
	placeholder: string;
}
