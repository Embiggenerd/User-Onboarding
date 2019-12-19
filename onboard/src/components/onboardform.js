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
                <label >
                    Email
                    <Field
                        id="email"
                        type="text"
                        name="email"
                        placeholder="email"
                    />
                    {touched.email && errors.email && (
                        <p className="errors">
                            {errors.email}
                        </p>
                    )}
                </label>
                <label >
                    Password
                    <Field
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    {touched.password && errors.password && (
                        <p className="errors">
                            {errors.password}
                        </p>
                    )}
                </label>
                {/* For Fields that use input elements other thank <input /> use as to declare what HTML input to use for Field*/}
                <label className="checkbox-container">
                    Have you read the terms of service?
                    <Field
                        type="checkbox"
                        name="tos"
                        checked={values.tos}
                    />
                    <span className="checkmark" />
                </label>
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
        name: Yup.string().required(
            "NAME IS MANDATORY"
        ),
        email: Yup.string().required(
            "EMAIL IS MANDATORY"
        ),
        password: Yup.string().required(
            "PASSWORD IS MANDATORY"
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
