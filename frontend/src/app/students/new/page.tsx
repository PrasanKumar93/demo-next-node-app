import { StudentRegistrationForm } from '@/components/business/StudentRegistrationForm';
import styles from './page.module.scss';

export const metadata = {
    title: 'Register New Student',
    description: 'Register a new student in the system',
};

/**
 * New Student Registration Page
 * 
 * Route: /students/new
 * Allows users to register a new student using the StudentRegistrationForm.
 */
const NewStudentPage = () => {
    return (
        <div className={styles.page}>
            <StudentRegistrationForm />
        </div>
    );
};

export default NewStudentPage;

// Assuming there's an input field for firstName, update it as follows
<input
  type="text"
  name="firstName"
  maxLength={6}
  pattern="[A-Za-z]*"
  title="First name must be up to 6 English letters (A–Z)"
  required
  onChange={(e) => {
    const value = e.target.value;
    if (/^[A-Za-z]*$/.test(value) && value.length <= 6) {
      // Update state or form value
    }
  }}
/>

