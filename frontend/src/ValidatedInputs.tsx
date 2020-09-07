import React, { useContext, useState } from "react";
import { AppContext } from "./AppProvider";
import { Input, ValidationWarning, Label } from "./styledComponents";
import { validator } from "./utils/validator";
import styled from "styled-components/macro";

type Props = {
	autocompleteItems?: Array<{ id: string; element: { text: string } }> | undefined;
	form_to_set: string;
	validates?: string;
	name: string;
	typeCallback?: Function;
	selectCallback?: Function;
	defaultValue?: string;
	disabled?: boolean;
};
const ClientList: any = styled.ul`
  background-color: ${props => props.theme.colors.bg};
  margin: 0;
  display: none;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
  li{}
  input:active
    + ${Label},
    input:focus
    + ${Label},
    input:checked
    + ${Label},
    ${Label}:hover,
    ${Label}:active,
    ${Label}:focus {
    background-color: ${props => props.theme.colors.bg2};
  };
  input[type="radio"] {
    position: absolute;
    left: -99999px;
  }
  ${Label} {
    display: block;
    left: auto;
    padding: 0.5em;
    top: auto;
    border-top: 1px solid ${props => props.theme.colors.bg1};
    transition: background-color 0.4s ease;
    position: relative;
  }
`;
export const ValidatedInputs = React.forwardRef(
	(
		{
			autocompleteItems = undefined,
			form_to_set,
			typeCallback,
			selectCallback,
			validates,
			defaultValue,
			name = "",
			disabled = false,
			...props
		}: React.InputHTMLAttributes<{}> & Props,
		ref: React.Ref<{}>
	) => {

		const [filteredItems, setfilteredItems] = useState(autocompleteItems);
		const [valid, validate] = useState<any>(undefined);
		const { state, dispatch } = useContext(AppContext);
		const setClient = (e, item) => {
			dispatch({
				type: "SET_FORM",
				data: { form_to_set: form_to_set, field: name, value: item.id },
			});
			setfilteredItems(autocompleteItems)
			if (selectCallback) {
				selectCallback(e, item.element)
			}
			// ref.current!.focus();
		};

		const validateForm = (e: { target: { name: any; value: string } }) => {
			const res = validator(validates, e.target.value);
			validate(res);
			autocompleteItems && setfilteredItems(
				autocompleteItems
					.filter((i: any) => !!i.element.text)
					.filter(
						i =>
							i.element.text.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
					)
			);
			if (typeCallback && e.target.value.length > 1) {
				typeCallback(e.target.value)
			}
			dispatch({
				type: "SET_FORM",
				data: {
					form_to_set: form_to_set,
					field: e.target.name,
					value: e.target.value,
				},
			});
		};
		return (
			<>
				<Input
					valid={valid}
					ref={ref}
					active={state[form_to_set][name] || defaultValue}
					disabled={disabled}
					// value={state[form_to_set][name]}
					name={name}
					value={defaultValue || state[form_to_set][name]}
					// onFocus={(e)=> e.target.value = ""}
					onChange={validateForm}
				// {...props}
				/>
				<ClientList className={`autocomplete`}>
					{!!filteredItems &&
						filteredItems.map((item: any, index) => (
							<li
								onClick={(e) => setClient(e, item.id)}
								key={index}
							>
								<input
									name={name}
									type="radio"
									key={item.id}
									checked={state[form_to_set][name] === item.id}
									value={item.id}
									onChange={e => setClient(e, item)}
								/>
								<Label htmlFor={item.id}>{item.element.text}</Label>
							</li>
						))}
				</ClientList>
				{!!valid && (
					<ValidationWarning active={valid.length > 0}>
						{valid.length > 0 &&
							valid.map((message: React.ReactNode, index: React.ReactText) => (
								<li className={`warning`} key={index}>
									{message}
								</li>
							))}
					</ValidationWarning>
				)}
			</>
		);
	}
);