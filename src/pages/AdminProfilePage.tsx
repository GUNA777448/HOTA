import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ROUTES } from "@/routes";
import { auth, db } from "@/services/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { Button } from "@/components/base/button";
import { Textarea } from "@/components/base/textarea";

type AdminProfile = {
  uid: string;
  name: string;
  email: string;
  role: string;
  bio?: string;
  phone?: string;
  website?: string;
  authProvider?: string;
};

const initialForm = {
  name: "",
  bio: "",
  phone: "",
  website: "",
};

function isPermissionDenied(error: unknown): boolean {
  const firebaseError = error as FirebaseError;
  return firebaseError?.code === "permission-denied";
}

export default function AdminProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    console.log("AdminProfilePage: useEffect triggered.");
    const unsub = onAuthStateChanged(auth, async (user) => {
      console.log("AdminProfilePage: onAuthStateChanged callback fired.");
      if (!user) {
        console.log("AdminProfilePage: No user found, navigating to login.");
        navigate(ROUTES.ADMIN_LOGIN, { replace: true });
        return;
      }

      console.log("AdminProfilePage: User found, UID:", user.uid);
      try {
        const adminRef = doc(db, "admins", user.uid);
        console.log(
          "AdminProfilePage: Fetching document from Firestore:",
          adminRef.path,
        );
        const snapshot = await getDoc(adminRef);
        console.log("AdminProfilePage: Firestore snapshot received.");

        if (!snapshot.exists()) {
          console.log(
            "AdminProfilePage: Document does not exist, creating fallback profile.",
          );
          const fallbackProfile: AdminProfile = {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            role: "admin",
            authProvider: "password",
          };

          await setDoc(
            adminRef,
            {
              ...fallbackProfile,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              lastLoginAt: serverTimestamp(),
            },
            { merge: true },
          );

          console.log(
            "AdminProfilePage: Fallback profile created and set in state.",
          );
          setProfile(fallbackProfile);
          setForm({
            name: fallbackProfile.name,
            bio: "",
            phone: "",
            website: "",
          });
          return;
        }

        console.log("AdminProfilePage: Document exists, processing data.");
        const data = snapshot.data() as Partial<AdminProfile>;
        console.log("AdminProfilePage: Raw data from Firestore:", data);
        const loaded: AdminProfile = {
          uid: user.uid,
          name: data.name || user.displayName || "",
          email: data.email || user.email || "",
          role: data.role || "admin",
          bio: data.bio || "",
          phone: data.phone || "",
          website: data.website || "",
          authProvider: data.authProvider || "password",
        };

        console.log("AdminProfilePage: Loaded profile object:", loaded);
        setProfile(loaded);
        setForm({
          name: loaded.name,
          bio: loaded.bio || "",
          phone: loaded.phone || "",
          website: loaded.website || "",
        });
      } catch (err) {
        console.error("AdminProfilePage: Error loading admin profile:", {
          error: err,
          code: (err as FirebaseError)?.code,
          message: (err as FirebaseError)?.message,
          uid: user.uid,
          docPath: `admins/${user.uid}`,
        });
        setError(
          isPermissionDenied(err)
            ? "Permission denied while loading profile. Update Firestore rules for admins/{uid}."
            : "Failed to load admin profile.",
        );
      } finally {
        console.log(
          "AdminProfilePage: Finished loading, setting isLoading to false.",
        );
        setIsLoading(false);
      }
    });

    return () => {
      console.log(
        "AdminProfilePage: useEffect cleanup, unsubscribing from onAuthStateChanged.",
      );
      unsub();
    };
  }, [navigate]);

  async function handleLogout() {
    await signOut(auth);
    navigate(ROUTES.ADMIN_LOGIN, { replace: true });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;

    setError("");
    setMessage("");
    setIsSaving(true);

    try {
      const adminRef = doc(db, "admins", profile.uid);
      await setDoc(
        adminRef,
        {
          uid: profile.uid,
          email: profile.email,
          role: profile.role,
          authProvider: profile.authProvider || "password",
          name: form.name.trim(),
          bio: form.bio.trim(),
          phone: form.phone.trim(),
          website: form.website.trim(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        },
        { merge: true },
      );

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: form.name.trim(),
              bio: form.bio.trim(),
              phone: form.phone.trim(),
              website: form.website.trim(),
            }
          : prev,
      );
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error("AdminProfilePage: Error saving admin profile:", {
        error: err,
        code: (err as FirebaseError)?.code,
        message: (err as FirebaseError)?.message,
        uid: profile.uid,
        docPath: `admins/${profile.uid}`,
      });
      setError(
        isPermissionDenied(err)
          ? "Permission denied while saving profile. Update Firestore rules for admins/{uid}."
          : "Failed to update profile. Check permissions.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to={ROUTES.ADMIN_BLOGS}>Back to Dashboard</Link>
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your personal and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profile?.email || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Tell us a little about yourself"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+1 (555) 555-5555"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={form.website}
                    onChange={(e) =>
                      setForm({ ...form, website: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div>
                {message && <p className="text-sm text-green-500">{message}</p>}
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
