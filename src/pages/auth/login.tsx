import { Button, Form, Input, message, type FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/auth/auth.service";
import { setProfileFromLS } from "../../utils/localStorage";

type FieldType = {
   email: string;
   password: string;
};

const LoginPage = () => {
   const navigate = useNavigate();
   const { setIsAuthenticated } = useAppContext();

   const { mutate: loginMutation, isPending } = useMutation({
      mutationFn: async (data: FieldType) => authService.login(data),
      onSuccess: (data) => {
         message.success("Login successful");
         if (data.data.success) {
            setProfileFromLS(data.data.user);
         }
         setIsAuthenticated(true);
         navigate("/");
      },
      onError: (error) => {
         message.error("Login failed");
         console.error("Login error:", error);
      },
   });

   const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
      loginMutation(values);
   };

   return (
      <div className="flex items-center justify-center h-screen">
         <h1 className="text-4xl font-bold">Login Page</h1>
         <Form name="login" style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
            <Form.Item<FieldType> label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
               <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
               <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
               <Button loading={isPending} type="primary" htmlType="submit">
                  Submit
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default LoginPage;
