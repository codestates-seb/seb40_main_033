export interface BasicFormProps {
	content: string;
	handleContent: React.ChangeEventHandler<HTMLTextAreaElement>;
	handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
}
