import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // const response = await signInAuthUserWithEmailAndPassword(email, password);
            //console.log(response);
            await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (error) {
            switch(error.code) {
                case "auth/invalid-credential":
                    alert("Something went worng, Incorrect user or password!");
                    break;
                
                case "auth/auth/wrong-password":
                    alert("Incorrect password!");
                    break;

                default: 
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup(); 
        } catch (error) {
            // console.log(error);
            return;
        }
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;