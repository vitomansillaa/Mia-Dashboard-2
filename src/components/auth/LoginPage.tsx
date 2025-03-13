import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "../ui/separator";

interface LoginPageProps {
  onLogin?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onLogin = () => console.log("Login clicked"),
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Mia Analytics
            </CardTitle>
            <CardDescription className="text-center">
              Sign in using your Google account to access the analytics
              dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Button
              variant="outline"
              className="w-full py-6 flex items-center justify-center space-x-2"
              onClick={onLogin}
            >
              <FcGoogle className="h-5 w-5" />
              <span>Sign in with Google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-xs text-center text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </p>
            <p className="text-xs text-center text-gray-500">
              For authorized personnel only. Unauthorized access is prohibited.
            </p>
          </CardFooter>
        </Card>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact the system administrator</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
