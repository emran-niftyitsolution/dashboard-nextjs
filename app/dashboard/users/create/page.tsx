"use client";

import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CREATE_USER_MUTATION } from "@/lib/graphql/users";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { User } from "../_components/types";
import UserForm from "../_components/user-form";

export default function CreateUserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const handleSubmit = async (
    formData: Partial<User> & { password?: string }
  ) => {
    try {
      setIsLoading(true);

      const response = await createUser({
        variables: {
          input: formData,
        },
      });

      if (response.data?.createUser) {
        toast.success("User created successfully!");
        router.push("/dashboard/users");
      }
    } catch (error: unknown) {
      console.error("Create user error:", error);
      const errorMessage =
        (error as { graphQLErrors?: Array<{ message: string }> })
          ?.graphQLErrors?.[0]?.message || "Failed to create user";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/users");
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create User</h1>
          <p className="text-muted-foreground mt-1">
            Add a new user to your application
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" text="Creating user..." />
          </div>
        ) : (
          <UserForm
            mode="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
