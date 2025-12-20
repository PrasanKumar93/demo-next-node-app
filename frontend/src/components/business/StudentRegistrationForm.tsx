'use client';

import { useState, FormEvent } from 'react';
import {
    TextInput,
    EmailInput,
    TelInput,
    NumberInput,
    Select,
    DatePicker,
    Button,
    Toast,
} from '@/components/ui';
import type { ToastType } from '@/components/ui';
import { CreateStudentSchema } from '@/lib/validators';
import { createStudent } from '@/lib/api';
import type { CreateStudentInput } from '@/types';
import styles from './StudentRegistrationForm.module.scss';

// Department options
const departmentOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
    { value: 'civil-engineering', label: 'Civil Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'arts', label: 'Arts & Humanities' },
];

// Country options
const countryOptions = [
    { value: 'India', label: 'India' },
    { value: 'USA', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'China', label: 'China' },
    { value: 'Japan', label: 'Japan' },
    { value: 'Other', label: 'Other' },
];

// Form field errors type
type FormErrors = {
    [key: string]: string | undefined;
    firstName?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: string;
    studentId?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    enrollmentDate?: string;
    course?: string;
    department?: string;
    year?: string;
    guardianName?: string;
    guardianPhone?: string;
};

// Initial form state
const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null as string | null,
    studentId: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    enrollmentDate: null as string | null,
    course: '',
    department: '',
    year: '' as number | '',
    guardianName: '',
    guardianPhone: '',
};

type FormState = typeof initialFormState;

/**
 * StudentRegistrationForm Component
 * 
 * A comprehensive form for registering new students.
 * Features client-side validation with Zod and integration with the backend API.
 */
const StudentRegistrationForm = () => {
    const [formData, setFormData] = useState<FormState>(initialFormState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastType, setToastType] = useState<ToastType>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [resetKey, setResetKey] = useState(0);

    // Show toast notification
    const showToast = (type: ToastType, message: string) => {
        setToastType(type);
        setToastMessage(message);
        setToastVisible(true);
    };

    // Hide toast notification
    const hideToast = () => {
        setToastVisible(false);
    };

    // Generic field change handler
    const handleChange = (name: string, value: string | number | null) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    // Handler for Select components (supports array values for multi-select)
    const handleSelectChange = (name: string, value: string | number | (string | number)[]) => {
        // For our form, we only use single-select, so extract string value
        const singleValue = Array.isArray(value) ? value[0] : value;
        handleChange(name, singleValue as string);
    };

    // Validate form data using Zod schema
    const validateForm = (): boolean => {
        // Build the data object for validation
        const dataToValidate: CreateStudentInput = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date(),
            studentId: formData.studentId,
            phone: formData.phone,
            address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country,
            },
            enrollmentDate: formData.enrollmentDate ? new Date(formData.enrollmentDate) : new Date(),
            course: formData.course,
            department: formData.department,
            year: typeof formData.year === 'number' ? formData.year : 1,
            guardianName: formData.guardianName || undefined,
            guardianPhone: formData.guardianPhone || undefined,
        };

        const result = CreateStudentSchema.safeParse(dataToValidate);

        if (!result.success) {
            const newErrors: FormErrors = {};

            result.error.issues.forEach((issue) => {
                const path = issue.path.join('.');
                // Map nested address fields to flat field names
                if (path.startsWith('address.')) {
                    const addressField = path.replace('address.', '');
                    newErrors[addressField] = issue.message;
                } else {
                    newErrors[path] = issue.message;
                }
            });

            setErrors(newErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Hide any existing toast
        hideToast();

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Build the student data object
            const studentData: CreateStudentInput = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                dateOfBirth: new Date(formData.dateOfBirth!),
                studentId: formData.studentId,
                phone: formData.phone,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                },
                enrollmentDate: new Date(formData.enrollmentDate!),
                course: formData.course,
                department: formData.department,
                year: formData.year as number,
                guardianName: formData.guardianName || undefined,
                guardianPhone: formData.guardianPhone || undefined,
            };

            // Call API
            const createdStudent = await createStudent(studentData);

            // Show success toast
            showToast('success', `Student "${createdStudent.firstName} ${createdStudent.lastName}" has been registered successfully!`);

            // Reset form on success
            setFormData(initialFormState);
            setErrors({});
            setResetKey((prev) => prev + 1);
        } catch (error) {
            // Show error toast
            if (error instanceof Error) {
                showToast('error', error.message);
            } else {
                showToast('error', 'An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle form reset
    const handleReset = () => {
        setFormData(initialFormState);
        setErrors({});
        hideToast();
        setResetKey((prev) => prev + 1);
    };

    return (
        <>
            {/* Toast Notification */}
            <Toast
                message={toastMessage}
                type={toastType}
                isVisible={toastVisible}
                onDismiss={hideToast}
                position="top-right"
                duration={6000}
            />

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.header}>
                    <h1 className={styles.title}>Student Registration</h1>
                    <p className={styles.subtitle}>Please fill out all required fields to register a new student.</p>
                </div>

                {/* Personal Information Section */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>Personal Information</legend>
                    <div className={styles.row}>
                        <TextInput
                            name="firstName"
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                            required
                            placeholder="Enter first name"
                        />
                        <TextInput
                            name="lastName"
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                            required
                            placeholder="Enter last name"
                        />
                    </div>
                    <div className={styles.row}>
                        <EmailInput
                            name="email"
                            label="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                            placeholder="student@university.edu"
                        />
                        <DatePicker
                            key={`dateOfBirth-${resetKey}`}
                            name="dateOfBirth"
                            label="Date of Birth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            error={errors.dateOfBirth}
                            required
                            maxDate={new Date().toISOString()}
                        />
                    </div>
                    <div className={styles.row}>
                        <TextInput
                            name="studentId"
                            label="Student ID"
                            value={formData.studentId}
                            onChange={handleChange}
                            error={errors.studentId}
                            required
                            placeholder="e.g., STU-2024-001"
                        />
                        <TelInput
                            name="phone"
                            label="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            required
                            placeholder="Enter phone number"
                            countryCode="+91"
                            maxLength={10}
                        />
                    </div>
                </fieldset>

                {/* Address Section */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>Address</legend>
                    <div className={styles.row}>
                        <TextInput
                            name="street"
                            label="Street Address"
                            value={formData.street}
                            onChange={handleChange}
                            error={errors.street}
                            required
                            placeholder="123 Main Street"
                        />
                    </div>
                    <div className={styles.row}>
                        <TextInput
                            name="city"
                            label="City"
                            value={formData.city}
                            onChange={handleChange}
                            error={errors.city}
                            required
                            placeholder="Enter city"
                        />
                        <TextInput
                            name="state"
                            label="State / Province"
                            value={formData.state}
                            onChange={handleChange}
                            error={errors.state}
                            required
                            placeholder="Enter state"
                        />
                    </div>
                    <div className={styles.row}>
                        <TextInput
                            name="zipCode"
                            label="ZIP / Postal Code"
                            value={formData.zipCode}
                            onChange={handleChange}
                            error={errors.zipCode}
                            required
                            placeholder="12345"
                        />
                        <Select
                            name="country"
                            label="Country"
                            value={formData.country}
                            onChange={handleSelectChange}
                            error={errors.country}
                            options={countryOptions}
                            required
                        />
                    </div>
                </fieldset>

                {/* Academic Information Section */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>Academic Information</legend>
                    <div className={styles.row}>
                        <DatePicker
                            name="enrollmentDate"
                            label="Enrollment Date"
                            value={formData.enrollmentDate}
                            onChange={handleChange}
                            error={errors.enrollmentDate}
                            required
                        />
                        <TextInput
                            name="course"
                            label="Course / Program"
                            value={formData.course}
                            onChange={handleChange}
                            error={errors.course}
                            required
                            placeholder="e.g., Bachelor of Science"
                        />
                    </div>
                    <div className={styles.row}>
                        <Select
                            name="department"
                            label="Department"
                            value={formData.department}
                            onChange={handleSelectChange}
                            error={errors.department}
                            options={departmentOptions}
                            required
                            placeholder="Select department"
                        />
                        <NumberInput
                            name="year"
                            label="Year"
                            value={formData.year}
                            onChange={handleChange}
                            error={errors.year}
                            required
                            min={1}
                            max={6}
                            placeholder="1-6"
                        />
                    </div>
                </fieldset>

                {/* Guardian Information Section (Optional) */}
                <fieldset className={styles.section}>
                    <legend className={styles.sectionTitle}>
                        Guardian Information
                        <span className={styles.optional}>(Optional)</span>
                    </legend>
                    <div className={styles.row}>
                        <TextInput
                            name="guardianName"
                            label="Guardian Name"
                            value={formData.guardianName}
                            onChange={handleChange}
                            error={errors.guardianName}
                            placeholder="Enter guardian's full name"
                        />
                        <TelInput
                            name="guardianPhone"
                            label="Guardian Phone"
                            value={formData.guardianPhone}
                            onChange={handleChange}
                            error={errors.guardianPhone}
                            placeholder="Enter guardian's phone"
                            countryCode="+91"
                            maxLength={10}
                        />
                    </div>
                </fieldset>

                {/* Form Actions */}
                <div className={styles.actions}>
                    <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={handleReset}
                        disabled={isSubmitting}
                    >
                        Reset Form
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={isSubmitting}
                    >
                        Register Student
                    </Button>
                </div>
            </form>
        </>
    );
};

export default StudentRegistrationForm;

