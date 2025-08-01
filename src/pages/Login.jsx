import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/validations/user";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { toast } from "sonner";

export default function Login() {
  const { language } = useLanguage();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      await login(data);
    } catch (error) {
      toast.error(t("invalidCredentials", language));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {t("welcomeBack", language)}
          </CardTitle>
          <CardDescription>{t("loginToAccount", language)}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t("username", language)}</Label>
              <Input
                id="username"
                type="text"
                {...form.register("username")}
                placeholder={t("enterUsername", language)}
              />
              {form.formState.errors.username && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password", language)}</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                placeholder={t("enterPassword", language)}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("loading", language) : t("signIn", language)}
            </Button>
          </form>

          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>Demo credentials:</p>
            <p>Admin: admin / admin123</p>
            <p>Staff: staff / staff123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
