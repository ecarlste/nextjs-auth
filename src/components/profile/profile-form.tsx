import { FormEvent, useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props: {
  onChangePassword: (oldPassword: string, newPassword: string) => void;
}) {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current?.value as string;
    const enteredNewPassword = newPasswordRef.current?.value as string;

    props.onChangePassword(enteredOldPassword, enteredNewPassword);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
