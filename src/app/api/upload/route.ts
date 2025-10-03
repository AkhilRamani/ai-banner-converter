import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const ImageUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 10 * 1024 * 1024, // 10MB limit
      "File size must be less than 10MB"
    )
    .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), "File must be a valid image (JPEG, PNG, or WebP)"),
  fileName: z.string().min(1).max(255),
});

type ImageUploadInput = z.infer<typeof ImageUploadSchema>;

// POST /api/upload - Handle image upload
export async function POST(request: NextRequest) {
  try {
    // Parse and validate form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string;

    const validatedInput = ImageUploadSchema.parse({
      file,
      fileName,
    });

    // Execute upload using use case
    // const result = await uploadImageUsecase(validatedInput);

    return NextResponse.json({
      success: true,
      // data: result,
    });
  } catch (error) {
    console.error("Upload error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation error",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
