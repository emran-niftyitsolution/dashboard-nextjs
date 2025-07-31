"use client";

import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { GET_USER_QUERY, UPDATE_USER_MUTATION } from "@/lib/graphql/users";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { User } from "../../_components/types";
import UserForm from "../../_components/user-form";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: {
      input: { _id: userId },
    },
    skip: !userId,
  });

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  const handleSubmit = async (formData: any) => {
    try {
      setIsLoading(true);

      const response = await updateUser({
        variables: {
          input: {
            _id: userId,
            ...formData,
          },
        },
      });

      if (response.data?.updateUser) {
        toast.success("User updated successfully!");
        router.push("/dashboard/users");
      }
    } catch (error: any) {
      console.error("Update user error:", error);
      const errorMessage =
        error.graphQLErrors?.[0]?.message || "Failed to update user";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/users");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" text="Loading user..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive">
            Error Loading User
          </h2>
          <p className="text-muted-foreground mt-2">
            {error.message || "Failed to load user data"}
          </p>
          <button
            onClick={() => router.push("/dashboard/users")}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  const user: User = data?.getUser;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive">
            User Not Found
          </h2>
          <p className="text-muted-foreground mt-2">
            The user you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/dashboard/users")}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit User</h1>
          <p className="text-muted-foreground mt-1">
            Update user information and permissions
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" text="Updating user..." />
          </div>
        ) : (
          <UserForm
            user={user}
            mode="update"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
