"use server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { LogEvent } from "@/utils/sentry";

export async function createTicket(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const subject = formData.get("subject")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const priority = formData.get("priority")?.toString();

    if (!subject || !description || !priority) {
      LogEvent("Ticket creation failed: Missing required fields", );
      return {
        success: false,
        message: "Subject and description are required",
      };
    }

    // Create the ticket in the database
    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        priority,
      },
    });

    Sentry.addBreadcrumb({
      category: "ticket",
      message: `Ticket created with ID: ${ticket.id}`,
      level: "info",
    });

    Sentry.captureMessage(`Ticket created successfully: ${ticket.id}`);

    revalidatePath("/tickets");

    return {
      success: true,
      message: "Ticket created successfully",
    };
  } catch (error) {
    Sentry.captureException(error, {
      level: "error",
      extra: { formData: Object.fromEntries(formData.entries()) },
    });
    return {
      success: false,
      message: "An error occurred while creating the ticket",
    };
  }
}
