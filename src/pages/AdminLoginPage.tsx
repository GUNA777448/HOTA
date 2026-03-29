import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebase";
import { ROUTES } from "@/routes";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Input } from "@/components/base/input";
import { Button } from "@/components/base/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/base/form";

const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [signinError, setSigninError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [isSigniningIn, setIsSigniningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(ROUTES.ADMIN_BLOGS, { replace: true });
      }
    });

    return () => unsub();
  }, [navigate]);

  async function upsertAdminProfile(user: User, fullName?: string) {
    const adminRef = doc(db, "admins", user.uid);
    const existing = await getDoc(adminRef);

    const payload = {
      uid: user.uid,
      email: user.email || "",
      name: fullName?.trim() || user.displayName || "",
      role: "admin",
      authProvider: "password",
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    };

    if (!existing.exists()) {
      await setDoc(adminRef, {
        ...payload,
        createdAt: serverTimestamp(),
      });
      return;
    }

    await setDoc(adminRef, payload, { merge: true });
  }

  const signinForm = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmitSignin(values: z.infer<typeof signinSchema>) {
    setSigninError("");
    setIsSigniningIn(true);
    try {
      const normalizedEmail = values.email.trim().toLowerCase();
      const credential = await signInWithEmailAndPassword(
        auth,
        normalizedEmail,
        values.password,
      );
      await upsertAdminProfile(credential.user);
      navigate(ROUTES.ADMIN_BLOGS, { replace: true });
    } catch {
      setSigninError("Invalid admin credentials. Please try again.");
    } finally {
      setIsSigniningIn(false);
    }
  }

  async function onSubmitSignup(values: z.infer<typeof signupSchema>) {
    setSignupError("");
    setIsSigningUp(true);

    try {
      const normalizedEmail = values.email.trim().toLowerCase();
      const credential = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        values.password,
      );
      await upsertAdminProfile(credential.user, values.name);
      navigate(ROUTES.ADMIN_BLOGS, { replace: true });
    } catch {
      setSignupError(
        "Failed to create admin account. Check Firebase auth configuration.",
      );
    } finally {
      setIsSigningUp(false);
    }
  }

  return (
    <section className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-24">
      <Tabs defaultValue="signin" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Sign in to manage blog posts directly in Firebase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...signinForm}>
                <form
                  onSubmit={signinForm.handleSubmit(onSubmitSignin)}
                  className="space-y-4"
                >
                  <FormField
                    control={signinForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="admin@hota.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signinForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {signinError && (
                    <p className="text-sm text-destructive">{signinError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSigniningIn}
                    className="w-full"
                  >
                    {isSigniningIn ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create an email-password admin user and save profile in admins
                collection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...signupForm}>
                <form
                  onSubmit={signupForm.handleSubmit(onSubmitSignup)}
                  className="space-y-4"
                >
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="admin@hota.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {signupError && (
                    <p className="text-sm text-destructive">{signupError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full"
                  >
                    {isSigningUp
                      ? "Creating account..."
                      : "Create admin account"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="absolute bottom-4">
        <Link
          to={ROUTES.BLOG}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Back to blog
        </Link>
      </div>
    </section>
  );
}
