"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { UserPlus, Loader2, Trash2 } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

type AppUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Timestamp | null;
  createdBy?: string;
};

type AddUserFormValues = {
  name: string;
  email: string;
  role: string;
};

const USERS_COLLECTION = "appUsers";

const defaultValues: AddUserFormValues = {
  name: "",
  email: "",
  role: "user",
};

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setUsers([]);
        return;
      }

      const q = query(
        collection(db, USERS_COLLECTION),
        where("createdBy", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      const list: AppUser[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name ?? "",
        email: doc.data().email ?? "",
        role: doc.data().role ?? "user",
        createdAt: doc.data().createdAt ?? null,
        createdBy: doc.data().createdBy,
      }));
      setUsers(list);
      toast.success("Users fetched successfully");
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onAddUser = async (data: AddUserFormValues) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("You must be signed in to add users.");
        return;
      }

      await addDoc(collection(db, USERS_COLLECTION), {
        name: data.name.trim(),
        email: data.email.trim(),
        role: data.role,
        createdAt: serverTimestamp(),
        createdBy: currentUser.uid,
      });
      reset(defaultValues);
      setSheetOpen(false);
      await fetchUsers();
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, USERS_COLLECTION, id));
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted");
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const formatDate = (
    ts: Timestamp | { seconds: number; nanoseconds: number } | null,
  ) => {
    if (!ts) return "—";
    const d =
      typeof (ts as Timestamp).toDate === "function"
        ? (ts as Timestamp).toDate()
        : new Date(
            (ts as { seconds: number; nanoseconds: number }).seconds * 1000,
          );
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <>
      <Toaster />
      <div className="w-full overflow-x-hidden">
        <div className="flex flex-row justify-between items-start sm:items-center gap-4 m-2 md:m-5 mt-0 pt-5 pr-2">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Users
          </h1>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button className="bg-purple hover:bg-purple/90 text-white cursor-pointer">
                <UserPlus className="size-4" />
                Add User
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="px-4">
              <SheetHeader className="px-0">
                <SheetTitle>Add User</SheetTitle>
                <SheetDescription>
                  Add a new user to the dashboard. They will appear in the list
                  below.
                </SheetDescription>
              </SheetHeader>
              <form
                onSubmit={handleSubmit(onAddUser)}
                className="flex flex-col gap-4 py-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Full name"
                    disabled={isSubmitting}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    disabled={isSubmitting}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    disabled={isSubmitting}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
                    {...register("role", { required: "Role is required" })}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-sm">
                      {errors.role.message}
                    </p>
                  )}
                </div>
                <SheetFooter>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-purple hover:bg-purple/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Adding…
                      </>
                    ) : (
                      "Add User"
                    )}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mx-2 md:mx-5 mt-5 mb-5">
          <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            {loading ? (
              <div className="p-8 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <Loader2 className="size-8 animate-spin" />
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                No users yet. Click &quot;Add User&quot; to add one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-700">
                      <th className="text-left py-3 px-5 text-sm font-medium text-slate-600 dark:text-slate-400">
                        Name
                      </th>
                      <th className="text-left py-3 px-5 text-sm font-medium text-slate-600 dark:text-slate-400">
                        Email
                      </th>
                      <th className="text-left py-3 px-5 text-sm font-medium text-slate-600 dark:text-slate-400">
                        Role
                      </th>
                      <th className="text-left py-3 px-5 text-sm font-medium text-slate-600 dark:text-slate-400">
                        Added
                      </th>
                      <th className="text-right py-3 px-5 text-sm font-medium text-slate-600 dark:text-slate-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-slate-50 dark:border-slate-700 last:border-b-0"
                      >
                        <td className="py-3.5 px-5 text-sm font-medium text-slate-800 dark:text-slate-200">
                          {user.name}
                        </td>
                        <td className="py-3.5 px-5 text-sm text-slate-800 dark:text-slate-200">
                          {user.email}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="inline-flex items-center justify-center min-w-16 px-2.5 py-1 rounded-full text-xs font-medium capitalize bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-sm text-slate-600 dark:text-slate-400">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="cursor-pointer"
                              >
                                <Trash2 className="size-4" />
                                <span className="sr-only">Delete user</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete user</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete{" "}
                                  <span className="font-semibold">
                                    {user.name || user.email}
                                  </span>
                                  ? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="gap-2 sm:gap-3">
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    <Trash2 className="size-4" />
                                    Delete
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
