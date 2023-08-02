import { useCallback, useState, useMemo } from 'react';
import { TableNewRowHeader, TableNewRowInputValue } from '../../../../../model/table.model';

export const INITIAL_INPUT_VALUES = {
	id: '',
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	address: { streetAddress: '', city: '', state: '', zip: '' },
	description: '',
};

const INITIAL_VALIDATION_ERRORS = {
	id: false,
	firstName: false,
	lastName: false,
	email: false,
	phone: false,
};

interface ValidationErrors {
	readonly id: boolean;
	readonly firstName: boolean;
	readonly lastName: boolean;
	readonly email: boolean;
	readonly phone: boolean;
}

export const useValidateAddRow = () => {
	const [inputValues, setInputValues] = useState<TableNewRowInputValue>(INITIAL_INPUT_VALUES);
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>(INITIAL_VALIDATION_ERRORS);

	const validateInputs = useCallback(
		(name: keyof TableNewRowInputValue, value: any) => {
			switch (name) {
				case 'id': {
					const condition = !isNaN(parseInt(value, 10));
					setValidationErrors({ ...validationErrors, id: condition });
					break;
				}
				case 'firstName': {
					const condition = typeof value === 'string' && value.length > 2;
					setValidationErrors({ ...validationErrors, firstName: condition });
					break;
				}
				case 'lastName': {
					const condition = typeof value === 'string' && value.length > 2;
					setValidationErrors({ ...validationErrors, lastName: condition });
					break;
				}
				case 'email': {
					const condition = new RegExp(
						/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					).test(value);
					setValidationErrors({ ...validationErrors, email: condition });
					break;
				}
				case 'phone': {
					const condition = new RegExp(/^\([\d_]{3}\)[\d_]{3}-[\d_]{4}$/).test(value);
					setValidationErrors({ ...validationErrors, phone: condition });
					break;
				}
				default:
					break;
			}
		},
		[validationErrors],
	);

	const onInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, inputName: TableNewRowHeader) => {
			setInputValues({ ...inputValues, [inputName]: e.target.value });
			validateInputs(inputName, e.target.value);
		},
		[inputValues, validateInputs],
	);

	const clearInputs = useCallback(() => {
		setInputValues(INITIAL_INPUT_VALUES);
		setValidationErrors(INITIAL_VALIDATION_ERRORS);
	}, []);

	const noValidationErrors = useMemo(() => Object.values(validationErrors).every(x => x), [validationErrors]);

	return {
		inputValues,
		clearInputs,
		noValidationErrors,
		onInput,
	};
};
