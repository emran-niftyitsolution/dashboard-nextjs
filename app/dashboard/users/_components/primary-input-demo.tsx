"use client";

import { Card } from "@/components/ui/card";
import PrimaryInput, { SelectOption, Tag } from "@/components/ui/primary-input";
import { motion } from "framer-motion";
import {
  Calendar,
  FileText,
  Globe,
  Hash,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";

export default function PrimaryInputDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    age: "",
    role: "",
    roles: [] as string[],
    tags: [] as Tag[],
    birthDate: "",
    bio: "",
    searchQuery: "",
  });

  const roleOptions: SelectOption[] = [
    {
      value: "admin",
      label: "Administrator",
      icon: <User className="w-4 h-4" />,
    },
    {
      value: "user",
      label: "Regular User",
      icon: <User className="w-4 h-4" />,
    },
    {
      value: "moderator",
      label: "Moderator",
      icon: <User className="w-4 h-4" />,
    },
    { value: "guest", label: "Guest", icon: <User className="w-4 h-4" /> },
  ];

  const handleTagAdd = (tag: Tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const handleTagRemove = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.id !== tagId),
    }));
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          PrimaryInput Component Demo
        </h2>
        <p className="text-muted-foreground">
          A comprehensive input component that handles all types of form fields
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Text Inputs */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Basic Inputs
          </h3>

          <PrimaryInput
            type="text"
            label="Full Name"
            value={formData.name}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, name: String(value) }))
            }
            placeholder="Enter your full name"
            icon={<User className="w-4 h-4" />}
            required
          />

          <PrimaryInput
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, email: String(value) }))
            }
            placeholder="Enter your email"
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <PrimaryInput
            type="password"
            label="Password"
            value={formData.password}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, password: String(value) }))
            }
            placeholder="Enter your password"
            icon={<Lock className="w-4 h-4" />}
            required
          />

          <PrimaryInput
            type="tel"
            label="Phone Number"
            value={formData.phone}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, phone: String(value) }))
            }
            placeholder="Enter your phone number"
            icon={<Phone className="w-4 h-4" />}
          />

          <PrimaryInput
            type="url"
            label="Website"
            value={formData.website}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, website: String(value) }))
            }
            placeholder="Enter your website URL"
            icon={<Globe className="w-4 h-4" />}
          />

          <PrimaryInput
            type="number"
            label="Age"
            value={formData.age}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, age: String(value) }))
            }
            placeholder="Enter your age"
            min={0}
            max={120}
            icon={<Hash className="w-4 h-4" />}
          />
        </Card>

        {/* Advanced Inputs */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Advanced Inputs
          </h3>

          <PrimaryInput
            type="select"
            label="Role"
            value={formData.role}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, role: String(value) }))
            }
            options={roleOptions}
            placeholder="Select your role"
            searchable
            clearable
          />

          <PrimaryInput
            type="multi-select"
            label="Multiple Roles"
            value={formData.roles}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                roles: Array.isArray(value) ? value : [],
              }))
            }
            options={roleOptions}
            placeholder="Select multiple roles"
            searchable
            multiple
          />

          <PrimaryInput
            type="tags"
            label="Skills"
            value=""
            onChange={() => {}}
            tags={formData.tags}
            onTagAdd={handleTagAdd}
            onTagRemove={handleTagRemove}
            tagInputPlaceholder="Add a skill..."
            maxTags={5}
          />

          <PrimaryInput
            type="date"
            label="Birth Date"
            value={formData.birthDate}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, birthDate: String(value) }))
            }
            placeholder="Select your birth date"
            icon={<Calendar className="w-4 h-4" />}
            maxDate={new Date()}
          />

          <PrimaryInput
            type="textarea"
            label="Bio"
            value={formData.bio}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, bio: String(value) }))
            }
            placeholder="Tell us about yourself..."
            rows={4}
            icon={<FileText className="w-4 h-4" />}
          />

          <PrimaryInput
            type="search"
            label="Search"
            value={formData.searchQuery}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, searchQuery: String(value) }))
            }
            placeholder="Search for something..."
            onSearch={handleSearch}
            searchDebounce={500}
          />
        </Card>
      </div>

      {/* Form Data Display */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Form Data
        </h3>
        <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </Card>
    </div>
  );
}
