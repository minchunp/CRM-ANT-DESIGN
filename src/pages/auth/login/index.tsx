import { Button, Form, Input, type FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../services/auth/auth.service";
import { setProfileFromLS } from "../../../utils/localStorage";
import { useEffect, useState } from "react";
import { useGlobalMessage } from "../../../context/MessageContext";

import "./styles/auth.style.css";

type FieldType = {
   email: string;
   password: string;
};

const LoginPage = () => {
   const navigate = useNavigate();
   const { setIsAuthenticated } = useAppContext();
   const [mounted, setMounted] = useState(false);
   const message = useGlobalMessage();

   useEffect(() => {
      setMounted(true);
   }, []);

   const { mutate: loginMutation, isPending } = useMutation({
      mutationFn: async (data: FieldType) => authService.login(data),
      onSuccess: (data) => {
         message.success("Login successful");
         if (data.data.success) {
            setProfileFromLS(data.data.user);
         }
         setIsAuthenticated(true);
         navigate("/dashboard");
      },
      onError: (error) => {
         message.error("Login failed. Please check your credentials.");
         console.error("Login error:", error);
      },
   });

   const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
      loginMutation(values);
   };

   return (
      <div className="min-h-screen flex">
         {/* Left Side - Form */}
         <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
            <div className={`w-full max-w-md transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
               {/* Logo */}
               <div className="mb-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome back</h2>
                  <p className="text-gray-600">Enter your credentials to access your account</p>
               </div>

               {/* Form */}
               <Form name="login" onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
                  <Form.Item<FieldType>
                     label={<span className="text-sm font-medium text-gray-700">Email address</span>}
                     name="email"
                     rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Please enter a valid email" },
                     ]}
                  >
                     <Input
                        size="large"
                        placeholder="name@example.com"
                        className="h-12 rounded-lg border-gray-300 hover:border-gray-400 focus:border-blue-500"
                     />
                  </Form.Item>

                  <Form.Item<FieldType>
                     label={
                        <div className="flex items-center justify-between w-full">
                           <span className="text-sm font-medium text-gray-700">Password</span>
                        </div>
                     }
                     name="password"
                     rules={[{ required: true, message: "Password is required" }]}
                  >
                     <Input.Password
                        size="large"
                        placeholder="Enter your password"
                        className="h-12 rounded-lg border-gray-300 hover:border-gray-400 focus:border-blue-500"
                     />
                  </Form.Item>

                  <Form.Item className="mb-4">
                     <Button
                        loading={isPending}
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-sm hover:shadow transition-all"
                     >
                        Sign in
                     </Button>
                  </Form.Item>

                  {/* Divider */}
                  <div className="relative my-6">
                     <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                     </div>
                     <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                     </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                     <button
                        type="button"
                        className="flex items-center justify-center h-12 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                     >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                           <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                           />
                           <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                           />
                           <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                           />
                           <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                           />
                        </svg>
                        <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
                     </button>
                     <button
                        type="button"
                        className="flex items-center justify-center h-12 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                     >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        <span className="ml-2 text-sm font-medium text-gray-700">GitHub</span>
                     </button>
                  </div>

                  <p className="text-center text-sm text-gray-600">
                     Don't have an account?{" "}
                     <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                        Sign up for free
                     </a>
                  </p>
               </Form>
            </div>
         </div>

         {/* Right Side - Visual */}
         <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 items-center justify-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 max-w-md text-white">
               <h1 className="text-5xl font-bold mb-6 leading-tight">Start your journey with us</h1>
               <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Discover the world's best platform for managing your business and growing your team.
               </p>
               <div className="space-y-4">
                  <div className="flex items-start">
                     <div className="shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                           <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                           />
                        </svg>
                     </div>
                     <p className="ml-3 text-blue-100">Secure authentication and data protection</p>
                  </div>
                  <div className="flex items-start">
                     <div className="shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                           <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                           />
                        </svg>
                     </div>
                     <p className="ml-3 text-blue-100">24/7 customer support whenever you need</p>
                  </div>
                  <div className="flex items-start">
                     <div className="shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                           <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                           />
                        </svg>
                     </div>
                     <p className="ml-3 text-blue-100">Easy integration with your favorite tools</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
