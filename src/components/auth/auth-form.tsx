import { FormEvent, useRef, useState } from 'react';
import classes from './auth-form.module.css';
import { User } from '@prisma/client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

async function createUser(user: Partial<User>) {
  const createUserResponse = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });

  const createdUser = await createUserResponse.json();

  if (!createUserResponse.ok) {
    throw new Error('Failed to create User!');
  }

  return createdUser;
}

function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      console.log(result);

      router.replace('/profile');
    } else {
      try {
        const createdUser = await createUser({
          email: enteredEmail,
          password: enteredPassword,
        });

        console.log(createdUser);
      } catch (error: any) {
        console.error(error);
      }
    }
    return;
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
