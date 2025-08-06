import z from "zod";

export const studentSchema = z.object({
  id: z.string().optional(),
  status: z.enum(["published", "draft", "archived"]),
  first_name: z.string().min(1, { message: "First Name is Required!" }),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, { message: "Last Name is Required!" }),
  address: z.string().min(1, { message: "Address is Required!" }),
  emergency_contact_person: z
    .string()
    .min(1, { message: "Contact Person is Required!" }),
  emergency_contact_number: z
    .string()
    .min(1, { message: "Emergency Contact Number is Required!" }),
  grade_level_id: z.string(),
  strand_id: z.string().optional(),
  student_image: z.string().optional(),
});

export const gradeLevelSchema = z.object({
  id: z.string().optional(),
  grade_level_number: z.number().min(1, { message: "Required!" }),
});

export const strandSchema = z.object({
  id: z.string().optional(),
  strand_code: z.string().min(1, { message: "Strand Code is Required!" }),
  strand_name: z.string().min(1, { message: "Strand Name is Required!" }),
});

export const extendedStudentSchema = z.object({
  id: z.string().optional(),
  status: z.enum(["published", "draft", "archived"]),
  first_name: z.string().min(1, { message: "First Name is Required!" }),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, { message: "Last Name is Required!" }),
  address: z.string().min(1, { message: "Address is Required!" }),
  emergency_contact_person: z
    .string()
    .min(1, { message: "Contact Person is Required!" }),
  emergency_contact_number: z
    .string()
    .min(1, { message: "Emergency Contact Number is Required!" }),
  grade_level_id: gradeLevelSchema,
  strand_id: strandSchema,
  student_image: z.string().optional(),
});

export const QRProfileSchema = z.object({
  id: z.string().optional(),
  student_id: z.string(),
  qr_code: z.string(),
});

export const ExtendedQRProfileSchema = z.object({
  id: z.string().optional(),
  student_id: extendedStudentSchema,
  qr_code: z.string(),
});

export type TQRProfile = z.infer<typeof QRProfileSchema>;
export type TGradeLevels = z.infer<typeof gradeLevelSchema>;
export type TStrands = z.infer<typeof strandSchema>;
export type TStudents = z.infer<typeof studentSchema>;
export type TExtendedStudents = z.infer<typeof extendedStudentSchema>;
export type TExtendedQRProfile = z.infer<typeof ExtendedQRProfileSchema>;
