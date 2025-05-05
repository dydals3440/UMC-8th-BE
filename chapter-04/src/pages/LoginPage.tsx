import { useState } from "react";

const LoginPage = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleLogin = async () => {
        await login(email, password);
    }

  return (
    <div>
      <input value  = {email} onChange = {(e) => setEmail(e.target.value)}/>
        <input value  = {password} onChange = {(e) => setPassword(e.target.value)}/>
        <button onClick = {handleLogin}>로그인  </button>
    </div>
  );
};

export default LoginPage
