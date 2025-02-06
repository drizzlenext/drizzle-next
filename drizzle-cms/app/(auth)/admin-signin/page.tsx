import { AdminSignInForm } from "@/components/auth/admin-signin-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Admin Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminSignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
