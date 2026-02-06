"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sun, Moon, Monitor, Loader2, Trash2 } from "lucide-react";
import { toast,Toaster } from "react-hot-toast";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  getUserProfile,
  updateUserProfile,
  triggerPasswordReset,
  deleteUserAccount,
} from "@/lib/user.service";
//import { toast, Toaster } from "react-hot-toast";

type ThemeValue = "light" | "dark" | "system";

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false,
  });

  useEffect(() => {
    setMounted(true);

    // Load User Profile
    const loadProfile = async () => {
      const user = auth.currentUser;

      if (user) {
        setLoadingProfile(true);
        try {
          // Initialize with Auth defaults
          setName(user.displayName || "");
          setEmail(user.email || "");

          // Try fetching Firestore profile for latest name if exists
          const profile = await getUserProfile(user.uid);
          if (profile) {
            setName(profile.name);
            // Email usually comes from auth, but if we stored it in DB, we can use that too
          }
        } catch (error) {
          console.error("Failed to load profile", error);
        } finally {
          setLoadingProfile(false);
        }
      } else {
        // Not authenticated?
        setLoadingProfile(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadProfile();
      }
    });

    return () => unsubscribe();
  }, []);

  const currentTheme = (theme ?? "system") as ThemeValue;
  const displayTheme = resolvedTheme ?? currentTheme;

  const options: { value: ThemeValue; label: string; icon: React.ReactNode }[] =
    [
      { value: "light", label: "Light", icon: <Sun className="size-4" /> },
      { value: "dark", label: "Dark", icon: <Moon className="size-4" /> },
      {
        value: "system",
        label: "System",
        icon: <Monitor className="size-4" />,
      },
    ];

  const handleSaveProfile = async () => {
    if (!auth.currentUser) return;
    setIsSaving(true);
    try {
      await updateUserProfile(auth.currentUser.uid, { name });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return;
    try {
      await triggerPasswordReset(email);
      toast.success(`Password reset email sent to ${email}.Check spam folder if not received.`);
    } catch (error) {
      toast.error("Failed to send reset email.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      toast.success("Account deleted successfully.");
      router.push("/sign-in");
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        toast.error(
          "Security: Please sign out and sign in again to delete your account.",
        );
      } else {
        toast.error("Failed to delete account.");
      }
    }
  };

  return (
    <>  
    <Toaster /> 
    <div className="bg-[#E5E5E5] dark:bg-slate-900 md:w-[calc(100vw-17rem)] w-full min-h-screen overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 m-2 md:m-5 mt-0 pt-5 pr-2">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Settings
        </h1>
      </div>

      <div className="mx-2 md:mx-5 mt-5 mb-5 space-y-6">
        {/* Appearance Section */}
        <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!mounted ? (
              <div className="flex items-center gap-2 text-slate-500">
                <Loader2 className="size-4 animate-spin" />
                <span className="text-sm">Loading theme…</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {options.map(({ value, label, icon }) => (
                  <Button
                    key={value}
                    type="button"
                    variant={currentTheme === value ? "default" : "outline"}
                    className={
                      currentTheme === value
                        ? "bg-purple hover:bg-purple/90 text-white"
                        : ""
                    }
                    onClick={() => setTheme(value)}
                  >
                    {icon}
                    {label}
                  </Button>
                ))}
              </div>
            )}
            {mounted && (
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Current: {displayTheme}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Profile Section */}
        <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Manage your public profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingProfile ? (
              <div className="flex items-center gap-2 text-slate-500">
                <Loader2 className="size-4 animate-spin" />
                <span className="text-sm">Loading profile…</span>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    readOnly
                    className="bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500">
                    Email cannot be changed via settings. Contact support.
                  </p>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving || loadingProfile}
              className="bg-purple hover:bg-purple/90 text-white cursor-pointer"
            >
              {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* Security Section */}
        <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your password and security settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg border-slate-200 dark:border-slate-700">
              <div className="space-y-0.5">
                <Label className="text-base">Password</Label>
                <p className="text-sm text-slate-500">
                  Reset your password to keep your account secure.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleResetPassword}
                disabled={!email || loadingProfile}
                className="cursor-pointer"
              >
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-slate-500">
                  Receive emails about your account activity.
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between p-2">
              <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-slate-500">
                  Receive push notifications on your device.
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between p-2">
              <div className="space-y-0.5">
                <Label className="text-base">Marketing Emails</Label>
                <p className="text-sm text-slate-500">
                  Receive emails about new features and offers.
                </p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, marketing: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-100 dark:border-red-900/20 bg-red-50/50 dark:bg-red-900/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">
              Danger Zone
            </CardTitle>
            <CardDescription className="text-red-600/80 dark:text-red-400/80">
              Irreversible actions for your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto cursor-pointer"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
