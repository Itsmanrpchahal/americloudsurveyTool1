import * as Yup from 'yup';

export const NEW_PROJECT_SCHEMA = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    venueTitle: Yup.string().required('Venue is required'),
    survey:Yup.string().required('Survey is required')
});
