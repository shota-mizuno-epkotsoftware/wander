import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import styles from '@/Styles/auth.module.css';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" className={styles.inputLabel} />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={styles.input}
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className={styles.inputError} />
                </div>

                <div className={styles.fieldGroup}>
                    <InputLabel htmlFor="email" value="Email" className={styles.inputLabel} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={styles.input}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className={styles.inputError} />
                </div>

                <div className={styles.fieldGroup}>
                    <InputLabel htmlFor="password" value="Password" className={styles.inputLabel} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={styles.input}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className={styles.inputError} />
                </div>

                <div className={styles.fieldGroup}>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className={styles.inputLabel} />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={styles.input}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className={styles.inputError} />
                </div>

                <div className={styles.actions}>
                    <Link
                        href={route('login')}
                        className={styles.resetLink}
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className={styles.submitButton} disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
