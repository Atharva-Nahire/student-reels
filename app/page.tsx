"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, UserCircle, Building2 } from "lucide-react";

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [designation, setDesignation] = useState("");
  const [division, setDivision] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId && designation && division) {
      router.push("/upload");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-200">
      <Card className="w-[400px] shadow-lg border-t-4 border-teal-500">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="h-12 w-12 text-teal-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-teal-700">Medical Staff Login</CardTitle>
          <CardDescription className="text-center text-gray-600">Enter your credentials to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="employeeId" className="text-sm font-medium text-gray-700 flex items-center">
                <UserCircle className="h-4 w-4 mr-2 text-teal-500" />
                Employee ID
              </label>
              <Input id="employeeId" type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required aria-required="true" className="border-teal-300 focus:border-teal-500 focus:ring-teal-500" />
            </div>
            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center w-full text-gray-500">By logging in, you agree to our Terms of Service and Privacy Policy.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
