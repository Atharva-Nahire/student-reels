"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Stethoscope, UserCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [validEmployees, setValidEmployees] = useState<string[]>([]); // Store employee keys (valid IDs)
  const router = useRouter();

  // Fetch employee data from /public/employee.json
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const res = await fetch("/employee.json");
        const data = await res.json();

        // Get all valid employee IDs (keys of the object)
        const employeeIds = Object.keys(data);
        setValidEmployees(employeeIds);
      } catch (error) {
        console.error("Error fetching employee data", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if employeeId exists in the list of validEmployees (keys)
    if (employeeId && validEmployees.includes(employeeId)) {
      localStorage.setItem("employeeId", employeeId);
      router.push("/upload");
    } else {
      toast.error("Invalid Employee ID. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-blue-200">
      <Card className="w-[400px] shadow-lg border-t-4 border-red-500">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" />
            {/* <Stethoscope className="h-12 w-12 text-red-500" /> */}
          </div>
          <CardTitle className="text-2xl font-bold text-center text-red-700">Employee Login</CardTitle>
          <CardDescription className="text-center text-gray-600">Enter your credentials to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="employeeId" className="text-sm font-medium text-gray-700 flex items-center">
                <UserCircle className="h-4 w-4 mr-2 text-red-500" />
                Employee ID
              </label>
              <Input id="employeeId" type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required aria-required="true" className="border-red-300 focus:border-red-500 focus:ring-red-500" />
            </div>
            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
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
