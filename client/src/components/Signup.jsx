import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Signup() {

const navigate = useNavigate()
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {

    
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ 
          name:name,
          email: email, 
          password: password 
        }),
      });

      const data = await response.json();

      

      if (response.ok) {
        toast.success(data.message);
        console.log(data)
        navigate('/login')
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
        <div className=" mt-14 flex items-center justify-center w-full px-4">
            <div className="flex w-full flex-col max-w-96">
        
                <h2 className="text-4xl font-medium text-gray-900">Sign up</h2>
        
                <p className="mt-4 text-base text-gray-500/90">
                    Please Signup
                </p>

                <div className="mt-10">
                    <label className="font-medium">Name</label>
                    <input
                        placeholder="Please enter your email"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        onChange={(e)=>{setname(e.target.value)}}
                        type="email"
                        name="email"
                        value={name}
                    />
                </div>
        
                <div className="mt-10">
                    <label className="font-medium">Email</label>
                    <input
                        placeholder="Please enter your email"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        onChange={(e)=>{setEmail(e.target.value)}}
                        type="email"
                        name="email"
                        value={email}
                    />
                </div>
        
                <div className="mt-6">
                    <label className="font-medium">Password</label>
                    <input
                        placeholder="Please enter your password"
                        className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                        required
                        onChange={(e)=>{setPassword(e.target.value)}}
                        type="password"
                        name="password"
                        value={password}
                    />
                </div>
        
                <button
                    type="submit"
                    onClick={handleRegister}
                    className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
                >
                    Login
                </button>
                <p className='text-center py-8'>
                    Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;