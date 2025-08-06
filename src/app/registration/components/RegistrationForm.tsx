"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getGradeLevelById } from "@/requests/grade-level.request";
import {
  registerStudent,
  UploadStudentImage,
} from "@/requests/students.request";
import {
  studentSchema,
  TGradeLevels,
  TStrands,
  TStudents,
} from "@/schemas/students.schema";

const RegistrationForm = ({
  gradeLevelsData,
  strandsData,
}: {
  gradeLevelsData: TGradeLevels[] | undefined;
  strandsData: TStrands[];
}) => {
  const router = useRouter();
  const [isJuniorHigh, setIsJuniorHigh] = useState<boolean | undefined>(
    undefined
  );

  const form = useForm<TStudents>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      status: "published",
      last_name: "",
      first_name: "",
      middle_name: "",
      address: "",
      grade_level_id: "",
      strand_id: "",
      student_image: "",
      emergency_contact_person: "",
      emergency_contact_number: "",
    },
  });

  const watchGradeLevel = form.watch("grade_level_id");

  const onSubmit: SubmitHandler<TStudents> = async (data) => {
    const response = await registerStudent(data);

    if (!response?.success) {
      form.setError("root", { message: response?.message });
      return;
    }
    form.reset();
    router.push("/qr-registration");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGradeLevelById(watchGradeLevel);
      if (response.success) {
        const isJrHigh =
          gradeLevelsData &&
          gradeLevelsData
            .slice(0, 4)
            .filter((item) => item.id === response.data?.id);
        const booleanRes = isJrHigh && isJrHigh.length < 1 ? false : true;
        setIsJuniorHigh(booleanRes);
        return isJrHigh;
      }
      return;
    };
    fetchData();
  }, [watchGradeLevel]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="middle_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center w-full gap-4">
          <div className="mb-4">
            <FormField
              control={form.control}
              name="grade_level_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("grade_level_id", value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Grade Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {gradeLevelsData &&
                          gradeLevelsData.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.grade_level_number}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!isJuniorHigh && (
            <div className="mb-4">
              <FormField
                control={form.control}
                name="strand_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strand</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("strand_id", value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Strand" />
                        </SelectTrigger>
                        <SelectContent>
                          {strandsData.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.strand_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="emergency_contact_person"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Person</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="emergency_contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Number</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="student_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const formData = new FormData();
                      formData.append("file", file); // 👈 Use "file", not "student_image"

                      try {
                        const response = await UploadStudentImage(formData);
                        console.log("🚀 ~ Uploaded file:", response);

                        // Optional: Update form field value with uploaded file ID
                        form.setValue("student_image", response.id); // 👈 Directus returns an array of uploaded files
                      } catch (err) {
                        console.error("Upload failed", err);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Spinner />
                <span className="sr-only">Loading...</span>
                Loading
              </>
            ) : (
              "Login"
            )}
          </Button>
          {form.formState.errors.root && (
            <p className="mt-2 text-center text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
