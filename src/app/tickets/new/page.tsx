"use client";

import { createTicket } from "@/actions/ticket.actions";
import { useActionState } from "react";

const NewTicketForm = () => {
  const [state, formActions] = useActionState(createTicket, {
    success: false,
    message: "",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Submit a Support Ticket
        </h1>
        {state.message && !state.success && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-200 rounded">
            {state.message}
          </div>
        )}

        <form action={formActions} className="space-y-4 text-gray-700">
          <input
            className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            name="subject"
            placeholder="Subject"
          />
          <textarea
            className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            name="description"
            placeholder="Describe your issue"
            rows={4}
          />
          <select
            className="w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            name="priority"
            defaultValue="Low"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <button
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTicketForm;
