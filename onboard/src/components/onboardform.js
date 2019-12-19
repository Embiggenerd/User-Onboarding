import React, {
    useState,
    useEffect
} from "react";
import {
    withFormik,
    Form,
    Field
} from "formik";
import * as Yup from "yup";
import axios from "axios";

let OnboardForm = ({
    values,
    errors,
    touched,
    status
}) => {
    console.log("values", values);
    console.log("errors", errors);
    console.log("touched", touched);

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        console.log(
            "status has changed!",
            status
        );
        status &&
            setUserData([
                ...userData,
                status
            ]);
    }, [status]);
    return (
        <div className="omboard-form">
            <Form>
                <label >
                    Name
                    <Field
                        id="name"
                        type="text"
                        name="name"
                        placeholder="name"
                    />
                    {touched.name &&
                        errors.name && (
                            <p className="errors">
                                {errors.name}
                            </p>
                        )}
                </label>
                <label htmlFor="size">
                    Size
            <Field
                        id="size"
                        type="text"
                        name="size"
                        placeholder="size"
                    />
                    {touched.size && errors.size && (
                        <p className="errors">
                            {errors.size}
                        </p>
                    )}
                </label>
                {/* For Fields that use input elements other thank <input /> use as to declare what HTML input to use for Field*/}
                <Field
                    as="select"
                    className="food-select"
                    name="diet"
                >
                    <option disabled>
                        Choose an Option
            </option>
                    <option value="herbivore">
                        Herbivore
            </option>
                    <option value="carnivore">
                        Carnivore
            </option>
                    <option value="omnivore">
                        Omnivore
            </option>
                </Field>
                <label className="checkbox-container">
                    Vaccinations
            <Field
                        type="checkbox"
                        name="vaccinations"
                        checked={values.vaccinations}
                    />
                    <span className="checkmark" />
                </label>
                <Field
                    as="textarea"
                    type="text"
                    name="notes"
                    placeholder="Notes"
                />
                <button type="submit">
                    Submit!
          </button>
            </Form>
            {userData.map(user => {
                return (
                    <ul key={user.id}>
                        <li>
                            Name: {user.name}
                        </li>
                        <li>Email: {user.email}</li>
                    </ul>
                );
            })}
        </div>
    );
};

OnboardForm = withFormik({
    mapPropsToValues(props) {
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            tos:
                props.tos || false,
        };
    },

    // Declare shape and requirement of values object (form state )
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        // passing a string in required makes a custom inline error msg
        size: Yup.string().required(
            "SIZE IS MANDATORY"
        )
    }),

    handleSubmit(
        values,
        { setStatus, resetForm }
    ) {
        console.log("submitting", values);
        axios
            .post(
                "https://reqres.in/api/users/",
                values
            )
            .then(res => {
                console.log("success", res);
                setStatus(res.data);

                resetForm();
            })
            .catch(err =>
                console.log(err.response)
            );
    }
})(OnboardForm);
export default OnboardForm;
